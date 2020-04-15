import { getSource } from './source'
import { fromPairs, keys, map, mergeLeft, pipe } from 'ramda'
import { createFile } from './file'

const defaultOptions = {
  path: 'tailwind-types.ts',
  exportClassesChoice: true,
  exportClassesList: false,
  exportClassNamesHelper: false,
  exportConstants: false,
}

let alreadyUsed = false

type Options = Partial<typeof defaultOptions>

const getTailwindConfigObject = (configFunction) => pipe(
  keys,
  map(key => [key, configFunction(key)]),
  fromPairs,
)(require('tailwindcss/defaultConfig'))

const validateConfig = (options: Options) => {
  let hasError = false

  if (options.exportConstants) {
    try {
      require.resolve('camelcase')
    } catch (er) {
      hasError = true
      console.error('❌  "camelcase" package is required with { exportConstants: true } configuration.')
    }
  }

  if (options.exportClassNamesHelper) {
    try {
      require.resolve('classnames')
    } catch (er) {
      hasError = true
      console.error('❌  "classnames" package is required with { exportClassNamesHelper: true } configuration.')
    }
  }

  if (hasError) {
    console.log()
    process.exit(1)
  }
}

const generatorPlugin = (userOptions: Options = {}) => {
  const options = mergeLeft(userOptions, defaultOptions)

  validateConfig(options)

  return ({ config: configFunction }) => {
    if (alreadyUsed) {
      // we don't want to re-load this plugin when using it, or it will provoke an infinite loop.
      return
    }

    alreadyUsed = true

    getSource(getTailwindConfigObject(configFunction), options)
      .then(createFile(options.path))
      .then(() => console.log(`✅  Tailwind types generated in ${options.path}.`))
  }
}

generatorPlugin.__isOptionsFunction = true

export = generatorPlugin

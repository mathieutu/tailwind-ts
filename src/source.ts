import tailwindcss from 'tailwindcss'

import { restoreSeparator, withSafeSeparator } from './separator'
import { getSelectors } from './selectors'
import { getClasses } from './classes'
import { getFile } from './file'

export const getSource = (config, options) => (
  tailwindcss(withSafeSeparator(config))
    .process('@tailwind utilities;', { from: undefined })
    .then(getSelectors)
    .then(getClasses)
    .then(restoreSeparator(config))
    .then(getFile(config, options))
)

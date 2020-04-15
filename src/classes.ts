import { last, map, pipe, replace, split } from 'ramda'

const keepLastPart = pipe(split(' '), last)
const removePseudoElements = replace(/:.*/, '')
const removeSlashs = replace('\\', '')
const removeFirstDot = replace(/^./, '')

export const getClasses = map(pipe(
  keepLastPart,
  removePseudoElements,
  removeSlashs,
  removeFirstDot,
))

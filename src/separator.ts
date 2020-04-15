import { assoc, map, replace } from 'ramda'

/**
 * Because we need something easily replaceable in strings,
 * and that don't conflict with pseudo-selectors and css.
 */
const safeSeparator = '___'

export const withSafeSeparator = assoc('separator', safeSeparator)

export const restoreSeparator = ({ separator = ':' }) => (
  map(replace(new RegExp(safeSeparator, 'g'), separator))
)

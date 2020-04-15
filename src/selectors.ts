import { Result, rule } from 'postcss'
import { cond, flatten, map, pipe, prop, propEq } from 'ramda'


const getSelectorsFromNode = cond([
  [propEq('type', 'rule'), prop('selector')],
  [propEq('type', 'atrule'), root => getSelectorsFromRoot(root)],
])


const getSelectorsFromRoot = pipe(
  prop('nodes'),
  map(getSelectorsFromNode),
  flatten,
)

export const getSelectors: (results: Required<Result>) => string[] = pipe(
  prop('root'),
  getSelectorsFromRoot,
)

import { logger } from '@spare/logger'

const list = [
  'NY.GNS.ICTR.CD    | Gross savings (current US$) [\'Econ\']'
]


const transform = tx => {
  let [id, name, topics] = tx.split(/\s+\|\s+|\s+(?=\[)/g)
  return `'${ id.trim() }':'${ name.trim() }', ${ (topics = topics?.trim())?.length ? '// ' + topics : '' }`
}

for (let word of list.map(transform)) {
  word |> logger
}
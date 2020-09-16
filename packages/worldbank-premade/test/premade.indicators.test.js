import { Cards }  from '@palett/cards'
import { HexDye } from '@palett/dye'
import { BOLD }   from '@palett/enum-font-effects'
import { SP }     from '@spare/enum-chars'
import { logger } from '@spare/logger'

const list = [
  'SE.PRM.ENRR       | School enrollment, primary (% gross) [\'Edu\']',
  'SE.SEC.ENRR       | School enrollment, secondary (% gross) [\'Edu\']',
  'SE.TER.ENRR       | School enrollment, tertiary (% gross) [\'Edu\']'
]


const lightBlueAccent3 = HexDye(Cards.lightBlue.accent_3, BOLD)
const blueAccent1 = HexDye(Cards.blue.accent_1, BOLD)
const DE = SP + ('|' |> lightBlueAccent3) + SP
const LB = blueAccent1('[')
const RB = blueAccent1(']')

const transform = tx => {
  let [id, name, topics] = tx.split(/\s+\|\s+|\s+(?=\[)/g)
  return `'${ id.trim() }':'${ name.trim() }', ${ (topics = topics?.trim())?.length ? '// ' + topics : '' }`

}

for (let word of list.map(transform)) {
  word |> logger
}
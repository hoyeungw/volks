import { Cards }            from '@palett/cards'
import { HexDye }           from '@palett/dye'
import { BOLD }             from '@palett/enum-font-effects'
import { SP }               from '@spare/enum-chars'
import { decoFlat, logger } from '@spare/logger'

const list = [
  'Energy use (kg of oil equivalent per capita) | EG.USE.PCAP.KG.OE | Energy,Climate',

]


const lightBlueAccent3 = HexDye(Cards.lightBlue.accent_3, BOLD)
const blueAccent1 = HexDye(Cards.blue.accent_1, BOLD)
const DE = SP + ('|' |> lightBlueAccent3) + SP
const LB = blueAccent1('[')
const RB = blueAccent1(']')

const transform = tx => {
  const [name, id, topics] = tx.split(' | ')
  return name + DE + LB + topics + RB |> decoFlat

}

for (let word of list.map(transform)) {
  word |> logger
}
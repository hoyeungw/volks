import { randInt } from '@aryth/rand'
import { Cards }   from '@palett/cards'
import { HexDye }  from '@palett/dye'
import { BOLD }    from '@palett/enum-font-effects'
import { SP }      from '@spare/enum-chars'
import { linger }  from '@valjoux/linger'
import fuzzy       from 'fuzzy'
import inquirer    from 'inquirer'


export const searchList = function (answers, input = '') {
  const { list, extract } = this
  const results = fuzzy
    .filter(input, list, { extract })
    .map(({ original }) => original)
  return results.push(new inquirer.Separator()), results
}

export const searchListLingered = async function (answers, input = '') {
  const conf = this
  return await linger(
    randInt(15, 75),
    searchList.bind(conf),
    answers, input
  )
}

const lightBlueAccent3 = HexDye(Cards.lightBlue.accent_3, BOLD)
const blueAccent1 = HexDye(Cards.blue.accent_1, BOLD)
const DE = SP + ('|' |> lightBlueAccent3) + SP
const LB = blueAccent1('[')
const RB = blueAccent1(']')
const extract = ({ name, value }) => name + ' | ' + value

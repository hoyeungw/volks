import { randIn }     from '@aryth/rand'
import { Cards }      from '@palett/cards'
import { DyeFactory } from '@palett/dye'
import { HEX }        from '@palett/enum-color-space'
import { BOLD }       from '@palett/enum-font-effects'
import { SP }         from '@spare/enum-chars'
import { linger }     from '@valjoux/linger'
import fuzzy          from 'fuzzy'
import inquirer       from 'inquirer'


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
    randIn(15, 75),
    searchList.bind(conf),
    answers, input
  )
}

const dyeFactory = DyeFactory.prep(HEX, BOLD)

const lightBlueAccent3 = dyeFactory(Cards.lightBlue.accent_3)
const blueAccent1 = dyeFactory(Cards.blue.accent_1)
const DE = SP + ('|' |> lightBlueAccent3) + SP
const LB = blueAccent1('[')
const RB = blueAccent1(']')
const extract = ({ name, value }) => name + ' | ' + value

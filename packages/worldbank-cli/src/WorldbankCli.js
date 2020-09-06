import { TABLE }                             from '@analys/enum-tabular-types'
import { randInt }                           from '@aryth/rand'
import { greyNow }                           from '@flua/utils'
import { says }                              from '@palett/says'
import { Deco, deco }                        from '@spare/deco'
import { decoObject, decoTable, logger, Xr } from '@spare/logger'
import { linger }                            from '@valjoux/linger'
import { range }                             from '@vect/vector-init'
import { getIndicators }                     from '@volks/worldbank-indicator'
import fuzzy                                 from 'fuzzy'
import inquirer                              from 'inquirer'
import searchableList                        from 'inquirer-autocomplete-prompt'
import searchableCheckbox                    from 'inquirer-checkbox-plus-prompt'
import { countryList }                       from '../resources/countryList'
import { indicatorList }                     from '../resources/indicatorList'

const SEARCHABLE_LIST = 'searchable-list'
const SEARCHABLE_CHECKBOX = 'searchable-checkbox'
const LIST = 'list'
inquirer.registerPrompt(SEARCHABLE_LIST, searchableList)
inquirer.registerPrompt(SEARCHABLE_CHECKBOX, searchableCheckbox)

const searchListAsync = async function (answers, input = '') {
  const list = this
  return await linger(
    randInt(15, 75),
    input => {
      const results = fuzzy
        .filter(input, list, { extract: ({ name, value }) => name + ' | ' + value })
        .map(({ original }) => original)
      return results.push(new inquirer.Separator()), results
    },
    input)
}


export class WorldbankCli {
  static async start() {
    const { indicators } = await inquirer.prompt({
      type: SEARCHABLE_CHECKBOX,
      name: 'indicators',
      message: 'Select indicators',
      pageSize: 24,
      highlight: true,
      searchable: true,
      default: [],
      source: searchListAsync.bind(indicatorList),
      filter(label) { return label }
    })
    const { countries } = await inquirer.prompt({
      type: SEARCHABLE_CHECKBOX,
      name: 'countries',
      message: 'Select worldbank-countries',
      pageSize: 24,
      highlight: true,
      searchable: true,
      default: ['USA', 'CHN', 'JPN'],
      source: searchListAsync.bind(countryList),
      filter(label) {
        label |> deco |> says['countries']
        // return label.slice(0, label.indexOf('|'))
        return label
      }
    })
    const { start } = await inquirer.prompt({
      name: 'start',
      type: LIST,
      default: 5,
      message: 'Please select start year',
      choices: range(2020, 1990).map(n => ({ name: n, value: n })),
    })
    Xr(greyNow()).select({ indicators, countries, start } |> Deco({ hi: 1 })) |> logger
    const table = await getIndicators({
      country: countries,
      indicator: indicators,
      year: [start, 2020],
      format: TABLE,
      spin: true
    })
    if (table.wd) {
      table.indicators |> decoObject |> says['indicators']
      table.countries |> decoObject |> says['countries']
      table |> decoTable |> says['worldbank.org'].p(greyNow())
    }
  }
}

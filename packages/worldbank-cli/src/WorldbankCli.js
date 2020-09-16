import { TABLE }                           from '@analys/enum-tabular-types'
import { Cards }                           from '@palett/cards'
import { HexDye }                          from '@palett/dye'
import { BOLD, UNDERLINE }                 from '@palett/enum-font-effects'
import { says }                            from '@palett/says'
import { Deco }                            from '@spare/deco'
import { SP }                              from '@spare/enum-chars'
import { decoObject, decoPale, decoTable } from '@spare/logger'
import { time }                            from '@valjoux/timestamp-pretty'
import { range }                           from '@vect/vector-init'
import { getIndicators }                   from '@volks/worldbank-indicator'
import inquirer                            from 'inquirer'
import searchableList                      from 'inquirer-autocomplete-prompt'
import searchableCheckbox                  from 'inquirer-checkbox-plus-prompt'
import ora                                 from 'ora'
import { countryList }                     from '../resources/countryList'
import { indicatorList }                   from '../resources/indicatorList'
import { searchListLingered }              from './searchListLingered'

const spinner = ora()


export class WorldbankCli {
  static async start() {
    spinner.start(time() + ' initiating components')

    const SEARCHABLE_LIST = 'searchable-list'
    const SEARCHABLE_CHECKBOX = 'searchable-checkbox'
    const LIST = 'list'
    inquirer.registerPrompt(SEARCHABLE_LIST, searchableList)
    inquirer.registerPrompt(SEARCHABLE_CHECKBOX, searchableCheckbox)

    const grey = HexDye(Cards.grey.darken_2, UNDERLINE)
    const DE = SP + ('|' |> HexDye(Cards.lightBlue.accent_4, BOLD)) + SP
    const logger = says['worldbank'].attach(time)
    const prettyIndicatorList = indicatorList
      .map(({ name, value, group }) => ({
        name: grey(value.padEnd(17, SP)) + DE + name + SP + grey(decoPale(group)), value
      }))
    const prettyCountryList = countryList
      .map(({ name, value }) => ({
        name: name + SP + grey(value), value
      }))

    spinner.succeed(time() + ' initiated components')

    const { indicators } = await inquirer.prompt({
      type: SEARCHABLE_CHECKBOX,
      name: 'indicators',
      message: 'Select indicators',
      pageSize: 24,
      highlight: true,
      searchable: true,
      default: [],
      source: searchListLingered.bind({ list: prettyIndicatorList, extract: ({ name, value }) => name + DE + value }),
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
      source: searchListLingered.bind({ list: prettyCountryList, extract: ({ name, value }) => name + DE + value }),
    })
    const { start } = await inquirer.prompt({
      name: 'start',
      type: LIST,
      default: 5,
      message: 'Please select start year',
      choices: range(2020, 1990).map(n => ({ name: n, value: n })),
    })

    spinner.start(time() + ' querying data ' + ({ indicators, countries, start } |> Deco({ hi: 1 })))
    const table = await getIndicators({
      country: countries,
      indicator: indicators,
      year: [start, 2020],
      format: TABLE,
      spin: false
    })
    spinner.succeed(time() + ' queried from worldbank')

    if (table.wd) {
      table.indicators |> decoObject |> says['indicators']
      table.countries |> decoObject |> says['countries']
      table |> decoTable |> logger
    }
  }
}

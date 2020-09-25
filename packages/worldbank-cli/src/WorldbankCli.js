import { Cards }                           from '@palett/cards'
import { HexDye }                          from '@palett/dye'
import { BOLD, UNDERLINE }                 from '@palett/enum-font-effects'
import { says }                            from '@palett/says'
import { deco, Deco }                      from '@spare/deco'
import { LF, SP }                          from '@spare/enum-chars'
import { decoPale, decoString, decoTable } from '@spare/logger'
import { time }                            from '@valjoux/timestamp-pretty'
import { seriesIndicators }                from '@volks/worldbank-indicator'
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
      choices: [2000, 2014, 2007, 2000, 1993, 1986, 1979].map(n => ({ name: n, value: n })),
    })
    const INDICATOR = 'indicator', COUNTRY = 'country', VALUE = 'value', YEAR = 'year'
    const { spec } = await inquirer.prompt({
      name: 'spec',
      type: LIST,
      default: 0,
      message: 'Please select table spec',
      choices: [
        { side: INDICATOR, banner: COUNTRY, sumBy: VALUE, distinctBy: YEAR },
        { side: COUNTRY, banner: INDICATOR, sumBy: VALUE, distinctBy: YEAR },
        { side: INDICATOR, banner: YEAR, sumBy: VALUE, distinctBy: COUNTRY },
        { side: YEAR, banner: INDICATOR, sumBy: VALUE, distinctBy: COUNTRY },
        { side: COUNTRY, banner: YEAR, sumBy: VALUE, distinctBy: INDICATOR },
        { side: YEAR, banner: COUNTRY, sumBy: VALUE, distinctBy: INDICATOR },
      ].map(({ side, banner, sumBy, distinctBy }) => ({
        name: decoString(`(${ side }) cross (${ banner }) sum by (${ sumBy }) distinct by (${ distinctBy })`),
        value: { side, banner, sumBy, distinctBy }
      })),
    })
    spinner.start(time() + ' querying data ' + ({ indicators, countries, start, spec } |> Deco({ hi: 1 })))
    const tableSeries = await seriesIndicators({
      country: countries,
      indicator: indicators,
      year: [start, 2020],
      autoRefine: true,
      spin: false
    }, spec)
    spinner.succeed(time() + ' queried from worldbank')
    for (let [key, table] of Object.entries(tableSeries)) {
      table.title |> deco |> says[key]
      table.meta |> Deco({ unit: 16 }) |> says[key]
      table |> decoTable |> says[key]
      LF |> console.log
    }
  }
}

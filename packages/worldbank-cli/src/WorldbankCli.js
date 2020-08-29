import { TABLE }                             from '@analys/enum-tabular-types'
import { Table }                             from '@analys/table'
import { randInt }                           from '@aryth/rand'
import { greyNow }                           from '@flua/utils'
import { says }                              from '@palett/says'
import { deco }                              from '@spare/deco'
import { SP }                                from '@spare/enum-chars'
import { decoString, decoTable, logger, Xr } from '@spare/logger'
import { linger }                            from '@valjoux/linger'
import { range }                             from '@vect/vector-init'
import { CountryIsos }                       from '@volks/countries-and-subdivisions'
import { getIndicator }                      from '@volks/worldbank-indicator/src/getIndicator'
import { Sources }                           from '@volks/worldbank-sources'
import fuzzy                                 from 'fuzzy'
import inquirer                              from 'inquirer'
import searchableList                        from 'inquirer-autocomplete-prompt'
import searchableCheckbox                    from 'inquirer-checkbox-plus-prompt'

const SEARCHABLE_LIST = 'searchable-list'
const SEARCHABLE_CHECKBOX = 'searchable-checkbox'
const LIST = 'list'
inquirer.registerPrompt(SEARCHABLE_LIST, searchableList)
inquirer.registerPrompt(SEARCHABLE_CHECKBOX, searchableCheckbox)

const searchListAsync = async function (answers, input = '') {
  const list = this
  return await linger(
    randInt(30, 90),
    input => {
      const results = fuzzy
        .filter(input, list)
        .map(({ original }) => ({ name: decoString(original), value: original }))
      return results.push(new inquirer.Separator()), results
    },
    input)
}

const indicatorList = Object.values(Sources).map(({ rows }) => rows.map(([id, name]) => id + ' | ' + name)).flat()
const countryList = Object.entries(CountryIsos).map(([name, id]) => id + ' | ' + name.replace(/_/g, SP))

export class WorldbankCli {
  static async start() {
    const { indicators } = await inquirer.prompt([{
      type: SEARCHABLE_CHECKBOX,
      name: 'indicators',
      message: 'Select indicators',
      pageSize: 24,
      highlight: true,
      searchable: true,
      default: [],
      source: searchListAsync.bind(indicatorList),
      filter(label) { return label }
    }])
    const { countries } = await inquirer.prompt([{
      type: SEARCHABLE_CHECKBOX,
      name: 'countries',
      message: 'Select countries',
      pageSize: 24,
      highlight: true,
      searchable: true,
      default: [],
      source: searchListAsync.bind(countryList),
      filter(label) {
        label |> deco |> says['countries']
        // return label.slice(0, label.indexOf('|'))
        return label
      }
    }])
    const { start } = await inquirer.prompt([{
      name: 'start',
      type: LIST,
      default: '2015',
      message: 'Please select start year',
      choices: range(2020, 1990),
    },])
    Xr(greyNow()).select({ indicators, countries, start } |> deco) |> logger
    const reg = /^(?<=\s*)[\w.]+(?=\s+\|)/ // /(?<=\|\s*)\w+$/
    const table = Table.from(await getIndicator({
      country: countries.map(word => word.match(reg)[0]),
      indicator: indicators.map(word => word.match(reg)[0]),
      year: [start, 2020],
      format: TABLE,
      spin: true
    }))
    table
      .mutateColumn('indicator', ({ value }) => value)
      .mutateColumn('country', ({ value }) => value)
    table |> decoTable |> logger
  }
}

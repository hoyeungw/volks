import { decoVector, logger } from '@spare/logger'
import fuzzy                  from 'fuzzy'
import inquirer               from 'inquirer'
import searchableCheckbox     from 'inquirer-checkbox-plus-prompt'
import { searchListLingered } from '../src/searchListLingered'

const countries = [
  { name: 'the United States of America', value: 'USA' },
  { name: 'China', value: 'CHN' },
  { name: 'Japan', value: 'JPN' },
  { name: 'Germany', value: 'DEU' },
  { name: 'the United Kingdom of Great Britain and Northern Ireland', value: 'GBK' }
]
const options = { extract: ({ name, value }) => name + ' | ' + value }
const results = fuzzy.filter('US', countries, options)
const matches = results.map(el => el.original)

const SEARCHABLE_CHECKBOX = 'searchable-checkbox'
inquirer.registerPrompt(SEARCHABLE_CHECKBOX, searchableCheckbox)


const cli = async () => {
  const { indicators } = await inquirer.prompt({
    type: SEARCHABLE_CHECKBOX,
    name: 'indicators',
    message: 'Select indicators',
    pageSize: 24,
    highlight: true,
    searchable: true,
    default: ['CHN', 'USA'],
    source: searchListLingered.bind(countries),
    filter(label) { return label }
  })
  indicators |> decoVector |> logger
}
console.log(matches)
cli().then()
import { randInt, randIntBetw } from '@aryth/rand'
import { linger }               from '@valjoux/linger'
import fuzzy                    from 'fuzzy'
import inquirer                 from 'inquirer'
import searchableList           from 'inquirer-autocomplete-prompt'
import searchableCheckbox from 'inquirer-checkbox-plus-prompt'

const AUTOCOMPLETE = 'autocomplete'

inquirer.registerPrompt(AUTOCOMPLETE, searchableList)


const states = [
  'Alabama',
  'Alaska',
  'American Samoa',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'District Of Columbia',
  'Federated States Of Micronesia',
  'Florida',
  'Georgia',
  'Guam',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Marshall Islands',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Northern Mariana Islands',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Palau',
  'Pennsylvania',
  'Puerto Rico',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virgin Islands',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
]
const foods = ['Apple', 'Orange', 'Banana', 'Kiwi', 'Lichi', 'Grapefruit']

function searchStates(answers, input) {
  input = input || ''
  return new Promise(function (resolve) {
    setTimeout(function () {
      const result = fuzzy.filter(input, states)
      const results = result.map(function (el) {
        return el.original
      })
      results.push(new inquirer.Separator())
      resolve(results)
    }, randIntBetw(30, 500))
  })
}

const searchListAsync = async function (answers, input = '') {
  const list = this
  return await linger(
    randInt(30, 500),
    input => {
      const results = fuzzy.filter(input, list).map(el => el.original)
      return results.push(new inquirer.Separator()), results
    },
    input)
}

inquirer
  .prompt([
    {
      type: AUTOCOMPLETE,
      name: 'fruit',
      suggestOnly: true,
      message: 'What is your favorite fruit?',
      searchText: 'We are searching the internet for you!',
      emptyText: 'Nothing found!',
      source: searchListAsync.bind(foods),
      pageSize: 4,
      validate(val) { return val ? true : 'Type something!' },
    },
    {
      type: AUTOCOMPLETE,
      name: 'state',
      message: 'Select a state to travel from',
      source: searchListAsync.bind(states),
    },
    {
      type: AUTOCOMPLETE,
      name: 'stateNoPromise',
      message: 'Select a state to travel to',
      source: () => states,
    },
    {
      type: AUTOCOMPLETE,
      name: 'multiline',
      pageSize: 20,
      message: 'Choices support multiline choices (should increase pagesize)',
      source: () =>
        Promise.resolve([
          'Option1',
          'Option2\n\nline2\nline3',
          'Option3\n\nblank line between\n\n\nfar down\nlast line',
          new inquirer.Separator(),
        ]),
    },
    {
      type: 'checkbox',
      name: 'multilineCheckbox',
      message: 'Normal checkbox multiline example',
      choices: [
        'Alaska\nmore lines\neven more\nlast line',
        'filler1',
        'filler2',
        'filler3',
        'filler4',
        'filler5',
        'filler6',
        new inquirer.Separator(),
      ],
    },
  ])
  .then(function (answers) {
    console.log(JSON.stringify(answers, null, 2))
  })
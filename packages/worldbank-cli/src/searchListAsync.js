import { randInt } from '@aryth/rand'
import { linger }  from '@valjoux/linger'
import fuzzy       from 'fuzzy'
import inquirer    from 'inquirer'

export const searchListAsync = async function (answers, input = '') {
  const list = this
  return await linger(
    randInt(30, 90),
    input => {
      const results = fuzzy
        .filter(input, list, { extract: ({ name, value }) => name + ' | ' + value })
        .map(({ original }) => original)
      return results.push(new inquirer.Separator()), results
    },
    input)
}

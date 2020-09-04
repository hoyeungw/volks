import { esvar }    from '@flua/utils'
import { Vinylize } from '@flua/vinylize'
import { says }     from '@palett/says'
import { Verse }    from '@spare/verse'
import { tap }      from '@vect/vector-init'
import { Sources }  from '@volks/worldbank-sources'
import gulp         from 'gulp'

const DEST = 'packages/worldbank-cli/resources'
const FILENAME = 'indicatorList'

export const saveIndicatorList = async () => {
  const o = {}
  let prev
  for (let key in Sources) {
    for (let [id, name, topics] of Sources[key].rows)
      if (!(name in o) || /\d+/.test({ id: prev } = o[name]) && /^\D+$/.test(id))
        if (topics) o[name] = { id, topics: topics?.join(',') }
  }
  Object.keys(o).length |> says['indicatorList.length']
  const samples = Object.entries(o)
    .map(
      ([name, { id, topics }]) => ({ name: tap(name, id, topics).join(' | '), value: id })
    )
  await Vinylize(FILENAME + '.js')
    .p(esvar(FILENAME))
    .p(Verse.samples(samples))
    .pipe(gulp.dest(DEST))
}
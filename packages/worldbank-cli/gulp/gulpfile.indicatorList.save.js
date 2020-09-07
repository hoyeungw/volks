import { tableToSamples } from '@analys/convert'
import { esvar }          from '@flua/utils'
import { Vinylize }       from '@flua/vinylize'
import { says }           from '@palett/says'
import { Verse }          from '@spare/verse'
import { Sources }        from '@volks/worldbank-sources'
import gulp               from 'gulp'

const DEST = 'packages/worldbank-cli/resources'
const FILENAME = 'indicatorList'


export const saveIndicatorList = async () => {
  const o = {}
  let prev
  for (let key in Sources) {
    for (let { id, name, topics } of Sources[key] |> tableToSamples)
      if (!(name in o) || /\d+/.test({ id: prev } = o[name]) && /^\D+$/.test(id))
        if (topics) o[name] = { id, topics }
  }
  Object.keys(o).length |> says['indicatorList'].p('length')
  const samples = Object
    .entries(o)
    .map(([name, { id, topics }]) => ({ name, value: id, group: topics }))
  await Vinylize(FILENAME + '.js')
    .p(esvar(FILENAME))
    .p(Verse.samples(samples))
    .pipe(gulp.dest(DEST))
}
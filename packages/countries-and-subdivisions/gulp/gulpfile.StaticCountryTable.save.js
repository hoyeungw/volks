import { TABLE }           from '@analys/enum-tabular-types'
import { Table }           from '@analys/table'
import { esvar }           from '@flua/utils'
import { Vinylize }        from '@flua/vinylize'
import { COSP }            from '@spare/enum-chars'
import { tap }             from '@spare/tap'
import { makeReplaceable } from '@spare/translator'
import { Verse }           from '@spare/verse'
import gulp                from 'gulp'
import { getCountries }    from '../src'


const DEST = 'packages/countries-and-subdivisions/static/fetched'
const FILENAME = 'CountryTable'

const lexicon = [
  [/(.+)\((.+\sof)\)/gi, (_, major, title) => major.trim() + COSP + title.trim()],
  [/(United\s)?(People['’]s\s)?(Dem(?:\.|ocratic)\s)?(People['’]s\s)?(Rep(?:\.|ublic))(?:\sof)?(?:\sthe)?\s?/gi,
    (ms, u, pa, d, pb, r) => (ms = tap(u, pa, d, pb, r)).length === 1
      ? (ms[0].slice(0, 3) + '.')
      : ms.map(([ini]) => ini).join('')
  ],
  [/Islamic\sRep(?:\.|ublic)?(?:\sof)?\s?/gi, ''],
  [/Province\sof\s?/gi, ''],
  [/Saint\s?/gi, 'St.'],
  [/\[.*\]/gi, ''],
  [/,\s*$/, '']
] |> makeReplaceable

export const saveStaticCountryTable = async () => {
  const countries = Table.from(await getCountries({ format: TABLE }))
  countries.mutateColumn('name', name => name.replace(lexicon, x => x.trim()))
  await promisifyStream(Vinylize(FILENAME + '.js')
    .p(esvar(FILENAME))
    .p(Verse.table(countries))
    .pipe(gulp.dest(DEST)))
}

const promisifyStream = stream => {
  return new Promise((pass, veto) => {
    return stream
      .on('end', pass)
      .on('error', veto)
  })
}
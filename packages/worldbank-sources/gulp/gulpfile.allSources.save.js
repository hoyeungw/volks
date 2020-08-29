import { samplesToTable }                from '@analys/convert'
import { MUT }                           from '@analys/enum-mutabilities'
import { SAMPLES, TABLE }                from '@analys/enum-tabular-types'
import { Table }                         from '@analys/table'
import { Clean }                         from '@flua/clean'
import { esvar, greyNow }                from '@flua/utils'
import { Vinylize }                      from '@flua/vinylize'
import { decoFlat, logger, Xr }          from '@spare/logger'
import { snakeToPascal }                 from '@spare/phrasing'
import { Verse }                         from '@spare/verse'
import { nullish }                       from '@typen/nullish'
import { Topics }                        from '@volks/worldbank-topics'
import gulp                              from 'gulp'
import { getSource, getTopLevelSources } from '../src/getSources'

const SRC = 'packages/worldbank-sources/resources'
const DEST = SRC
const FILENAME = 'AllSources'

let samples = null

const EXCLUDE_LIST = [
  /^pefa/gi,
  /2\d{3}$/gi
]

const saveTopLevelSources = async () => {
  const allSources = (await getTopLevelSources({ format: SAMPLES }))
    .filter(({ id, name }) => {
      const veto = EXCLUDE_LIST.some(reg => reg.test(name))
      if (veto) {
        Xr(greyNow()).p('unwanted').delete(decoFlat({ id, name })) |> logger
      }
      return !veto
    })
  await Vinylize(FILENAME + '.js')
    .p(esvar(FILENAME))
    .p(Verse.table(allSources |> samplesToTable))
    .pipe(gulp.dest(DEST))
  samples = allSources
}


const saveAllLowerLevelSources = async () => {
  const TopicsIdToCode = Table.from(Topics).lookupTable('id', 'code', true)
  for (let { id, name } of samples) {
    Xr(greyNow())[id](name = snakeToPascal(name)) |> logger
    const table = Table.from(await getSource({ sourceId: id, format: TABLE }))
    if (!table?.head?.length) {
      Xr(greyNow()).p('nullish').delete({ id, name } |> decoFlat) |> logger
      continue
    }
    table
      .mutateColumn('unit', x => x?.length ? x : null)
      .mutateColumn('source', ({ id }) => id)
      .mutateColumn('sourceNote', x => x?.length ? x : null)
      .mutateColumn('sourceOrganization', x => x?.length ? x : null)
      .mutateColumn('topics', ve => ve.filter(({ id }) => id)?.length ? ve.map(({ id }) => TopicsIdToCode[id]) : null)
    if (table.column('unit').every(nullish)) table.deleteColumn('unit', MUT)
    table
      .deleteColumn('source', MUT)
      .deleteColumn('sourceNote', MUT)
      .deleteColumn('sourceOrganization', MUT)
    await Vinylize(name + '.js')
      .p(esvar(name))
      .p(Verse.table(table))
      .pipe(gulp.dest(DEST + '/' + 'sources'))
  }
}

export const saveWorldbankSources = gulp.series(
  Clean(DEST),
  saveTopLevelSources,
  saveAllLowerLevelSources
)
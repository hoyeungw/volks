import { tableToSamples }       from '@analys/convert'
import { MUT }                  from '@analys/enum-mutabilities'
import { TABLE }                from '@analys/enum-tabular-types'
import { Table }                from '@analys/table'
import { rand }                 from '@aryth/rand'
import { esvar, greyNow }       from '@flua/utils'
import { Vinylize }             from '@flua/vinylize'
import { decoFlat, logger, Xr } from '@spare/logger'
import { snakeToPascal }        from '@spare/phrasing'
import { Verse }                from '@spare/verse'
import { nullish }              from '@typen/nullish'
import { timeout }              from '@valjoux/timeout'
import gulp                     from 'gulp'
import { getSubTopics }         from '../src'

const SRC = 'packages/worldbank-topics/resources'
const DEST = 'packages/worldbank-topics/resources/topics'
const SOURCE_FILENAME = 'TopTopicTable'

export const SaveSubTopics = async function () {
  await timeout(rand(50))
  let { topics, id, name } = this
  name = snakeToPascal(name.replace(/&/g, 'And'))
  const table = Table.from(await getSubTopics({ id: id, format: TABLE }))
  if (!table?.head?.length) return null
  table
    .mutateColumn('unit', x => x?.length ? x : null)
    .mutateColumn('source', ({ id }) => id)
    .mutateColumn('sourceNote', x => x?.length ? x : null)
    .mutateColumn('sourceOrganization', x => x?.length ? x : null)
    .mutateColumn('topics', ve => ve.filter(({ id }) => id)?.length ? ve.map(({ id }) => topics[id]) : null)
  if (table.column('unit').every(nullish)) table.deleteColumn('unit', MUT)
  table
    .deleteColumn('source', MUT)
    .deleteColumn('sourceNote', MUT)
    .deleteColumn('sourceOrganization', MUT)
  await Vinylize(name + '.js')
    .p(esvar(name))
    .p(Verse.table(table))
    .asyncPipe(gulp.dest(DEST))
  return table
}

export const saveSubTopics = async () => {
  const { TopTopicTable } = await import(process.cwd() + '/' + SRC + '/' + SOURCE_FILENAME)
  const topics = Table.from(TopTopicTable).lookupTable('id', 'code', true)
  for (let { id, name, code } of tableToSamples(TopTopicTable)) {
    await timeout(rand(50))
    const table = await SaveSubTopics.call({ topics, id, name })
    table
      ? (Xr(greyNow()).p('done')['saved']({ id, name, code } |> decoFlat).count(table.rows.length) |> logger)
      : (Xr(greyNow()).p('nullish')['delete']({ id, name, code } |> decoFlat)|> logger)
  }
}
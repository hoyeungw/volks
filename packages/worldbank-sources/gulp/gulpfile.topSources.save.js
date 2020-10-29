import { samplesToTable }       from '@analys/convert'
import { SAMPLES }              from '@analys/enum-tabular-types'
import { Table }                from '@analys/table'
import { esvar, greyNow }       from '@flua/utils'
import { Vinylize }             from '@flua/vinylize'
import { decoFlat, logger, Xr } from '@spare/logger'
import { Verse }                from '@spare/verse'
import { bool }                 from '@typen/bool'
import gulp                     from 'gulp'
import { getTopSources }        from '../src/getSources'


const SRC = 'packages/worldbank-sources/resources'
const DEST = SRC
const FILENAME = 'TopSourceTable'

const EXCLUDE_LIST = [
  /^pefa/gi,
  /2\d{3}$/gi
]

export const saveTopSources = async () => {
  const topSources = (await getTopSources({ format: SAMPLES }))
    .filter(({ id, name }) => {
      const veto = EXCLUDE_LIST.some(reg => reg.test(name))
      if (veto)
        Xr(greyNow()).p('unwanted').delete(decoFlat({ id, name })) |> logger
      return !veto
    })
  const topSourcesTable = Table
    .from(topSources |> samplesToTable)
    .mutateColumn('description', tx => tx?.length ? tx : null)
    .mutateColumn('url', tx => tx?.length ? tx : null)
    .mutateColumn('dataavailability', tx => tx?.length ? bool(tx) : null)
    .mutateColumn('metadataavailability', tx => tx?.length ? bool(tx) : null)
  await Vinylize(FILENAME + '.js')
    .p(esvar(FILENAME))
    .p(Verse.table(topSourcesTable))
    .asyncPipe(gulp.dest(DEST))
}
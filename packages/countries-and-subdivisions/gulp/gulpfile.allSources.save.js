import { samplesToTable } from '@analys/convert'
import { SAMPLES, TABLE } from '@analys/enum-tabular-types'
import { esvar, greyNow } from '@flua/utils'
import { Vinylize }       from '@flua/vinylize'
import { logger, Xr }     from '@spare/logger'
import { snakeToPascal }  from '@spare/phrasing'
import { Verse }          from '@spare/verse'
import gulp               from 'gulp'


const SRC = 'packages/countries-and-subdivisions/resources'
const DEST = SRC
const FILENAME = 'AllSources'


const saveTopLevelSources = async () => {
  const allSources = await getTopLevelSources({ format: SAMPLES })
  await Vinylize(FILENAME + '.js')
    .p(esvar(FILENAME))
    .p(Verse.table(allSources |> samplesToTable))
    .pipe(gulp.dest(DEST))
  samples = allSources
}


export const saveWorldbankSources = gulp.series(
  saveTopLevelSources,
  saveAllLowerLevelSources
)
import { Clean }                                            from '@flua/clean'
import gulp                                                 from 'gulp'
import { saveWorldbankPremadeTableCollection as saveBatch } from './gulpfile.worldbankPremadeTableCollection.save'

const DEST = 'packages/worldbank-premade/resources'

export const saveWorldbankPremadeTableCollection = gulp.series(
  // Clean(DEST),
  saveBatch
)
import { Clean }          from '@flua/clean'
import gulp               from 'gulp'
import { saveSubSources } from './gulpfile.subSources.save'
import { saveTopSources } from './gulpfile.topSources.save'


const DEST = 'packages/worldbank-sources/resources'

export const saveWorldbankSources = gulp.series(
  Clean(DEST),
  saveTopSources,
  saveSubSources
)
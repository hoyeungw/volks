import { Clean }         from '@flua/clean'
import gulp              from 'gulp'
import { saveSubTopics } from './gulpfile.subTopics.save'
import { saveTopTopics } from './gulpfile.topTopics.save'

const DEST = 'packages/worldbank-topics/resources'

export const saveWorldbankTopics = gulp.series(
  Clean(DEST),
  saveTopTopics,
  saveSubTopics,
)
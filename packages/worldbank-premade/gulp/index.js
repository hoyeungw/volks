import { Clean }                  from '@flua/clean'
import gulp                       from 'gulp'
import { bulkSavePremadeReports } from './gulpfile.premadeReports.bulksave'

const DEST = 'packages/worldbank-premade/resources'

export const saveWorldbankPremadeReports = gulp.series(
  // Clean(DEST),
  bulkSavePremadeReports
)
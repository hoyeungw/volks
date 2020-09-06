import gulp                  from 'gulp'
import { saveCountryList }   from './gulpfile.countryList.save'
import { saveIndicatorList } from './gulpfile.indicatorList.save'

export const saveWorldbankCliResources = gulp.series(
  saveIndicatorList,
  saveCountryList
)
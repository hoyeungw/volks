import { saveWorldbankSources } from '@volks/worldbank-sources/gulp/gulpfile.allSources.save'
import { saveWorldbankTopics }  from '@volks/worldbank-topics/gulp/gulpfile.topics.save'
import gulp                     from 'gulp'


export {
  saveWorldbankTopics,
  saveWorldbankSources
}

export default gulp.series(
  saveWorldbankTopics,
  saveWorldbankSources
)

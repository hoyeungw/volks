import { saveWorldbankCliResources } from '@volks/worldbank-cli/gulp'
import { saveWorldbankSources }      from '@volks/worldbank-sources/gulp/gulpfile.allSources.save'
import { saveWorldbankTopics }       from '@volks/worldbank-topics/gulp/gulpfile.topics.save'
import gulp                          from 'gulp'


export {
  saveWorldbankTopics,
  saveWorldbankSources,
  saveWorldbankCliResources
}

export default gulp.series(
  saveWorldbankTopics,
  saveWorldbankSources,
  saveWorldbankCliResources
)

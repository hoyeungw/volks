import { saveWorldbankCliResources }           from '@volks/worldbank-cli/gulp'
import { saveWorldbankCountries }              from '@volks/worldbank-countries/gulp'
import { saveWorldbankPremadeTableCollection } from '@volks/worldbank-premade/gulp'
import { saveWorldbankSources }                from '@volks/worldbank-sources/gulp'
import { saveWorldbankTopics }                 from '@volks/worldbank-topics/gulp'
import gulp                                    from 'gulp'


export {
  saveWorldbankTopics,
  saveWorldbankSources,
  saveWorldbankCountries,
  saveWorldbankCliResources,
  saveWorldbankPremadeTableCollection
}

export default gulp.series(
  saveWorldbankTopics,
  saveWorldbankSources,
  saveWorldbankCliResources,
  saveWorldbankCountries,
  saveWorldbankPremadeTableCollection
)

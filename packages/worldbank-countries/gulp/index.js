import { Clean }                  from '@flua/clean'
import gulp                       from 'gulp'
import { saveCountryIsos }        from './gulpfile.CountryIsos.save'
import { saveCountryTable }       from './gulpfile.CountryTable.save'
import { saveRegionDefinitions }  from './gulpfile.RegionDefinitions.save'
import { saveStaticCountryTable } from './gulpfile.StaticCountryTable.save'

export const saveWorldbankCountries = gulp.series(
  Clean('packages/worldbank-countries/static/fetched'),
  saveStaticCountryTable,
  saveCountryIsos,
  saveCountryTable,
  saveRegionDefinitions,
)
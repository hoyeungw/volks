import { Table }    from '@analys/table'
import { esvar }    from '@flua/utils'
import { Vinylize } from '@flua/vinylize'
import { Verse }    from '@spare/verse'
import gulp         from 'gulp'

const SRC = 'packages/countries-and-subdivisions/static/fetched'
const DEST = 'packages/countries-and-subdivisions/resources/regionDefinitions'
const SOURCE_FILENAME = 'CountryTable'
const Filenames = {
  region: 'Regions',
  adminregion: 'AdminRegions',
  incomeLevel: 'IncomeLevels',
  lendingType: 'LendingTypes',
}

export const saveRegionDefinitions = async () => {
  let { CountryTable } = await import(`${ process.cwd() }/${ SRC }/${ SOURCE_FILENAME }.js`);
  CountryTable = Table.from(CountryTable)
  let filename
  for (let key in Filenames) {
    filename = Filenames[key]
    const lookup = {}
    // CountryTable.column(key) |> decoVector |> logger
    CountryTable.column(key).forEach(({ id, value }) => { if (id?.length) lookup[id] = value })
    Vinylize(filename + '.js')
      .p(esvar(filename))
      .p(Verse.object(lookup))
      .pipe(gulp.dest(DEST))
  }
}
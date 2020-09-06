import { Table }    from '@analys/table'
import { esvar }    from '@flua/utils'
import { Vinylize } from '@flua/vinylize'
import { Verse }    from '@spare/verse'
import gulp         from 'gulp'

const SRC = 'packages/countries-and-subdivisions/static/fetched'
const DEST = 'packages/countries-and-subdivisions/resources'
const FILENAME = 'CountryTable'

export const saveCountryTable = async () => {
  let { CountryTable: table } = await import((`${ process.cwd() }/${ SRC }/${ FILENAME }.js`))
  table = Table.from(table)
    .copy()
    .mutateColumn('region', ({ id }) => id?.length ? id : null)
    .mutateColumn('adminregion', ({ id }) => id?.length ? id : null)
    .mutateColumn('incomeLevel', ({ id }) => id?.length ? id : null)
    .mutateColumn('lendingType', ({ id }) => id?.length ? id : null)
  // CountryTable |> decoTable |> logger
  Vinylize(FILENAME + '.js')
    .p(esvar(FILENAME))
    .p(Verse.table(table))
    .pipe(gulp.dest(DEST))
}
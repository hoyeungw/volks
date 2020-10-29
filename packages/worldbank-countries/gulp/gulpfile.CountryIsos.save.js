import { UNION }             from '@analys/enum-join-modes'
import { Table }             from '@analys/table'
import { esvar }             from '@flua/utils'
import { Vinylize }          from '@flua/vinylize'
import { says }              from '@palett/says'
import { deco }              from '@spare/deco'
import { decoTable, logger } from '@spare/logger'
import { makeReplaceable }   from '@spare/translator'
import { Verse }             from '@spare/verse'
import { init }              from '@vect/object-init'
import { promises }          from 'fs'
import gulp                  from 'gulp'
import { NaiveCsv }          from 'naivecsv'

const SRC = 'packages/worldbank-countries/static'
const DEST = 'packages/worldbank-countries/resources'
const SOURCE_FILENAME = 'CountryTable'
const FILENAME = 'CountryIsos'


export const saveCountryIsos = async () => {
  let { CountryTable: WorldbankTable } = (await import(
      (`${ process.cwd() }/${ SRC }/fetched/${ SOURCE_FILENAME }.js`))
  )
  let Iso3166Table = NaiveCsv.toTable(
    await promises.readFile(`${ process.cwd() }/${ SRC }/csv/iso3166.csv`),
    { popBlank: true }
  )
  WorldbankTable = Table.from(WorldbankTable).select([
    ['name', 'worldbankName'],
    'id',
  ])
  Iso3166Table = Table.from(Iso3166Table).select([
    ['Name', 'iso3166Name'],
    ['Alpha-3 code', 'id']
  ])
  const compareTable = WorldbankTable.join(Iso3166Table, ['id'], UNION)
  compareTable
    |> decoTable |> says['worldbank vs iso3166']

  const lexicon = [
    [/^\W+|\W+$/g, ''],
    [/\W+/g, '_'],
    [/__/g, '_']
  ] |> makeReplaceable
  const countryIsos = Table
    .from(WorldbankTable)
    .lookupTable('worldbankName', 'id')
    .map(([name, id]) => [name.replace(lexicon, x => x.trim()), id])
    |> init

  countryIsos |> deco |> logger
  await Vinylize(FILENAME + '.js')
    .p(esvar(FILENAME))
    .p(Verse.object(countryIsos))
    .pipe(gulp.dest(DEST))
}
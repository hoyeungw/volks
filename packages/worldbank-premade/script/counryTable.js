import { Table }                               from '@analys/table'
import { CountryTable, IncomeLevels, Regions } from '@volks/worldbank-countries'

export const countryTable = Table
  .from(CountryTable)
  .mutateColumn('region', x => Regions[x])
  .mutateColumn('incomeLevel', x => IncomeLevels[x])
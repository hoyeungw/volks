import { toTable }                       from '@analys/convert'
import { INCRE }                         from '@analys/enum-pivot-mode'
import { says }                          from '@palett/says'
import { deco }                          from '@spare/deco'
import { decoObject, decoTable, logger } from '@spare/logger'
import { mapper }                        from '@vect/object-mapper'
import { rawIndicators }                 from '../src/rawIndicators'


const countries = ['USA', 'GBR', 'CAN', 'AUS', 'NZL']
const indicators = {
  'SP.POP.TOTL': 'Population, total', // ['Climate', 'Health']
  'SP.URB.TOTL': 'Urban population', // ['Climate', 'Urban']
  'SP.RUR.TOTL': 'Rural population', // ['AgriRural']
  'AG.LND.AGRI.K2': 'Agricultural land (sq. km)'
}
const test = async () => {
  let table = await rawIndicators({
    indicator: mapper(indicators, (definition) => /population/i.test(definition) ? (v => Math.round(+v / 1E+6)) : null),
    country: ['RUS'],
    spin: true
  })
  table |>  deco |> says['table in object']
  table |> decoTable |> logger
  table.indicators |> decoObject |> says['indicators']
  table.countries |> decoObject |> says['countries']
  table = table
    .crosTab({
      side: 'date',
      banner: 'indicator',
      field: { value: INCRE }
    })
    .toTable('date') |> toTable
  table.mutate(Math.round)
    |> decoTable
    |> logger
}

test()
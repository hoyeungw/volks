import { says }                 from '@palett/says'
import { deco }                 from '@spare/deco'
import { decoTable }            from '@spare/logger'
import { IndicatorsCollection } from '@volks/worldbank-premade'
import { seriesIndicators }     from '../src/seriesIndicators'

const test = async () => {
  const tables = await seriesIndicators({
    indicator: IndicatorsCollection.MajorEconomy,
    country: ['CHN', 'USA', 'DEU', 'RUS'],
    year: [1999, 2019],
    autoRefine: true,
    spin: true
  }, {
    side: 'year',
    banner: 'indicator',
    sumBy: 'value',
    distinctBy: 'country'
  })
  for (let [key, table] of Object.entries(tables)) {
    table.title |> deco |> says[key]
    table.meta |> deco |> says[key]
    table |> decoTable |> says[key]
  }
}

test()
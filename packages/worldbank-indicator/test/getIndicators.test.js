import { says }                          from '@palett/says'
import { deco }                          from '@spare/deco'
import { decoObject, decoTable, logger } from '@spare/logger'
import { getIndicators }                 from '../src/getIndicators'

const indicators = {
  // 'SP.POP.TOTL': 'Population, total', // ['Climate', 'Health']
  // 'SP.URB.TOTL': 'Urban population', // ['Climate', 'Urban']
  // 'SP.RUR.TOTL': 'Rural population', // ['AgriRural']
  // 'SP.POP.0014.TO.ZS': 'Population ages 0-14 (% of total population)', // ['Edu', 'Health']
  // 'SP.POP.1564.TO.ZS': 'Population ages 15-64 (% of total population)', // ['Edu', 'Health']
  // 'SP.POP.65UP.TO.ZS': 'Population ages 65 and above (% of total population)', // ['Health']
  'SL.EMP.1524.SP.ZS': 'Employment to population ratio, ages 15-24, total (%) (modeled ILO estimate)', // ['Labor']
  'SL.IND.EMPL.ZS': 'Employment in industry (% of total employment) (modeled ILO estimate)', // ['Labor']
  'SL.AGR.EMPL.ZS': 'Employment in agriculture (% of total employment) (modeled ILO estimate)', // ['AgriRural', 'Labor']
  'SL.SRV.EMPL.ZS': 'Employment in services (% of total employment) (modeled ILO estimate)', // ['Labor']
}
const test = async () => {
  const table = await getIndicators({
    indicator: Object.keys(indicators),
    country: ['CHN', 'IND', 'RUS', 'GBK'],
    spin: true
  })
  table.indicators |> decoObject |> says['indicators']
  table.countries |> decoObject |> says['countries']
  table |>  deco |> says['table in object']
  table |> decoTable |> logger
}

test()
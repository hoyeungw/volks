import { INCRE }             from '@analys/enum-pivot-mode'
import { says }              from '@palett/says'
import { deco }              from '@spare/deco'
import { decoTable, logger } from '@spare/logger'
import { rawIndicators }     from '../src/rawIndicators'

const indicators = {
  'NY.GDP.MKTP.CD': 'GDP (current US$)', // ['Econ']
  'NV.AGR.TOTL.CD': 'Agriculture, forestry, and fishing, value added (current US$)', // ['AgriRural', 'Econ']
  'NV.IND.TOTL.CD': 'Industry (including construction), value added (current US$)', // ['Econ']
  'NV.SRV.TETC.CD': 'Services, etc., value added (current US$)', // ['Econ']
  'NE.CON.PETC.CD': 'Household final consumption expenditure, etc. (current US$)', // ['Econ']
  'NY.GNS.ICTR.CD': 'Gross savings (current US$)', // ['Econ']
}

const test = async () => {
  const table = await rawIndicators({
    indicator: indicators, //mapper(indicators, () => (v => Math.round(+v / 1E+6))),
    country: ['CHN', 'USA', 'JPN', 'ECS', 'SAS', 'SSF', 'LCN'],
    year: [2019, 2018, 2014, 2007, 2000, 1993, 1986, 1979],
    autoRefine: true,
    spin: true
  })
  table |>  deco |> says['table in object']
  table |> decoTable |> logger
  table.meta |> deco |> says['table meta']
  table
    .crosTab({
      side: ['indicator', 'year'],
      banner: 'country',
      field: { value: INCRE },
    })
    .toTable(['indicator', 'year'])
    |> decoTable
    |> logger
}

test()
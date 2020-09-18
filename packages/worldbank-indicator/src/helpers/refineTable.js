import { refineIndicators } from './refineIndicators'

export const refineTable = (table, indicators) => {
  const indicatorColumn = table.column('indicator')
  const indicatorMappers = refineIndicators(indicators)
  // indicatorMappers |> deco |> logger
  for (let [indicator, mapper] of Object.entries(indicatorMappers)) if (mapper)
    table.mutateColumn('value', (x, i) => indicatorColumn[i] === indicator ? mapper(x) : x)
  return table
}
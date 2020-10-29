import { decoVector, logger } from '@spare/logger'
import { Sources }            from '@volks/worldbank-sources'

const sources = Object.values(Sources).map(({ rows }) => rows.map(([id, name]) => id + ' | ' + name)).flat()

sources |> decoVector |> logger
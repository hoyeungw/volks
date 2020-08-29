import { deco }   from '@spare/deco'
import { logger } from '@spare/logger'

const country = 'USA | United States'
const reg = /^(?<=\s*)[\w.]+(?=\s+\|)/ //  /(?<=\|\s*)\w+$/
country.match(reg) |> deco |> logger

reg.exec(country) |> deco |> logger

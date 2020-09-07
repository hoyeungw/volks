import { bound }     from '@aryth/bound-vector'
import { isNumeric } from '@typen/num-strict'

export const parseLabel = label => Array.isArray(label) ? label : [label]

export const parseYear = year => {
  if (Array.isArray(year) && year?.length) {
    const { max, min } = bound(year)
    return [min, max]
  }
  if (isNumeric(year)) return [year, year]
  return WITHIN_5_YEARS
}
import { NUM_ASC }        from '@aryth/comparer'
import { isNumeric }      from '@typen/num-strict'
import { WITHIN_5_YEARS } from './constants'


export const parseLabel = label => Array.isArray(label) ? label : [label]

export const parseYear = year => {
  if (Array.isArray(year) && year?.length) return year.sort(NUM_ASC), year
  if (isNumeric(year)) return [year, year]
  return WITHIN_5_YEARS
}

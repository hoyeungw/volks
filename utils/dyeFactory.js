import { DyeFactory }   from '@palett/dye'
import { HEX }          from '@palett/enum-color-space'
import { BOLD, ITALIC } from '@palett/enum-font-effects'

export const dyeFactory = DyeFactory.prep(HEX, BOLD, ITALIC)
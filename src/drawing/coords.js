import { OFFSET_X, OFFSET_Y, SCALE, HOUSE_DEPTH } from '../config/constants.js'

export function toPxX(xFt) {
  return OFFSET_X + xFt * SCALE
}

export function toPxY(yFt) {
  return OFFSET_Y + (HOUSE_DEPTH - yFt) * SCALE
}

export function toPxSize(ft) {
  return ft * SCALE
}
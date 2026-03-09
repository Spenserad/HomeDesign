import { drawWindowHorizontal, drawWindowVertical } from '../drawing/primitives.js'

export function renderWindows(draw, windows) {
  for (const item of windows) {
    if (item.wall === 'h') {
      drawWindowHorizontal(draw, item.x1, item.x2, item.y)
    } else {
      drawWindowVertical(draw, item.x, item.y1, item.y2)
    }
  }
}
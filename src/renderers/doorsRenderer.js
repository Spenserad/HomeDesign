import {
  drawDoorHorizontal,
  drawDoorVertical,
  drawDoubleDoorHorizontal,
  drawDoubleDoorVertical,
  drawSlidingDoorHorizontal
} from '../drawing/primitives.js'

export function renderDoors(draw, doors) {
  for (const item of doors) {
    if (item.kind === 'sliding' && item.wall === 'h') {
      drawSlidingDoorHorizontal(draw, item.x1, item.x2, item.y)
      continue
    }

    if (item.kind === 'double' && item.wall === 'h') {
      drawDoubleDoorHorizontal(draw, item.centerX, item.y, item.width)
      continue
    }

    if (item.kind === 'double' && item.wall === 'v') {
      drawDoubleDoorVertical(draw, item.x, item.centerY, item.width)
      continue
    }

    if (item.kind === 'single' && item.wall === 'h') {
      drawDoorHorizontal(draw, item.x1, item.x2, item.y)
      continue
    }

    if (item.kind === 'single' && item.wall === 'v') {
      drawDoorVertical(draw, item.x, item.y1, item.y2)
    }
  }
}
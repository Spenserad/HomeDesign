import { HOUSE_WIDTH, HOUSE_DEPTH, OFFSET_X, OFFSET_Y, SCALE } from '../config/constants.js'
import { drawDashedHorizontalLine, drawLine, drawRect } from '../drawing/primitives.js'
import { addText } from '../drawing/text.js'

export function renderWalls(draw, walls) {
  if (walls.outerBorder) {
    draw.rect(HOUSE_WIDTH * SCALE, HOUSE_DEPTH * SCALE)
      .move(OFFSET_X, OFFSET_Y)
      .fill('none')
      .stroke({ width: 4, color: '#111' })
  }

  for (const line of walls.dashed ?? []) {
    drawDashedHorizontalLine(draw, line.x1, line.x2, line.y)
  }

  for (const line of walls.interiorLines ?? []) {
    drawLine(draw, line.x1, line.y1, line.x2, line.y2, { width: 2, color: '#555' })
  }

  for (const rect of walls.interiorRects ?? []) {
    drawRect(draw, rect.x, rect.y, rect.w, rect.h, {
      fill: 'none',
      stroke: { width: 2, color: '#555' }
    })

    addText(draw, rect.label, rect.x + 0.4, rect.y + rect.h / 2, rect.labelSize ?? 10)
  }
}
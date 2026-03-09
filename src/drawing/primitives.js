import { toPxX, toPxY, toPxSize } from './coords.js'

export function drawLine(draw, x1, y1, x2, y2, stroke) {
  return draw.line(toPxX(x1), toPxY(y1), toPxX(x2), toPxY(y2)).stroke(stroke)
}

export function drawRect(draw, x, y, w, h, options = {}) {
  return draw.rect(toPxSize(w), toPxSize(h))
    .move(toPxX(x), toPxY(y + h))
    .fill(options.fill ?? 'none')
    .stroke(options.stroke ?? { width: 2, color: '#555' })
}

export function drawDashedHorizontalLine(draw, x1, x2, y) {
  return drawLine(draw, x1, y, x2, y, { width: 2, color: '#777', dasharray: '8,6' })
}

export function drawWindowHorizontal(draw, x1, x2, y) {
  drawLine(draw, x1, y, x2, y, { width: 7, color: '#ffffff' })
  drawLine(draw, x1, y, x2, y, { width: 2, color: '#3a7bd5' })
}

export function drawWindowVertical(draw, x, y1, y2) {
  drawLine(draw, x, y1, x, y2, { width: 7, color: '#ffffff' })
  drawLine(draw, x, y1, x, y2, { width: 2, color: '#3a7bd5' })
}

export function drawDoorHorizontal(draw, x1, x2, y) {
  drawLine(draw, x1, y, x2, y, { width: 7, color: '#ffffff' })
  drawLine(draw, x1, y, x2, y, { width: 1.5, color: '#666' })
}

export function drawDoorVertical(draw, x, y1, y2) {
  drawLine(draw, x, y1, x, y2, { width: 7, color: '#ffffff' })
  drawLine(draw, x, y1, x, y2, { width: 1.5, color: '#666' })
}

export function drawDoubleDoorHorizontal(draw, centerX, y, width = 6) {
  const half = width / 2
  drawDoorHorizontal(draw, centerX - half, centerX + half, y)
  draw.line(toPxX(centerX), toPxY(y) - 6, toPxX(centerX), toPxY(y) + 6)
    .stroke({ width: 1.5, color: '#666' })
}

export function drawDoubleDoorVertical(draw, x, centerY, width = 5) {
  const half = width / 2
  drawDoorVertical(draw, x, centerY - half, centerY + half)
  draw.line(toPxX(x) - 6, toPxY(centerY), toPxX(x) + 6, toPxY(centerY))
    .stroke({ width: 1.5, color: '#666' })
}

export function drawSlidingDoorHorizontal(draw, x1, x2, y) {
  drawLine(draw, x1, y, x2, y, { width: 8, color: '#ffffff' })
  drawLine(draw, x1, y, x2, y, { width: 2, color: '#2d6a4f' })

  const mid = (x1 + x2) / 2
  draw.line(toPxX(mid), toPxY(y) - 5, toPxX(mid), toPxY(y) + 5)
    .stroke({ width: 1.5, color: '#2d6a4f' })
}
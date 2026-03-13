import { HOUSE_WIDTH } from '../config/constants.js'
import { toPxX, toPxY } from '../drawing/coords.js'

const style = {
  line: { width: 1.5, color: '#3f3f46' },
  extension: { width: 1, color: '#71717a' },
  text: { size: 10, family: 'Arial', fill: '#27272a' },
  offset: 8,
  tick: 5
}

function drawXDimension(draw, dimension) {
  const y = toPxY(dimension.at)
  const x1 = toPxX(dimension.from)
  const x2 = toPxX(dimension.to)

  draw.line(x1, y, x2, y).stroke(style.line)
  draw.line(x1, y - style.tick, x1, y + style.tick).stroke(style.line)
  draw.line(x2, y - style.tick, x2, y + style.tick).stroke(style.line)

  draw.line(x1, toPxY(0), x1, y).stroke(style.extension)
  draw.line(x2, toPxY(0), x2, y).stroke(style.extension)

  draw.text(dimension.label)
    .center((x1 + x2) / 2, y - style.offset)
    .font(style.text)
}

function drawYDimension(draw, dimension) {
  const x = toPxX(dimension.at)
  const y1 = toPxY(dimension.from)
  const y2 = toPxY(dimension.to)

  draw.line(x, y1, x, y2).stroke(style.line)
  draw.line(x - style.tick, y1, x + style.tick, y1).stroke(style.line)
  draw.line(x - style.tick, y2, x + style.tick, y2).stroke(style.line)

  draw.line(toPxX(HOUSE_WIDTH), y1, x, y1).stroke(style.extension)
  draw.line(toPxX(HOUSE_WIDTH), y2, x, y2).stroke(style.extension)

  draw.text(dimension.label)
    .center(x + 34, (y1 + y2) / 2)
    .font(style.text)
    .rotate(-90)
}

function drawDimension(draw, dimension) {
  if (dimension.axis === 'x') {
    drawXDimension(draw, dimension)
    return
  }

  drawYDimension(draw, dimension)
}

export function renderDimensions(draw, dimensions) {
  for (const dimension of dimensions?.exteriorSpans ?? []) {
    drawDimension(draw, dimension)
  }

  for (const dimension of dimensions?.interiorCritical ?? []) {
    drawDimension(draw, dimension)
  }
}

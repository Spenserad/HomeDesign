import { toPxX, toPxY } from './coords.js'

export function addText(draw, text, xFt, yFt, size = 11, options = {}) {
  const { anchor = 'start' } = options

  return draw.text(text)
    .move(toPxX(xFt), toPxY(yFt))
    .font({ size, family: 'Arial', anchor })
}
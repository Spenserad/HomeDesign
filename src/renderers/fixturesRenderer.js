import { toPxX, toPxY, toPxSize } from '../drawing/coords.js'

function drawCornerFireplace(draw, fireplace) {
  const { corner, x, y, size = 4 } = fireplace

  const px = toPxX(x)
  const py = toPxY(y)
  const s = toPxSize(size)

  let points = ''

  switch (corner) {
    case 'bottom-left':
      // right angle at bottom-left corner of the triangle
      points = [
        [px, py],
        [px + s, py],
        [px, py - s]
      ].map(([x, y]) => `${x},${y}`).join(' ')
      break

    case 'bottom-right':
      points = [
        [px, py],
        [px - s, py],
        [px, py - s]
      ].map(([x, y]) => `${x},${y}`).join(' ')
      break

    case 'top-left':
      points = [
        [px, py],
        [px + s, py],
        [px, py + s]
      ].map(([x, y]) => `${x},${y}`).join(' ')
      break

    case 'top-right':
      points = [
        [px, py],
        [px - s, py],
        [px, py + s]
      ].map(([x, y]) => `${x},${y}`).join(' ')
      break

    default:
      return
  }

  draw.polygon(points)
    .fill('#f3f3f3')
    .stroke({ width: 2, color: '#444' })
}

export function renderFixtures(draw, fixtures = {}) {
  for (const fireplace of fixtures.fireplaces ?? []) {
    drawCornerFireplace(draw, fireplace)
  }
}
import { toPxX, toPxY, toPxSize } from '../drawing/coords.js'

function drawOutlet(draw, outlet) {
  const x = toPxX(outlet.x)
  const y = toPxY(outlet.y)

  draw.circle(toPxSize(0.7))
    .center(x, y)
    .fill('#ffffff')
    .stroke({ width: 1.5, color: '#6c4f3d' })

  draw.line(x - 2, y, x + 2, y).stroke({ width: 1, color: '#6c4f3d' })
}

function drawSwitch(draw, sw) {
  const x = toPxX(sw.x)
  const y = toPxY(sw.y)

  draw.rect(toPxSize(0.9), toPxSize(0.5))
    .center(x, y)
    .fill('#ffffff')
    .stroke({ width: 1.2, color: '#6c4f3d' })
}

export function renderElectrical(draw, electrical = {}) {
  for (const outlet of electrical.outlets ?? []) {
    drawOutlet(draw, outlet)
  }

  for (const sw of electrical.switches ?? []) {
    drawSwitch(draw, sw)
  }
}

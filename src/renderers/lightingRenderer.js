import { toPxX, toPxY, toPxSize } from '../drawing/coords.js'

function drawCeilingLight(draw, fixture) {
  const x = toPxX(fixture.x)
  const y = toPxY(fixture.y)
  const r = toPxSize(fixture.radius ?? 0.6)

  draw.circle(r * 2)
    .center(x, y)
    .fill('#fff9db')
    .stroke({ width: 1.5, color: '#9a6700' })

  draw.line(x - r, y - r, x + r, y + r).stroke({ width: 1, color: '#9a6700' })
  draw.line(x - r, y + r, x + r, y - r).stroke({ width: 1, color: '#9a6700' })
}

export function renderLighting(draw, lighting = {}) {
  for (const fixture of lighting.ceiling ?? []) {
    drawCeilingLight(draw, fixture)
  }
}

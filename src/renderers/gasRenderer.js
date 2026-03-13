import { drawLine } from '../drawing/primitives.js'

export function renderGas(draw, gas = []) {
  for (const run of gas) {
    drawLine(draw, run.x1, run.y1, run.x2, run.y2, {
      width: 2,
      color: '#d97706',
      dasharray: '7,5'
    })
  }
}

import { drawLine } from '../drawing/primitives.js'

export function renderPlumbing(draw, plumbing = []) {
  for (const run of plumbing) {
    drawLine(draw, run.x1, run.y1, run.x2, run.y2, {
      width: 2,
      color: '#0077b6',
      dasharray: '4,4'
    })
  }
}

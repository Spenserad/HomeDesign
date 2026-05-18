import { toPxX, toPxY, toPxSize } from '../drawing/coords.js'
import { drawLine, drawRect } from '../drawing/primitives.js'
import { addText } from '../drawing/text.js'

const DEFAULT_STAIR_STROKE = { width: 2, color: '#444' }
const CUT_PLANE_STROKE = { width: 2, color: '#777', dasharray: '6,5' }
const UNDER_STAIR_STROKE = { width: 1.5, color: '#777', dasharray: '4,4' }

function getSegmentBounds(segment) {
  const x1 = segment.x
  const y1 = segment.y
  const x2 = segment.direction === 'east' ? segment.x + segment.run : segment.x + segment.width
  const y2 = segment.direction === 'north' ? segment.y + segment.run : segment.y + segment.width

  return {
    x: Math.min(x1, x2),
    y: Math.min(y1, y2),
    w: Math.abs(x2 - x1),
    h: Math.abs(y2 - y1)
  }
}

function drawStairTreads(draw, bounds, direction, visible = true) {
  const treadSpacing = 1.25
  const treadStroke = visible ? { width: 1, color: '#777' } : CUT_PLANE_STROKE

  if (direction === 'east') {
    for (let x = bounds.x + treadSpacing; x < bounds.x + bounds.w; x += treadSpacing) {
      drawLine(draw, x, bounds.y, x, bounds.y + bounds.h, treadStroke)
    }
    return
  }

  if (direction === 'north') {
    for (let y = bounds.y + treadSpacing; y < bounds.y + bounds.h; y += treadSpacing) {
      drawLine(draw, bounds.x, y, bounds.x + bounds.w, y, treadStroke)
    }
  }
}

function drawArrow(draw, arrow) {
  if (!arrow) return

  const x = toPxX(arrow.x)
  const y = toPxY(arrow.y)
  const length = toPxSize(arrow.length ?? 3)
  const size = arrow.size ?? 7
  const color = arrow.color ?? '#222'

  let x2 = x
  let y2 = y

  if (arrow.direction === 'east') x2 = x + length
  if (arrow.direction === 'west') x2 = x - length
  if (arrow.direction === 'north') y2 = y - length
  if (arrow.direction === 'south') y2 = y + length

  draw.line(x, y, x2, y2).stroke({ width: 2, color })

  const points = {
    east: [[x2, y2], [x2 - size, y2 - size / 2], [x2 - size, y2 + size / 2]],
    west: [[x2, y2], [x2 + size, y2 - size / 2], [x2 + size, y2 + size / 2]],
    north: [[x2, y2], [x2 - size / 2, y2 + size], [x2 + size / 2, y2 + size]],
    south: [[x2, y2], [x2 - size / 2, y2 - size], [x2 + size / 2, y2 - size]]
  }[arrow.direction]

  draw.polygon(points.map((point) => point.join(',')).join(' ')).fill(color)
}

function drawBoundary(draw, bounds, visible) {
  drawRect(draw, bounds.x, bounds.y, bounds.w, bounds.h, {
    fill: 'none',
    stroke: visible ? DEFAULT_STAIR_STROKE : CUT_PLANE_STROKE
  })
}

function drawLanding(draw, landing) {
  drawRect(draw, landing.x, landing.y, landing.w, landing.h, {
    fill: 'none',
    stroke: DEFAULT_STAIR_STROKE
  })

  if (landing.label) {
    addText(draw, landing.label, landing.x + 0.35, landing.y + 0.55, landing.labelSize ?? 8)
  }
}

function drawUnderStair(draw, underStair) {
  if (!underStair) return

  drawRect(draw, underStair.x, underStair.y, underStair.w, underStair.h, {
    fill: 'none',
    stroke: UNDER_STAIR_STROKE
  })

  if (underStair.label) {
    addText(draw, underStair.label, underStair.x + 0.35, underStair.y + underStair.h / 2, underStair.labelSize ?? 8)
  }
}

function renderStairView(draw, view) {
  for (const segment of view.segments ?? []) {
    const bounds = getSegmentBounds(segment)
    const visible = segment.visibility !== 'overhead'

    drawBoundary(draw, bounds, visible)
    drawStairTreads(draw, bounds, segment.direction, visible)
  }

  for (const landing of view.landings ?? []) {
    drawLanding(draw, landing)
  }

  for (const opening of view.openings ?? []) {
    drawRect(draw, opening.x, opening.y, opening.w, opening.h, {
      fill: 'none',
      stroke: { width: 2, color: '#444', dasharray: '8,5' }
    })
    if (opening.label) {
      addText(draw, opening.label, opening.x + 0.35, opening.y + opening.h / 2, opening.labelSize ?? 8)
    }
  }

  drawUnderStair(draw, view.underStair)
  drawArrow(draw, view.arrow)

  if (view.label) {
    addText(draw, view.label.text, view.label.x, view.label.y, view.label.size ?? 10)
  }
}

export function renderStairs(draw, stairs = [], levelId) {
  for (const stair of stairs) {
    const view = stair.views?.[levelId]
    if (!view) continue
    renderStairView(draw, view)
  }
}

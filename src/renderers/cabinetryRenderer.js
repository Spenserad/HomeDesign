import { toPxX, toPxY, toPxSize } from '../drawing/coords.js'

const BASE_FILL = '#efe4cf'
const ISLAND_FILL = '#e6d7bc'
const UPPER_FILL = '#f5ead8'
const STROKE = '#6f5a3f'
const APPLIANCE_FILL = '#f3f3f3'
const APPLIANCE_STROKE = '#666'

function drawCabinetRect(draw, x, y, w, h, options = {}) {
  const fill = options.fill ?? BASE_FILL
  const stroke = options.stroke ?? { width: 2, color: STROKE }

  draw.rect(toPxSize(w), toPxSize(h))
    .move(toPxX(x), toPxY(y + h))
    .fill(fill)
    .stroke(stroke)
}

function drawLabel(draw, text, x, y, size = 10) {
  draw.text(text)
    .move(toPxX(x), toPxY(y))
    .font({ size, family: 'Arial', anchor: 'middle' })
}

function drawSink(draw, item) {
  const x = item.x
  const y = item.y
  const w = item.w ?? 2.5
  const h = item.h ?? 2

  // cabinet footprint
  drawCabinetRect(draw, x, y, w, h, { fill: BASE_FILL })

  // sink bowls
  const outerX = toPxX(x + 0.2)
  const outerY = toPxY(y + h - 0.2)
  const bowlW = toPxSize((w - 0.5) / 2)
  const bowlH = toPxSize(h - 0.5)
  const gap = toPxSize(0.1)

  draw.rect(bowlW, bowlH)
    .move(outerX, outerY - bowlH)
    .fill('#ffffff')
    .stroke({ width: 1.5, color: APPLIANCE_STROKE })

  draw.rect(bowlW, bowlH)
    .move(outerX + bowlW + gap, outerY - bowlH)
    .fill('#ffffff')
    .stroke({ width: 1.5, color: APPLIANCE_STROKE })
}

function drawRange(draw, item) {
  const x = item.x
  const y = item.y
  const w = item.w ?? 2.5
  const h = item.h ?? 2

  draw.rect(toPxSize(w), toPxSize(h))
    .move(toPxX(x), toPxY(y + h))
    .fill(APPLIANCE_FILL)
    .stroke({ width: 2, color: APPLIANCE_STROKE })

  // burners
  const centers = [
    [x + w * 0.3, y + h * 0.33],
    [x + w * 0.7, y + h * 0.33],
    [x + w * 0.3, y + h * 0.72],
    [x + w * 0.7, y + h * 0.72]
  ]

  for (const [cx, cy] of centers) {
    draw.circle(toPxSize(0.35))
      .center(toPxX(cx), toPxY(cy))
      .fill('none')
      .stroke({ width: 1.5, color: APPLIANCE_STROKE })
  }

  if (item.label !== false) {
    drawLabel(draw, 'Range', x + w / 2, y + h / 2 + 0.1, 9)
  }
}

function drawFridge(draw, item) {
  const x = item.x
  const y = item.y
  const w = item.w ?? 3
  const h = item.h ?? 2.5

  draw.rect(toPxSize(w), toPxSize(h))
    .move(toPxX(x), toPxY(y + h))
    .fill(APPLIANCE_FILL)
    .stroke({ width: 2, color: APPLIANCE_STROKE })

  // split doors
  draw.line(
    toPxX(x + w * 0.55),
    toPxY(y),
    toPxX(x + w * 0.55),
    toPxY(y + h)
  ).stroke({ width: 1.5, color: APPLIANCE_STROKE })

  // handles
  draw.line(
    toPxX(x + w * 0.48),
    toPxY(y + 0.35),
    toPxX(x + w * 0.48),
    toPxY(y + h - 0.35)
  ).stroke({ width: 1, color: APPLIANCE_STROKE })

  draw.line(
    toPxX(x + w * 0.66),
    toPxY(y + 0.35),
    toPxX(x + w * 0.66),
    toPxY(y + h - 0.35)
  ).stroke({ width: 1, color: APPLIANCE_STROKE })

  if (item.label !== false) {
    drawLabel(draw, 'Fridge', x + w / 2, y + h / 2 + 0.1, 9)
  }
}

function drawBaseRun(draw, item) {
  drawCabinetRect(draw, item.x, item.y, item.w, item.h ?? 2, { fill: BASE_FILL })

  if (item.label) {
    drawLabel(draw, item.label, item.x + item.w / 2, item.y + (item.h ?? 2) / 2 + 0.1, 9)
  }
}

function drawUpperRun(draw, item) {
  drawCabinetRect(draw, item.x, item.y, item.w, item.h ?? 1, { fill: UPPER_FILL })

  if (item.label) {
    drawLabel(draw, item.label, item.x + item.w / 2, item.y + (item.h ?? 1) / 2 + 0.05, 8)
  }
}

function drawTallCabinet(draw, item) {
  drawCabinetRect(draw, item.x, item.y, item.w ?? 2.5, item.h ?? 2.5, { fill: '#e8dbc5' })

  if (item.label) {
    drawLabel(draw, item.label, item.x + (item.w ?? 2.5) / 2, item.y + (item.h ?? 2.5) / 2 + 0.1, 8)
  }
}

function drawIsland(draw, item) {
  const w = item.w
  const h = item.h
  drawCabinetRect(draw, item.x, item.y, w, h, { fill: ISLAND_FILL })

  // optional seating overhang indicator
  if (item.seatingSide) {
    const overhang = item.overhang ?? 0.5

    if (item.seatingSide === 'top') {
      draw.rect(toPxSize(w), toPxSize(overhang))
        .move(toPxX(item.x), toPxY(item.y + h + overhang))
        .fill('none')
        .stroke({ width: 1.5, color: '#999', dasharray: '5,4' })
    } else if (item.seatingSide === 'bottom') {
      draw.rect(toPxSize(w), toPxSize(overhang))
        .move(toPxX(item.x), toPxY(item.y + overhang))
        .fill('none')
        .stroke({ width: 1.5, color: '#999', dasharray: '5,4' })
    } else if (item.seatingSide === 'left') {
      draw.rect(toPxSize(overhang), toPxSize(h))
        .move(toPxX(item.x - overhang), toPxY(item.y + h))
        .fill('none')
        .stroke({ width: 1.5, color: '#999', dasharray: '5,4' })
    } else if (item.seatingSide === 'right') {
      draw.rect(toPxSize(overhang), toPxSize(h))
        .move(toPxX(item.x + w), toPxY(item.y + h))
        .fill('none')
        .stroke({ width: 1.5, color: '#999', dasharray: '5,4' })
    }
  }

  if (item.label) {
    drawLabel(draw, item.label, item.x + w / 2, item.y + h / 2 + 0.1, 9)
  }
}

function drawDesk(draw, item) {
  drawCabinetRect(draw, item.x, item.y, item.w, item.h ?? 2, { fill: '#e8dfd1' })

  if (item.label !== false) {
    drawLabel(draw, item.label ?? 'Desk', item.x + item.w / 2, item.y + (item.h ?? 2) / 2 + 0.1, 9)
  }
}

function drawDrawerBank(draw, item) {
  const x = item.x
  const y = item.y
  const w = item.w ?? 2
  const h = item.h ?? 2

  drawCabinetRect(draw, x, y, w, h, { fill: BASE_FILL })

  // 3 drawer lines
  for (const frac of [1 / 3, 2 / 3]) {
    draw.line(
      toPxX(x),
      toPxY(y + h * frac),
      toPxX(x + w),
      toPxY(y + h * frac)
    ).stroke({ width: 1.2, color: STROKE })
  }

  if (item.label) {
    drawLabel(draw, item.label, x + w / 2, y + h / 2 + 0.1, 8)
  }
}

export function renderCabinetry(draw, cabinetry = []) {
  for (const item of cabinetry) {
    switch (item.type) {
      case 'base-run':
      case 'wall-run':
        drawBaseRun(draw, item)
        break

      case 'upper-run':
        drawUpperRun(draw, item)
        break

      case 'tall':
      case 'pantry-cabinet':
        drawTallCabinet(draw, item)
        break

      case 'island':
        drawIsland(draw, item)
        break

      case 'sink':
        drawSink(draw, item)
        break

      case 'range':
      case 'stove':
        drawRange(draw, item)
        break

      case 'fridge':
      case 'refrigerator':
        drawFridge(draw, item)
        break

      case 'desk':
      case 'built-in-desk':
        drawDesk(draw, item)
        break

      case 'drawers':
      case 'drawer-bank':
        drawDrawerBank(draw, item)
        break

      default:
        // fallback generic rectangle so unknown items still render
        if (
          typeof item.x === 'number' &&
          typeof item.y === 'number' &&
          typeof item.w === 'number' &&
          typeof item.h === 'number'
        ) {
          drawCabinetRect(draw, item.x, item.y, item.w, item.h)
          if (item.label) {
            drawLabel(draw, item.label, item.x + item.w / 2, item.y + item.h / 2 + 0.1, 8)
          }
        }
        break
    }
  }
}
import { SVG } from 'https://cdn.jsdelivr.net/npm/@svgdotjs/svg.js/+esm'

const draw = SVG()
  .addTo('#canvas')
  .size('100%', '100%')

const SCALE = 12
const HOUSE_WIDTH = 60
const HOUSE_DEPTH = 44
const OFFSET_X = 30
const OFFSET_Y = 30

const rooms = [
  { id: "master",     name: "Master Bedroom", x: 0,  y: 0,  w: 17, h: 14, type: "bedroom" },
  { id: "bath_left",  name: "Shared Bath",    x: 0,  y: 14, w: 17, h: 7,  type: "bathroom" },
  { id: "bed2",       name: "Bedroom 2",      x: 0,  y: 21, w: 17, h: 9,  type: "bedroom" },
  { id: "garage",     name: "Garage",         x: 0,  y: 30, w: 17, h: 14, type: "garage" },

  { id: "great",      name: "Great Room",     x: 17, y: 0,  w: 28, h: 36, type: "great" },
  { id: "porch",      name: "Covered Porch",  x: 17, y: 36, w: 28, h: 8,  type: "porch" },

  { id: "bed3",       name: "Bedroom 3",      x: 45, y: 0,  w: 15, h: 13, type: "bedroom" },
  { id: "bath_right", name: "Shared Bath",    x: 45, y: 13, w: 15, h: 7,  type: "bathroom" },
  { id: "bed4",       name: "Bedroom 4",      x: 45, y: 20, w: 15, h: 9,  type: "bedroom" },
  { id: "utility",    name: "Utility Area",   x: 45, y: 29, w: 15, h: 15, type: "utility" }
]

function getFill(type) {
  switch (type) {
    case 'garage': return '#e8e8e8'
    case 'porch': return '#f0f0f0'
    case 'bathroom': return '#f9f9f9'
    case 'utility': return '#efefef'
    case 'great': return '#f7f7f7'
    default: return '#f5f5f5'
  }
}

function toPxX(xFt) {
  return OFFSET_X + xFt * SCALE
}

function toPxY(yFt) {
  return OFFSET_Y + (HOUSE_DEPTH - yFt) * SCALE
}

function drawRoom(room) {
  const x = toPxX(room.x)
  const y = toPxY(room.y + room.h)
  const w = room.w * SCALE
  const h = room.h * SCALE

  draw.rect(w, h)
    .move(x, y)
    .fill(getFill(room.type))
    .stroke({ width: 3, color: '#222' })

  draw.text(room.name)
    .move(x + 8, y + 8)
    .font({ size: 12, family: 'Arial' })

  draw.text(`${room.w}' x ${room.h}'`)
    .move(x + 8, y + 26)
    .font({ size: 11, family: 'Arial' })
}

function drawWindowOnHorizontalWall(x1Ft, x2Ft, yFt) {
  draw.line(toPxX(x1Ft), toPxY(yFt), toPxX(x2Ft), toPxY(yFt))
    .stroke({ width: 7, color: '#ffffff' })

  draw.line(toPxX(x1Ft), toPxY(yFt), toPxX(x2Ft), toPxY(yFt))
    .stroke({ width: 2, color: '#3a7bd5' })
}

function drawWindowOnVerticalWall(xFt, y1Ft, y2Ft) {
  draw.line(toPxX(xFt), toPxY(y1Ft), toPxX(xFt), toPxY(y2Ft))
    .stroke({ width: 7, color: '#ffffff' })

  draw.line(toPxX(xFt), toPxY(y1Ft), toPxX(xFt), toPxY(y2Ft))
    .stroke({ width: 2, color: '#3a7bd5' })
}

function drawDoorOnHorizontalWall(x1Ft, x2Ft, yFt) {
  draw.line(toPxX(x1Ft), toPxY(yFt), toPxX(x2Ft), toPxY(yFt))
    .stroke({ width: 7, color: '#ffffff' })

  draw.line(toPxX(x1Ft), toPxY(yFt), toPxX(x2Ft), toPxY(yFt))
    .stroke({ width: 1.5, color: '#666' })
}

function drawDoorOnVerticalWall(xFt, y1Ft, y2Ft) {
  draw.line(toPxX(xFt), toPxY(y1Ft), toPxX(xFt), toPxY(y2Ft))
    .stroke({ width: 7, color: '#ffffff' })

  draw.line(toPxX(xFt), toPxY(y1Ft), toPxX(xFt), toPxY(y2Ft))
    .stroke({ width: 1.5, color: '#666' })
}

function drawDoubleDoorOnHorizontalWall(centerXFt, yFt, widthFt = 6) {
  const half = widthFt / 2
  drawDoorOnHorizontalWall(centerXFt - half, centerXFt + half, yFt)

  draw.line(toPxX(centerXFt), toPxY(yFt) - 6, toPxX(centerXFt), toPxY(yFt) + 6)
    .stroke({ width: 1.5, color: '#666' })
}

function drawDoubleDoorOnVerticalWall(xFt, centerYFt, widthFt = 5) {
  const half = widthFt / 2
  drawDoorOnVerticalWall(xFt, centerYFt - half, centerYFt + half)

  draw.line(toPxX(xFt) - 6, toPxY(centerYFt), toPxX(xFt) + 6, toPxY(centerYFt))
    .stroke({ width: 1.5, color: '#666' })
}

function drawSlidingDoorOnHorizontalWall(x1Ft, x2Ft, yFt) {
  draw.line(toPxX(x1Ft), toPxY(yFt), toPxX(x2Ft), toPxY(yFt))
    .stroke({ width: 8, color: '#ffffff' })

  draw.line(toPxX(x1Ft), toPxY(yFt), toPxX(x2Ft), toPxY(yFt))
    .stroke({ width: 2, color: '#2d6a4f' })

  const mid = (x1Ft + x2Ft) / 2
  draw.line(toPxX(mid), toPxY(yFt) - 5, toPxX(mid), toPxY(yFt) + 5)
    .stroke({ width: 1.5, color: '#2d6a4f' })
}

function drawDashedHorizontalLine(x1Ft, x2Ft, yFt) {
  draw.line(toPxX(x1Ft), toPxY(yFt), toPxX(x2Ft), toPxY(yFt))
    .stroke({ width: 2, color: '#777', dasharray: '8,6' })
}

function addText(text, xFt, yFt, size = 11) {
  draw.text(text)
    .move(toPxX(xFt), toPxY(yFt))
    .font({ size, family: 'Arial' })
}

function drawCornerFireplaceTriangleBottomLeft(xFt, yFt, sizeFt = 4) {
  const x = toPxX(xFt)
  const y = toPxY(yFt)
  const s = sizeFt * SCALE

  draw.polygon([
    [x, y],
    [x + s, y],
    [x, y - s]
  ])
    .fill('none')
    .stroke({ width: 2, color: '#444' })
}

function drawInteriorRect(xFt, yFt, wFt, hFt, label, labelSize = 10) {
  draw.rect(wFt * SCALE, hFt * SCALE)
    .move(toPxX(xFt), toPxY(yFt + hFt))
    .fill('none')
    .stroke({ width: 2, color: '#555' })

  addText(label, xFt + 0.4, yFt + hFt / 2, labelSize)
}

// Draw main rooms
rooms.forEach(drawRoom)

// Outer border
draw.rect(HOUSE_WIDTH * SCALE, HOUSE_DEPTH * SCALE)
  .move(OFFSET_X, OFFSET_Y)
  .fill('none')
  .stroke({ width: 4, color: '#111' })

// Great room transition line
drawDashedHorizontalLine(17, 45, 20)

// Great room labels
addText('Dining', 22, 29, 12)
addText('Kitchen', 35, 29, 12)
addText('Living Area', 25, 11, 12)

// Fireplace
drawCornerFireplaceTriangleBottomLeft(17.0, 0, 4)
addText('Gas Fireplace', 21.8, 2.6, 10)

// Orientation labels
addText('BACK', 28, 46.4, 12)
addText('FRONT', 28, -2.0, 12)

// Exterior doors
drawDoubleDoorOnHorizontalWall(31, 0, 6)
drawDoorOnVerticalWall(0, 34, 37)

// Dining slider to porch
drawSlidingDoorOnHorizontalWall(22, 28, 36)

// Kitchen window to porch
drawWindowOnHorizontalWall(36.2, 40.2, 36)

// Interior doors
drawDoorOnVerticalWall(17, 31, 34) // garage to dining
drawDoorOnVerticalWall(45, 31, 34) // kitchen to utility
drawDoorOnVerticalWall(17, 5, 8)   // master to great room
drawDoorOnVerticalWall(17, 16, 19) // left bath
drawDoorOnVerticalWall(17, 23, 26) // bedroom 2
drawDoorOnVerticalWall(45, 5, 8)   // bedroom 3
drawDoorOnVerticalWall(45, 15, 18) // right bath
drawDoorOnVerticalWall(45, 23, 26) // bedroom 4

// Exterior windows
drawWindowOnHorizontalWall(22, 26, 0)
drawWindowOnHorizontalWall(36, 40, 0)

drawWindowOnVerticalWall(0, 3, 6)
drawWindowOnVerticalWall(0, 8, 11)
drawWindowOnVerticalWall(0, 16, 18)
drawWindowOnVerticalWall(0, 24, 27)
drawWindowOnVerticalWall(0, 31.5, 34)
drawWindowOnVerticalWall(0, 39, 42)

drawWindowOnHorizontalWall(49, 53, 0)
drawWindowOnVerticalWall(60, 5, 8)
drawWindowOnVerticalWall(60, 15, 17)
drawWindowOnVerticalWall(60, 23, 26)
drawWindowOnVerticalWall(60, 32, 34)
drawWindowOnVerticalWall(60, 39, 41)

// ------------------------
// Utility area subdivision (corrected)
// ------------------------

// Vertical wall separating laundry from hallway
draw.line(toPxX(51), toPxY(40), toPxX(51), toPxY(44))
  .stroke({ width: 2, color: '#555' })

// Laundry (left side upper)
drawInteriorRect(45, 34, 6, 10, 'Laundry')

// Half Bath (front-right)
drawInteriorRect(54, 29, 6, 5, 'Half Bath')

// Pantry (middle-right, open to hallway)
draw.line(toPxX(54), toPxY(34), toPxX(60), toPxY(34))
  .stroke({ width: 2, color: '#555' })

draw.line(toPxX(54), toPxY(39), toPxX(60), toPxY(39))
  .stroke({ width: 2, color: '#555' })

addText('Pantry', 55.0, 35.6, 10)

// HVAC / Water Heater (top-right)
drawInteriorRect(54, 39, 6, 5, 'HVAC / WH', 9)

// Doors
drawDoorOnVerticalWall(54, 30.5, 33.0)        // half bath door
drawDoubleDoorOnVerticalWall(51, 37.0, 4.5)   // laundry double doors
drawDoubleDoorOnVerticalWall(54, 41.5, 4.5)   // HVAC door

// Windows
drawWindowOnVerticalWall(60, 30.5, 32.5)      // half bath window
drawWindowOnHorizontalWall(51.2, 54.0, 44)    // back wall window between laundry and HVAC
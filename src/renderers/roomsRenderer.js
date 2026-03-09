import { toPxX, toPxY, toPxSize } from '../drawing/coords.js'

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

export function renderRooms(draw, rooms) {
  for (const room of rooms) {
    const x = toPxX(room.x)
    const y = toPxY(room.y + room.h)
    const w = toPxSize(room.w)
    const h = toPxSize(room.h)

    const anchor = room.alignRight ? 'end' : 'start'
    const textX = room.alignRight ? x + w - 10 : x + 8

    draw.rect(w, h)
      .move(x, y)
      .fill(getFill(room.type))
      .stroke({ width: 3, color: '#222' })

    draw.text(room.name)
      .move(textX, y + 8)
      .font({ size: 12, family: 'Arial', anchor })

    draw.text(`${room.w}' x ${room.h}'`)
      .move(textX, y + 26)
      .font({ size: 11, family: 'Arial', anchor })
  }
}
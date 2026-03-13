import { toPxX, toPxY, toPxSize } from '../drawing/coords.js'

export function renderAnnotations(draw, metadata = {}, levelLabel = '') {
  if (metadata.levelLabel) {
    draw.text(levelLabel)
      .move(toPxX(metadata.levelLabel.x), toPxY(metadata.levelLabel.y))
      .font({ size: 13, family: 'Arial', weight: 700, fill: '#111827' })
  }

  if (metadata.scaleNote?.text) {
    draw.text(metadata.scaleNote.text)
      .move(toPxX(metadata.scaleNote.x), toPxY(metadata.scaleNote.y))
      .font({ size: 10, family: 'Arial', fill: '#374151' })
  }

  if (metadata.northArrow) {
    const x = toPxX(metadata.northArrow.x)
    const y = toPxY(metadata.northArrow.y)
    const size = toPxSize(metadata.northArrow.size)

    draw.line(x, y + size, x, y).stroke({ width: 2, color: '#111827' })
    draw.polygon(`${x},${y - 2} ${x - size / 4},${y + size / 3} ${x + size / 4},${y + size / 3}`)
      .fill('#111827')
    draw.text('N').center(x, y + size + 10).font({ size: 11, family: 'Arial', weight: 700, fill: '#111827' })
  }
}

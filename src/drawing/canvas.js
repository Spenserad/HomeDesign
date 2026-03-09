import { SVG } from 'https://cdn.jsdelivr.net/npm/@svgdotjs/svg.js/+esm'

export function createDrawing(target = '#canvas') {
  return SVG().addTo(target).size('100%', '100%')
}
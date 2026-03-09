import { createDrawing } from '../drawing/canvas.js'
import { floorPlan } from '../data/floorPlan.js'
import { createState } from './state.js'
import { renderPlan } from './renderPlan.js'

export function createApp() {
  const draw = createDrawing('#canvas')
  const state = createState()

  renderPlan(draw, floorPlan, state)

  window.app = {
    draw,
    state,
    floorPlan,
    rerender() {
      renderPlan(draw, floorPlan, state)
    },
    toggleLayer(name) {
      state.layers[name] = !state.layers[name]
      renderPlan(draw, floorPlan, state)
    }
  }
}
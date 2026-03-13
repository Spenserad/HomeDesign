import { floorPlan, getPlanForLevel } from '../data/floorPlan.js'
import { createDrawing } from '../drawing/canvas.js'
import { renderPlan } from './renderPlan.js'
import { createState } from './state.js'

export function createApp() {
  const draw = createDrawing('#canvas')
  const state = createState(floorPlan.defaultLevelId)

  const renderCurrentPlan = () => {
    const levelPlan = getPlanForLevel(state.currentLevelId)
    renderPlan(draw, levelPlan, state)
  }

  renderCurrentPlan()

  window.app = {
    draw,
    state,
    floorPlan,
    rerender() {
      renderCurrentPlan()
    },
    setLevel(levelId) {
      state.currentLevelId = levelId
      renderCurrentPlan()
    },
    toggleLayer(name) {
      state.layers[name] = !state.layers[name]
      renderCurrentPlan()
    }
  }
}

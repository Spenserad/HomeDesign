import { createDrawing } from '../drawing/canvas.js'
import { floorPlan } from '../data/floorPlan.js'
import { createState } from './state.js'
import { renderPlan } from './renderPlan.js'

function setupLevelSelector(state, plan, onChange) {
  const selector = document.querySelector('#level-selector')
  if (!selector) {
    return
  }

  selector.innerHTML = ''

  for (const level of plan.levels ?? []) {
    const option = document.createElement('option')
    option.value = level.id
    option.textContent = level.name
    selector.appendChild(option)
  }

  selector.value = state.activeLevelId ?? ''
  selector.addEventListener('change', (event) => {
    state.activeLevelId = event.target.value
    onChange()
  })
}

export function createApp() {
  const draw = createDrawing('#canvas')
  const defaultLevelId = floorPlan.levels?.[0]?.id ?? null
  const state = createState(defaultLevelId)

  const rerender = () => renderPlan(draw, floorPlan, state)

  setupLevelSelector(state, floorPlan, rerender)
  rerender()

  window.app = {
    draw,
    state,
    floorPlan,
    rerender,
    setActiveLevel(levelId) {
      state.activeLevelId = levelId
      const selector = document.querySelector('#level-selector')
      if (selector) {
        selector.value = levelId
      }
      rerender()
    },
    toggleLayer(name) {
      state.layers[name] = !state.layers[name]
      rerender()
    }
  }
}

import { createDrawing } from '../drawing/canvas.js'
import { floorPlan } from '../data/floorPlan.js'
import { layerDefinitions, layerGroups } from '../data/layers.js'
import { createState } from './state.js'
import { renderPlan } from './renderPlan.js'

function createLayerControls(state, onLayerChange) {
  const controls = document.querySelector('#layer-controls')

  if (!controls) {
    return
  }

  controls.querySelectorAll('.layer-group').forEach((group) => group.remove())

  const definitionsByGroup = new Map(
    layerGroups.map((group) => [
      group.key,
      layerDefinitions.filter((layer) => layer.group === group.key)
    ])
  )

  for (const group of layerGroups) {
    const groupContainer = document.createElement('div')
    groupContainer.className = 'layer-group'

    const groupLabel = document.createElement('span')
    groupLabel.className = 'layer-group-label'
    groupLabel.textContent = group.label
    groupContainer.appendChild(groupLabel)

    const options = document.createElement('div')
    options.className = 'layer-options'

    for (const layer of definitionsByGroup.get(group.key) ?? []) {
      const optionLabel = document.createElement('label')
      optionLabel.className = 'layer-toggle'

      const input = document.createElement('input')
      input.type = 'checkbox'
      input.name = layer.key
      input.checked = Boolean(state.layers[layer.key])
      input.addEventListener('change', () => onLayerChange(layer.key, input.checked))

      const text = document.createElement('span')
      text.textContent = layer.label

      optionLabel.appendChild(input)
      optionLabel.appendChild(text)
      options.appendChild(optionLabel)
    }

    groupContainer.appendChild(options)
    controls.appendChild(groupContainer)
  }
}

export function createApp() {
  const draw = createDrawing('#canvas')
  const state = createState()

  const rerender = () => renderPlan(draw, floorPlan, state)

  createLayerControls(state, (name, checked) => {
    state.layers[name] = checked
    rerender()
  })

  rerender()

  window.app = {
    draw,
    state,
    floorPlan,
    rerender,
    toggleLayer(name) {
      state.layers[name] = !state.layers[name]
      rerender()
    }
  }
}

import { addText } from '../drawing/text.js'
import { layerDefinitions } from '../data/layers.js'
import { renderCabinetry } from '../renderers/cabinetryRenderer.js'
import { renderDoors } from '../renderers/doorsRenderer.js'
import { renderFixtures } from '../renderers/fixturesRenderer.js'
import { renderRooms } from '../renderers/roomsRenderer.js'
import { renderWalls } from '../renderers/wallsRenderer.js'
import { renderWindows } from '../renderers/windowsRenderer.js'

const layerRenderers = {
  rooms(draw, plan) {
    renderRooms(draw, plan.rooms)
  },
  walls(draw, plan) {
    renderWalls(draw, plan.walls)
  },
  fixtures(draw, plan) {
    renderFixtures(draw, plan.fixtures)
  },
  labels(draw, plan) {
    for (const label of plan.labels ?? []) {
      addText(draw, label.text, label.x, label.y, label.size)
    }
  },
  windows(draw, plan) {
    renderWindows(draw, plan.windows ?? [])
  },
  doors(draw, plan) {
    renderDoors(draw, plan.doors ?? [])
  },
  cabinetry(draw, plan) {
    renderCabinetry(draw, plan.cabinetry ?? [])
  }
}

export function renderPlan(draw, plan, state) {
  draw.clear()

  for (const { key } of layerDefinitions) {
    if (!state.layers[key]) {
      continue
    }

    const renderLayer = layerRenderers[key]
    if (renderLayer) {
      renderLayer(draw, plan, state)
    }
  }
}

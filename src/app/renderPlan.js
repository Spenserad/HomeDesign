import { addText } from '../drawing/text.js'
import { renderAnnotations } from '../renderers/annotationsRenderer.js'
import { renderCabinetry } from '../renderers/cabinetryRenderer.js'
import { renderDimensions } from '../renderers/dimensionsRenderer.js'
import { renderDoors } from '../renderers/doorsRenderer.js'
import { renderFixtures } from '../renderers/fixturesRenderer.js'
import { renderRooms } from '../renderers/roomsRenderer.js'
import { renderWalls } from '../renderers/wallsRenderer.js'
import { renderWindows } from '../renderers/windowsRenderer.js'

export function renderPlan(draw, plan, state) {
  draw.clear()

  if (state.layers.rooms) {
    renderRooms(draw, plan.rooms)
  }

  if (state.layers.walls) {
    renderWalls(draw, plan.walls)
  }

  if (state.layers.fixtures) {
    renderFixtures(draw, plan.fixtures)
  }

  if (state.layers.labels) {
    for (const label of plan.labels ?? []) {
      addText(draw, label.text, label.x, label.y, label.size)
    }
  }

  if (state.layers.windows) {
    renderWindows(draw, plan.windows ?? [])
  }

  if (state.layers.doors) {
    renderDoors(draw, plan.doors ?? [])
  }

  if (state.layers.cabinetry) {
    renderCabinetry(draw, plan.cabinetry ?? [])
  }

  if (state.layers.annotations) {
    renderDimensions(draw, plan.dimensions)
    renderAnnotations(draw, plan.annotations, plan.label)
  }

  // placeholder layers
  // electrical, plumbing, gas, lighting go here next
}

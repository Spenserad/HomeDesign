import { renderRooms } from "../renderers/roomsRenderer.js";
import { renderWalls } from "../renderers/wallsRenderer.js";
import { renderWindows } from "../renderers/windowsRenderer.js";
import { renderDoors } from "../renderers/doorsRenderer.js";
import { addText } from "../drawing/text.js";
import { renderFixtures } from "../renderers/fixturesRenderer.js";
import { renderCabinetry } from "../renderers/cabinetryRenderer.js";

export function renderPlan(draw, plan, state) {
  draw.clear();

  if (state.layers.rooms) {
    renderRooms(draw, plan.rooms);
  }

  if (state.layers.walls) {
    renderWalls(draw, plan.walls);
  }

  if (state.layers.fixtures) {
    renderFixtures(draw, plan.fixtures);
  }

  if (state.layers.labels) {
    for (const label of plan.labels ?? []) {
      addText(draw, label.text, label.x, label.y, label.size);
    }
  }

  if (state.layers.windows) {
    renderWindows(draw, plan.windows ?? []);
  }

  if (state.layers.doors) {
    renderDoors(draw, plan.doors ?? []);
  }

  if (state.layers.cabinetry) {
    renderCabinetry(draw, plan.cabinetry ?? []);
  }

  // placeholder layers
  // electrical, plumbing, gas, lighting, cabinetry go here next
}

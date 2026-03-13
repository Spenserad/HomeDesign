import { renderRooms } from "../renderers/roomsRenderer.js";
import { renderWalls } from "../renderers/wallsRenderer.js";
import { renderWindows } from "../renderers/windowsRenderer.js";
import { renderDoors } from "../renderers/doorsRenderer.js";
import { addText } from "../drawing/text.js";
import { renderFixtures } from "../renderers/fixturesRenderer.js";
import { renderCabinetry } from "../renderers/cabinetryRenderer.js";

function getActivePlanData(plan, state) {
  const levels = plan.levels ?? [];
  const fallbackLevel = levels[0];
  const activeLevel = levels.find((level) => level.id === state.activeLevelId) ?? fallbackLevel;
  return activeLevel?.planData ?? null;
}

export function renderPlan(draw, plan, state) {
  draw.clear();

  const activePlan = getActivePlanData(plan, state);
  if (!activePlan) {
    return;
  }

  if (state.layers.rooms) {
    renderRooms(draw, activePlan.rooms ?? []);
  }

  if (state.layers.walls) {
    renderWalls(draw, activePlan.walls ?? {});
  }

  if (state.layers.fixtures) {
    renderFixtures(draw, activePlan.fixtures ?? {});
  }

  if (state.layers.labels) {
    for (const label of activePlan.labels ?? []) {
      addText(draw, label.text, label.x, label.y, label.size);
    }
  }

  if (state.layers.windows) {
    renderWindows(draw, activePlan.windows ?? []);
  }

  if (state.layers.doors) {
    renderDoors(draw, activePlan.doors ?? []);
  }

  if (state.layers.cabinetry) {
    renderCabinetry(draw, activePlan.cabinetry ?? []);
  }

  // placeholder layers
  // electrical, plumbing, gas, lighting, cabinetry go here next
}

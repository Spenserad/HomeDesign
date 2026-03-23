# House Layout Designer

## Purpose

The **House Layout Designer** is a lightweight browser-based tool used to visualize home floor plans.
It renders level plans, room metadata, and annotation overlays in a consistent drafting style for quick design iteration.

---

## Project Structure

- `src/data/plan.config.json`: editable floor plan and home configuration source data.
- `src/data/schedule.config.json`: editable build schedule phases and tasks.
- `src/data/planRepository.js` / `src/data/scheduleRepository.js`: local file loaders and validation.
- `src/renderers/`: rendering modules for rooms, walls, openings, fixtures, cabinetry, and annotations.
- `src/app/createApp.js`: app bootstrap, level/layer controls, and room schedule UI state wiring.

---

## Requirements

- **Node.js** (Latest LTS recommended)
- **npm**
- **npx live-server** for local development

---

## Setup

```bash
npm install
npx live-server
```

The project typically opens at `http://127.0.0.1:8080`.

---

## Floor Plan Data Model

### Levels

`plan.config.json` stores each floor independently (`main`, `upper`, etc.) with:

- `rooms`: room placement for that level.
- `dimensions`: measurement definitions with:
  - `exteriorSpans`
  - `interiorCritical`
- `annotations`: orientation metadata (`northArrow`, `scaleNote`, `levelLabel`).

Use `getPlanForLevel(levelId)` to resolve a renderable plan after the JSON config is loaded and validated.

### Stable Room Cross-References

A top-level `roomCatalog` is the source of truth for room identity. Every level room references `roomKey`, which resolves to:

- stable `roomId` (e.g. `RM-005`)
- canonical `name`
- canonical `type`

This keeps IDs/names consistent across levels for schedules, references, and downstream tooling.

---

## Annotation Conventions

To keep drawings consistent, follow these rules when adding or updating annotations:

1. **Dimension layer only**
   - Put measurements in `dimensions.exteriorSpans` or `dimensions.interiorCritical`.
   - Use `axis: 'x'` for horizontal spans and `axis: 'y'` for vertical spans.

2. **Consistent text style**
   - Dimension and orientation text uses the shared annotation renderer style.
   - Include units in labels (example: `60' overall`).

3. **Orientation metadata per level**
   - Every level should include:
     - `northArrow`
     - `scaleNote`
     - `levelLabel`

4. **Keep annotation geometry in plan units (feet)**
   - Do not store pixel coordinates in data.
   - Renderer scaling is handled centrally.

---

## Runtime Controls

The app now includes an in-page control panel with:

- level switching dropdown
- per-layer toggles (architectural + MEP + annotations)
- room schedule table (ID, name, type, area)
- per-level room count and area summary

The following API still remains available via `window.app` in the browser console:

- `app.setLevel('main' | 'upper')`
- `app.toggleLayer('<layerName>')`
- `app.rerender()`
- `app.getRoomSchedule()`

---

## License

Add your preferred license here (MIT, Apache 2.0, etc).


## Editable Configuration

Most house-specific data now lives in local JSON files so it can be updated without editing renderer logic:

- `src/data/plan.config.json`: room catalog, levels, annotations, geometry, and home layout metadata.
- `src/data/schedule.config.json`: build schedule phases and task definitions.

The repository helpers validate these files before the rest of the app consumes them, which keeps the UI and renderers focused on derived behavior instead of hardcoded content.

# House Layout Designer

## Project vision
House Layout Designer is a lightweight, browser-based floor plan sandbox for quickly expressing residential layout ideas in code. The long-term goal is to evolve from a static renderer into a practical blueprint-preparation workflow that can model full homes, communicate intent clearly, and produce shareable outputs.

## Current capabilities
- Renders a complete single-level home plan from structured JavaScript data.
- Draws core architectural elements: rooms, exterior/interior walls, windows, doors, text labels, fixtures, and cabinetry.
- Uses layer toggles in app state so systems can be shown/hidden independently.
- Keeps rendering modular with dedicated renderer files per element type.
- Runs fully client-side with no build step required for local use.

## Current limitations
- No interactive editing UI yet (plan updates are code-first in `src/data/floorPlan.js`).
- Single-plan, single-level assumptions (no stairs or level switching model).
- Limited annotation support (no dimensions, callouts, or schedules).
- No export pipeline (PDF/CAD/image exports are not implemented).
- No print-oriented layout templates (title blocks/sheets/scales).

## Architecture overview
The app is intentionally simple and module-driven:

1. `main.js` boots the app.
2. `src/app/createApp.js` creates drawing + state and exposes `window.app` helpers.
3. `src/app/renderPlan.js` orchestrates rendering in layer order.
4. Renderer modules in `src/renderers/*` draw domain-specific elements.
5. Drawing helpers in `src/drawing/*` convert plan coordinates and provide primitives.
6. Plan data in `src/data/floorPlan.js` is the source of truth.

This structure keeps data, orchestration, and drawing logic separated so each concern can evolve independently.

## Data model
The current floor plan model is a plain JavaScript object exported from `src/data/floorPlan.js`.

Top-level keys currently used:
- `rooms: Room[]`
- `labels: Label[]`
- `walls: Walls`
- `windows: Window[]`
- `doors: Door[]`
- `fixtures: { fireplaces?: Fireplace[] }`
- Placeholder system arrays: `electrical`, `plumbing`, `gas`, `lighting`
- `cabinetry: CabinetryItem[]`

Coordinate conventions:
- Units are in feet.
- `x`, `y` represent plan-space positions.
- Width/height fields use `w`, `h`.
- Conversion to pixels is handled centrally in `src/drawing/coords.js`.

## Layer system
Layer defaults are defined in `src/data/layers.js` and stored in runtime state by `src/app/state.js`.

Active layer checks happen in `src/app/renderPlan.js` before each renderer is called. Current layer keys:
- `rooms`
- `walls`
- `fixtures`
- `labels`
- `windows`
- `doors`
- `electrical`
- `plumbing`
- `gas`
- `lighting`
- `cabinetry`

`window.app.toggleLayer(name)` can be used from the browser console to quickly validate layer rendering behavior.

## Key files
- `src/data/floorPlan.js`: Canonical plan data object and all currently defined geometry/content.
- `src/app/renderPlan.js`: Render pipeline entry point; enforces layer order and delegates to renderers.
- `src/renderers/*`: Domain renderers (rooms, walls, doors, windows, fixtures, cabinetry) that map data schema to drawing operations.
- `src/drawing/*`: Low-level drawing toolkit (canvas creation, coordinate transforms, text helpers, and geometric primitives).

## How to update plan data
All plan edits currently happen in `src/data/floorPlan.js`. Use these schemas as the source of truth.

### Room schema (current)
```js
{
  id: "unique_room_id",
  name: "Room Name",
  x: 0,
  y: 0,
  w: 12,
  h: 10,
  type: "bedroom",      // drives room fill color
  alignRight: false       // optional, right-aligns room text when true
}
```

### Wall schema (current)
```js
walls: {
  outerBorder: true,
  dashed: [
    { x1: 17, x2: 45, y: 20 }
  ],
  interiorLines: [
    { x1: 13, y1: 13, x2: 13, y2: 20 }
  ],
  interiorRects: [
    { x: 45, y: 34, w: 6, h: 10, label: "Laundry", labelSize: 10 }
  ]
}
```

### Window schema (current)
Horizontal window:
```js
{ wall: "h", x1: 22, x2: 26, y: 0 }
```
Vertical window:
```js
{ wall: "v", x: 0, y1: 3, y2: 6 }
```

### Door schema (current)
Single door examples:
```js
{ wall: "h", kind: "single", x1: 6.5, x2: 10.5, y: 13 }
{ wall: "v", kind: "single", x: 17, y1: 31, y2: 34 }
```
Double door examples:
```js
{ wall: "h", kind: "double", centerX: 31, y: 0, width: 6 }
{ wall: "v", kind: "double", x: 51, centerY: 37.0, width: 4.5 }
```
Sliding door example:
```js
{ wall: "h", kind: "sliding", x1: 22, x2: 28, y: 36 }
```

## Development workflow
1. Start local server:
   ```bash
   npx live-server
   ```
2. Edit plan data or renderers.
3. Refresh browser (auto-reload is typically enabled by `live-server`).
4. Use `window.app.rerender()` and `window.app.toggleLayer("layerName")` in DevTools for quick checks.
5. Commit small, focused changes with clear intent.

## Blueprint readiness roadmap
Milestones to move from layout sketching to blueprint-oriented output:

1. **Multi-level plans**
   - Introduce a `levels[]` data model.
   - Add level selection + per-level layer state.

2. **Stair modeling**
   - Add stair entities (run, rise, direction, landings).
   - Validate cross-level alignment between floors.

3. **Dimensions / annotations**
   - Add dimension lines, room area tags, and note callouts.
   - Introduce annotation layer controls and style standards.

4. **Export**
   - Implement SVG/PDF export path with deterministic scaling.
   - Add high-resolution image export for sharing/review.

5. **Print layouts**
   - Add sheet presets (e.g., Letter/A3/ARCH) with margins.
   - Add title block, scale label, and multi-sheet packaging.

## Roadmap
- Add interactive editing for rooms, openings, and fixtures.
- Build validation helpers for overlap/out-of-bounds checks.
- Expand system layers (electrical/plumbing/gas/lighting) beyond placeholders.
- Add test coverage around coordinate transforms and renderer output contracts.
- Define formal versioned schema for persisted plan files.

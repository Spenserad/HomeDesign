const roomCatalog = {
  master: { id: 'RM-001', name: 'Master Bedroom', type: 'bedroom' },
  bath_left: { id: 'RM-002', name: 'Shared Bath', type: 'bathroom' },
  bed2: { id: 'RM-003', name: 'Bedroom 2', type: 'bedroom' },
  garage: { id: 'RM-004', name: 'Garage', type: 'garage' },
  great: { id: 'RM-005', name: 'Great Room', type: 'great' },
  porch: { id: 'RM-006', name: 'Covered Porch', type: 'porch' },
  bed3: { id: 'RM-007', name: 'Bedroom 3', type: 'bedroom' },
  bath_right: { id: 'RM-008', name: 'Shared Bath', type: 'bathroom' },
  bed4: { id: 'RM-009', name: 'Bedroom 4', type: 'bedroom' },
  utility: { id: 'RM-010', name: 'Utility Area', type: 'utility' },
  loft: { id: 'RM-011', name: 'Open to Below', type: 'great' },
  bonus: { id: 'RM-012', name: 'Bonus Room / Office', type: 'utility' },
  hall_upper: { id: 'RM-013', name: 'Hallway', type: 'utility' }
}

const mainLevel = {
  id: 'main',
  label: 'Level 1 - Main Floor',
  rooms: [
    { roomKey: 'master', x: 0, y: 0, w: 17, h: 13 },
    { roomKey: 'bath_left', x: 0, y: 13, w: 17, h: 7 },
    { roomKey: 'bed2', x: 0, y: 20, w: 17, h: 10 },
    { roomKey: 'garage', x: 0, y: 30, w: 17, h: 14 },
    { roomKey: 'great', x: 17, y: 0, w: 28, h: 36 },
    { roomKey: 'porch', x: 17, y: 36, w: 28, h: 8 },
    { roomKey: 'bed3', x: 45, y: 0, w: 15, h: 11, alignRight: true },
    { roomKey: 'bath_right', x: 45, y: 11, w: 15, h: 7, alignRight: true },
    { roomKey: 'bed4', x: 45, y: 18, w: 15, h: 11, alignRight: true },
    { roomKey: 'utility', x: 45, y: 29, w: 15, h: 15 }
  ],
  labels: [
    { text: 'Dining', x: 22, y: 29, size: 12 },
    { text: 'Kitchen', x: 35, y: 29, size: 12 },
    { text: 'Living Area', x: 25, y: 11, size: 12 },
    { text: 'Gas Fireplace', x: 21.8, y: 2.6, size: 10 },
    { text: 'BACK', x: 28, y: 46.4, size: 12 },
    { text: 'FRONT', x: 28, y: -2.0, size: 12 },
    { text: 'Closet', x: 14.6, y: 16.0, size: 9 },
    { text: 'Closet', x: 46.4, y: 14.5, size: 9 },
    { text: 'Pantry', x: 55.0, y: 30.6, size: 10 }
  ],
  dimensions: {
    exteriorSpans: [
      { id: 'main-width', axis: 'x', from: 0, to: 60, at: -3, label: "60' overall" },
      { id: 'main-depth', axis: 'y', from: 0, to: 44, at: 63, label: "44' overall" }
    ],
    interiorCritical: [
      { id: 'main-core-width', axis: 'x', from: 17, to: 45, at: 38, label: "28' Great / Kitchen core" },
      { id: 'main-room-stack', axis: 'y', from: 0, to: 30, at: -1.5, label: "30' bedroom stack" }
    ]
  },
  annotations: {
    northArrow: { x: 57, y: 43, size: 3.2 },
    scaleNote: { x: 1.5, y: 45.7, text: 'Scale: 1 square = 1 ft' },
    levelLabel: { x: 23, y: 45.8 }
  },
  walls: {
    outerBorder: true,
    dashed: [{ x1: 17, x2: 45, y: 20 }],
    interiorLines: [
      { x1: 13, y1: 13, x2: 13, y2: 20 },
      { x1: 49, y1: 11, x2: 49, y2: 18 },
      { x1: 51, y1: 40, x2: 51, y2: 44 }
    ],
    interiorRects: [
      { x: 45, y: 34, w: 6, h: 10, label: 'Laundry', labelSize: 10 },
      { x: 54, y: 34, w: 6, h: 5, label: 'Half Bath', labelSize: 10 },
      { x: 54, y: 39, w: 6, h: 5, label: 'HVAC / WH', labelSize: 9 }
    ]
  },
  windows: [
    { wall: 'h', x1: 36.2, x2: 40.2, y: 36 },
    { wall: 'h', x1: 22, x2: 26, y: 0 },
    { wall: 'h', x1: 36, x2: 40, y: 0 },
    { wall: 'h', x1: 49, x2: 53, y: 0 },
    { wall: 'v', x: 0, y1: 3, y2: 6 },
    { wall: 'v', x: 0, y1: 8, y2: 11 },
    { wall: 'v', x: 0, y1: 15, y2: 17 },
    { wall: 'v', x: 0, y1: 24, y2: 27 },
    { wall: 'v', x: 0, y1: 31.5, y2: 34 },
    { wall: 'v', x: 0, y1: 39, y2: 42 },
    { wall: 'v', x: 60, y1: 5, y2: 8 },
    { wall: 'v', x: 60, y1: 13, y2: 15 },
    { wall: 'v', x: 60, y1: 23, y2: 26 },
    { wall: 'v', x: 60, y1: 35.2, y2: 37.8 },
    { wall: 'v', x: 60, y1: 39, y2: 41 },
    { wall: 'h', x1: 51.2, x2: 54.0, y: 44 }
  ],
  doors: [
    { wall: 'h', kind: 'double', centerX: 31, y: 0, width: 6 },
    { wall: 'v', kind: 'single', x: 0, y1: 34, y2: 37 },
    { wall: 'h', kind: 'sliding', x1: 22, x2: 28, y: 36 },
    { wall: 'v', kind: 'single', x: 17, y1: 31, y2: 34 },
    { wall: 'v', kind: 'single', x: 45, y1: 31, y2: 34 },
    { wall: 'v', kind: 'single', x: 17, y1: 5, y2: 8 },
    { wall: 'v', kind: 'single', x: 45, y1: 5, y2: 8 },
    { wall: 'v', kind: 'single', x: 45, y1: 22, y2: 24 },
    { wall: 'h', kind: 'single', x1: 6.5, x2: 10.5, y: 13 },
    { wall: 'h', kind: 'single', x1: 6.5, x2: 10.5, y: 20 },
    { wall: 'h', kind: 'single', x1: 49.5, x2: 53.5, y: 11 },
    { wall: 'h', kind: 'single', x1: 49.5, x2: 53.5, y: 18 },
    { wall: 'v', kind: 'single', x: 13, y1: 15.2, y2: 17.6 },
    { wall: 'v', kind: 'single', x: 49, y1: 12.8, y2: 15.2 },
    { wall: 'v', kind: 'single', x: 54, y1: 35.5, y2: 38.0 },
    { wall: 'v', kind: 'double', x: 51, centerY: 37.0, width: 4.5 },
    { wall: 'v', kind: 'double', x: 54, centerY: 41.5, width: 4.5 }
  ],
  fixtures: {
    fireplaces: [{ corner: 'bottom-left', x: 17.0, y: 0, size: 4 }]
  },
  electrical: {
    outlets: [
      { x: 19, y: 2.5 },
      { x: 42.5, y: 2.5 },
      { x: 2.5, y: 33.5 },
      { x: 57.5, y: 33.5 }
    ],
    switches: [
      { x: 18.2, y: 6.5 },
      { x: 44.2, y: 23 },
      { x: 44.2, y: 33 }
    ]
  },
  plumbing: [
    { x1: 6, y1: 16.5, x2: 13, y2: 16.5 },
    { x1: 51, y1: 36.5, x2: 57, y2: 36.5 },
    { x1: 57, y1: 36.5, x2: 57, y2: 41.5 }
  ],
  gas: [
    { x1: 17, y1: 2.4, x2: 21.4, y2: 2.4 },
    { x1: 31.8, y1: 30, x2: 31.8, y2: 28.8 }
  ],
  lighting: {
    ceiling: [
      { x: 25, y: 11 },
      { x: 31, y: 29 },
      { x: 7.5, y: 24 },
      { x: 52, y: 23 }
    ]
  },
  cabinetry: [
    { type: 'base-run', x: 29, y: 28.8, w: 9, h: 2 },
    { type: 'base-run', x: 38, y: 21.0, w: 2, h: 7.8 },
    { type: 'base-run', x: 28.0, y: 19.2, w: 10, h: 2 },
    { type: 'island', x: 28.0, y: 14.8, w: 6.5, h: 2.8, seatingSide: 'bottom', overhang: 1 },
    { type: 'range', x: 31.2, y: 28.8, w: 2.8, h: 2, label: false },
    { type: 'sink', x: 32.0, y: 19.2, w: 3, h: 2, label: false },
    { type: 'fridge', x: 40.2, y: 22.4, w: 2.6, h: 3, label: true }
  ]
}

const upperLevel = {
  id: 'upper',
  label: 'Level 2 - Upper Floor',
  rooms: [
    { roomKey: 'loft', x: 0, y: 0, w: 41, h: 44 },
    { roomKey: 'hall_upper', x: 41, y: 9, w: 4, h: 28 },
    { roomKey: 'bed4', x: 45, y: 9, w: 15, h: 13, alignRight: true },
    { roomKey: 'bath_left', x: 45, y: 22, w: 15, h: 7, alignRight: true },
    { roomKey: 'bed2', x: 45, y: 29, w: 15, h: 8, alignRight: true },
    { roomKey: 'bonus', x: 45, y: 37, w: 15, h: 7, alignRight: true }
  ],
  labels: [
    { text: 'Balcony / Open to Great Room', x: 13, y: 39.2, size: 10 },
    { text: 'Stairs Up', x: 52.5, y: 2.6, size: 10 }
  ],
  dimensions: {
    exteriorSpans: [
      { id: 'upper-width', axis: 'x', from: 0, to: 60, at: -3, label: "60' overall" },
      { id: 'upper-depth', axis: 'y', from: 0, to: 44, at: 63, label: "44' full upper outline" }
    ],
    interiorCritical: [
      { id: 'upper-open-width', axis: 'x', from: 0, to: 41, at: 41, label: "41' open-to-below span" },
      { id: 'upper-bedroom-stack', axis: 'y', from: 9, to: 37, at: 62, label: "28' bedroom + bath stack" }
    ]
  },
  annotations: {
    northArrow: { x: 57, y: 43, size: 3.2 },
    scaleNote: { x: 1.5, y: 45.7, text: 'Scale: 1 square = 1 ft' },
    levelLabel: { x: 22, y: 45.8 }
  },
  walls: {
    outerBorder: true,
    dashed: [],
    interiorLines: [
      { x1: 45, y1: 9, x2: 60, y2: 9 },
      { x1: 52, y1: 0, x2: 52, y2: 9 },
      { x1: 45, y1: 5, x2: 52, y2: 5 }
    ],
    interiorRects: [
      { x: 53, y: 1, w: 6.5, h: 4, label: 'Stair', labelSize: 9 },
      { x: 54.5, y: 5, w: 4.5, h: 3.6, label: 'Landing', labelSize: 8 }
    ]
  },
  windows: [],
  doors: [],
  fixtures: {},
  electrical: { outlets: [], switches: [] },
  plumbing: [],
  gas: [],
  lighting: { ceiling: [] },
  cabinetry: []
}

export const floorPlan = {
  roomCatalog,
  defaultLevelId: 'main',
  levels: [mainLevel, upperLevel]
}

export function getPlanForLevel(levelId = floorPlan.defaultLevelId) {
  const level = floorPlan.levels.find((item) => item.id === levelId) ?? floorPlan.levels[0]

  const rooms = level.rooms.map((room) => {
    const catalogRoom = floorPlan.roomCatalog[room.roomKey]

    return {
      ...room,
      roomId: catalogRoom.id,
      id: `${level.id}:${catalogRoom.id}`,
      name: catalogRoom.name,
      type: catalogRoom.type
    }
  })

  return {
    ...level,
    rooms
  }
}

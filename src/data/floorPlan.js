export const floorPlan = {
  rooms: [
    { id: "master",     name: "Master Bedroom", x: 0,  y: 0,  w: 17, h: 14, type: "bedroom" },
    { id: "bath_left",  name: "Shared Bath",    x: 0,  y: 14, w: 17, h: 7,  type: "bathroom" },
    { id: "bed2",       name: "Bedroom 2",      x: 0,  y: 21, w: 17, h: 9,  type: "bedroom" },
    { id: "garage",     name: "Garage",         x: 0,  y: 30, w: 17, h: 14, type: "garage" },

    { id: "great",      name: "Great Room",     x: 17, y: 0,  w: 28, h: 36, type: "great" },
    { id: "porch",      name: "Covered Porch",  x: 17, y: 36, w: 28, h: 8,  type: "porch" },

    { id: "bed3",       name: "Bedroom 3",      x: 45, y: 0,  w: 15, h: 13, type: "bedroom", alignRight: true },
    { id: "bath_right", name: "Shared Bath",    x: 45, y: 13, w: 15, h: 7,  type: "bathroom", alignRight: true },
    { id: "bed4",       name: "Bedroom 4",      x: 45, y: 20, w: 15, h: 9,  type: "bedroom", alignRight: true },
    { id: "utility",    name: "Utility Area",   x: 45, y: 29, w: 15, h: 15, type: "utility" }
  ],

  labels: [
    { text: 'Dining', x: 22, y: 29, size: 12 },
    { text: 'Kitchen', x: 35, y: 29, size: 12 },
    { text: 'Living Area', x: 25, y: 11, size: 12 },
    { text: 'Gas Fireplace', x: 21.8, y: 2.6, size: 10 },
    { text: 'BACK', x: 28, y: 46.4, size: 12 },
    { text: 'FRONT', x: 28, y: -2.0, size: 12 },
    { text: 'Closet', x: 14.6, y: 17.0, size: 9 },
    { text: 'Closet', x: 46.4, y: 16.0, size: 9 },
    { text: 'Pantry', x: 55.0, y: 30.6, size: 10 }
  ],

  walls: {
    outerBorder: true,
    dashed: [
      { x1: 17, x2: 45, y: 20 }
    ],
    interiorLines: [
      { x1: 13, y1: 14, x2: 13, y2: 21 },
      { x1: 49, y1: 13, x2: 49, y2: 20 },
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
    { wall: 'v', x: 0, y1: 16, y2: 18 },
    { wall: 'v', x: 0, y1: 24, y2: 27 },
    { wall: 'v', x: 0, y1: 31.5, y2: 34 },
    { wall: 'v', x: 0, y1: 39, y2: 42 },
    { wall: 'v', x: 60, y1: 5, y2: 8 },
    { wall: 'v', x: 60, y1: 15, y2: 17 },
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

    { wall: 'h', kind: 'single', x1: 6.5, x2: 10.5, y: 14 },
    { wall: 'h', kind: 'single', x1: 6.5, x2: 10.5, y: 21 },
    { wall: 'h', kind: 'single', x1: 49.5, x2: 53.5, y: 13 },
    { wall: 'h', kind: 'single', x1: 49.5, x2: 53.5, y: 20 },

    { wall: 'v', kind: 'single', x: 54, y1: 35.5, y2: 38.0 },
    { wall: 'v', kind: 'double', x: 51, centerY: 37.0, width: 4.5 },
    { wall: 'v', kind: 'double', x: 54, centerY: 41.5, width: 4.5 }
  ],

  fixtures: {
    fireplaces: [
      { corner: 'bottom-left', x: 17.0, y: 0, size: 4 }
    ]
  },

  electrical: [],
  plumbing: [],
  gas: [],
  lighting: [],
  cabinetry: []
}
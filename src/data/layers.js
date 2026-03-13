export const layerDefinitions = [
  { key: 'rooms', label: 'Rooms', group: 'structure' },
  { key: 'walls', label: 'Walls', group: 'structure' },
  { key: 'windows', label: 'Windows', group: 'openings' },
  { key: 'doors', label: 'Doors', group: 'openings' },
  { key: 'fixtures', label: 'Fixtures', group: 'utilities' },
  { key: 'cabinetry', label: 'Cabinetry', group: 'utilities' },
  { key: 'electrical', label: 'Electrical', group: 'utilities' },
  { key: 'plumbing', label: 'Plumbing', group: 'utilities' },
  { key: 'gas', label: 'Gas', group: 'utilities' },
  { key: 'lighting', label: 'Lighting', group: 'utilities' },
  { key: 'labels', label: 'Labels', group: 'annotations' }
]

export const layerGroups = [
  { key: 'structure', label: 'Structure' },
  { key: 'openings', label: 'Openings' },
  { key: 'utilities', label: 'Utilities' },
  { key: 'annotations', label: 'Annotations' }
]

export const defaultLayers = {
  rooms: true,
  walls: true,
  fixtures: true,
  labels: true,
  windows: true,
  doors: true,
  electrical: false,
  plumbing: false,
  gas: false,
  lighting: false,
  cabinetry: false
}

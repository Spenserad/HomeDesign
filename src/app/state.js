import { defaultLayers } from '../data/layers.js'

export function createState(defaultLevelId) {
  return {
    currentLevelId: defaultLevelId,
    layers: { ...defaultLayers }
  }
}

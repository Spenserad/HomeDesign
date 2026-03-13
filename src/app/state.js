import { defaultLayers } from '../data/layers.js'

export function createState(activeLevelId = null) {
  return {
    activeLevelId,
    layers: { ...defaultLayers }
  }
}

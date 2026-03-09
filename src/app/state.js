import { defaultLayers } from '../data/layers.js'

export function createState() {
  return {
    layers: { ...defaultLayers }
  }
}
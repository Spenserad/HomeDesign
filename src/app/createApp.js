import { floorPlan, getPlanForLevel } from '../data/floorPlan.js'
import { defaultLayers } from '../data/layers.js'
import { createDrawing } from '../drawing/canvas.js'
import { renderPlan } from './renderPlan.js'
import { createState } from './state.js'

function formatLayerName(name) {
  return name.charAt(0).toUpperCase() + name.slice(1)
}

function calculateRoomArea(room) {
  return Number((room.w * room.h).toFixed(1))
}

export function createApp() {
  const draw = createDrawing('#canvas')
  const state = createState(floorPlan.defaultLevelId)

  const levelSelect = document.querySelector('#level-select')
  const layerControls = document.querySelector('#layer-controls')
  const scheduleBody = document.querySelector('#room-schedule-body')
  const summaryRoomCount = document.querySelector('#summary-room-count')
  const summaryTotalArea = document.querySelector('#summary-total-area')

  const getCurrentPlan = () => getPlanForLevel(state.currentLevelId)

  const renderRoomSchedule = (plan) => {
    scheduleBody.innerHTML = ''

    let totalArea = 0

    for (const room of plan.rooms) {
      const area = calculateRoomArea(room)
      totalArea += area

      const row = document.createElement('tr')
      row.innerHTML = `
        <td>${room.roomId}</td>
        <td>${room.name}</td>
        <td>${room.type}</td>
        <td>${area.toFixed(1)}</td>
      `
      scheduleBody.appendChild(row)
    }

    summaryRoomCount.textContent = String(plan.rooms.length)
    summaryTotalArea.textContent = `${totalArea.toFixed(1)} sf`
  }

  const renderCurrentPlan = () => {
    const levelPlan = getCurrentPlan()
    renderPlan(draw, levelPlan, state)
    renderRoomSchedule(levelPlan)
  }

  const buildLevelControl = () => {
    for (const level of floorPlan.levels) {
      const option = document.createElement('option')
      option.value = level.id
      option.textContent = level.label
      levelSelect.appendChild(option)
    }

    levelSelect.value = state.currentLevelId

    levelSelect.addEventListener('change', (event) => {
      state.currentLevelId = event.target.value
      renderCurrentPlan()
    })
  }

  const buildLayerControls = () => {
    for (const layerName of Object.keys(defaultLayers)) {
      const wrapper = document.createElement('label')
      wrapper.className = 'layer-toggle'

      const input = document.createElement('input')
      input.type = 'checkbox'
      input.dataset.layer = layerName
      input.checked = state.layers[layerName]
      input.addEventListener('change', () => {
        state.layers[layerName] = input.checked
        renderCurrentPlan()
      })

      const text = document.createElement('span')
      text.textContent = formatLayerName(layerName)

      wrapper.appendChild(input)
      wrapper.appendChild(text)
      layerControls.appendChild(wrapper)
    }
  }

  buildLevelControl()
  buildLayerControls()
  renderCurrentPlan()

  window.app = {
    draw,
    state,
    floorPlan,
    rerender() {
      renderCurrentPlan()
    },
    setLevel(levelId) {
      state.currentLevelId = levelId
      if (levelSelect) {
        levelSelect.value = levelId
      }
      renderCurrentPlan()
    },
    toggleLayer(name) {
      state.layers[name] = !state.layers[name]
      const checkbox = layerControls.querySelector(`input[data-layer="${name}"]`)
      if (checkbox) {
        checkbox.checked = state.layers[name]
      }
      renderCurrentPlan()
    },
    getRoomSchedule() {
      const plan = getCurrentPlan()
      return plan.rooms.map((room) => ({
        roomId: room.roomId,
        name: room.name,
        type: room.type,
        area: calculateRoomArea(room)
      }))
    }
  }
}

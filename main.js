import { createApp } from './src/app/createApp.js'
import { createSchedulePage } from './src/app/createSchedulePage.js'

createApp()

const scheduleRoot = document.getElementById('schedule-root')
if (scheduleRoot) {
  createSchedulePage('#schedule-root')
}
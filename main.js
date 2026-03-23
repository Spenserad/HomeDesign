import { createApp } from './src/app/createApp.js'
import { createSchedulePage } from './src/app/createSchedulePage.js'

async function init() {
  await createApp()

  const scheduleRoot = document.getElementById('schedule-root')
  if (scheduleRoot) {
    await createSchedulePage('#schedule-root')
  }
}

init()

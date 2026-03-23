const SCHEDULE_CONFIG_URL = new URL('./schedule.config.json', import.meta.url)

let scheduleConfigPromise

function cloneConfig(value) {
  return structuredClone(value)
}

function validateScheduleConfig(scheduleConfig) {
  if (!scheduleConfig || typeof scheduleConfig !== 'object') {
    throw new Error('Schedule configuration must be an object.')
  }

  if (!Array.isArray(scheduleConfig.schedulePhases) || scheduleConfig.schedulePhases.length === 0) {
    throw new Error('Schedule configuration must include at least one schedule phase.')
  }

  if (!Array.isArray(scheduleConfig.buildSchedule)) {
    throw new Error('Schedule configuration must include a buildSchedule array.')
  }

  const phaseIds = new Set(scheduleConfig.schedulePhases.map((phase) => phase.id))

  for (const task of scheduleConfig.buildSchedule) {
    if (!phaseIds.has(task.phaseId)) {
      throw new Error(`Task "${task.id}" references unknown phaseId "${task.phaseId}".`)
    }
  }
}

async function fetchJson(url) {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Failed to load ${url.pathname}: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

export async function loadScheduleConfig() {
  if (!scheduleConfigPromise) {
    scheduleConfigPromise = fetchJson(SCHEDULE_CONFIG_URL).then((scheduleConfig) => {
      validateScheduleConfig(scheduleConfig)
      return scheduleConfig
    })
  }

  const scheduleConfig = await scheduleConfigPromise
  return cloneConfig(scheduleConfig)
}

const PLAN_CONFIG_URL = new URL('./plan.config.json', import.meta.url)

let planConfigPromise

function cloneConfig(value) {
  return structuredClone(value)
}

function validatePlanConfig(planConfig) {
  if (!planConfig || typeof planConfig !== 'object') {
    throw new Error('Plan configuration must be an object.')
  }

  if (!Array.isArray(planConfig.levels) || planConfig.levels.length === 0) {
    throw new Error('Plan configuration must include at least one level.')
  }

  if (!planConfig.roomCatalog || typeof planConfig.roomCatalog !== 'object') {
    throw new Error('Plan configuration must include a roomCatalog object.')
  }

  const levelIds = new Set(planConfig.levels.map((level) => level.id))
  if (!levelIds.has(planConfig.defaultLevelId)) {
    throw new Error(`Default level "${planConfig.defaultLevelId}" is not defined in levels.`)
  }

  for (const level of planConfig.levels) {
    if (!Array.isArray(level.rooms)) {
      throw new Error(`Level "${level.id}" must include a rooms array.`)
    }

    for (const room of level.rooms) {
      if (!room.roomKey || !planConfig.roomCatalog[room.roomKey]) {
        throw new Error(`Level "${level.id}" references unknown roomKey "${room.roomKey}".`)
      }
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

export async function loadPlanConfig() {
  if (!planConfigPromise) {
    planConfigPromise = fetchJson(PLAN_CONFIG_URL).then((planConfig) => {
      validatePlanConfig(planConfig)
      return planConfig
    })
  }

  const planConfig = await planConfigPromise
  return cloneConfig(planConfig)
}

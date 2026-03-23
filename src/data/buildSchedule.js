import { loadScheduleConfig } from './scheduleRepository.js'

export async function getScheduleConfig() {
  return loadScheduleConfig()
}

export async function getSchedulePhases() {
  const { schedulePhases } = await getScheduleConfig()
  return schedulePhases
}

export async function getBuildSchedule() {
  const { buildSchedule } = await getScheduleConfig()
  return buildSchedule
}

export async function getSchedulePhaseMap() {
  const schedulePhases = await getSchedulePhases()
  return Object.fromEntries(schedulePhases.map((phase) => [phase.id, phase]))
}

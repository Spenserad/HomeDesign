import { loadPlanConfig } from './planRepository.js'

function enrichLevelRooms(planConfig, level) {
  return level.rooms.map((room) => {
    const catalogRoom = planConfig.roomCatalog[room.roomKey]

    return {
      ...room,
      roomId: catalogRoom.id,
      id: `${level.id}:${catalogRoom.id}`,
      name: catalogRoom.name,
      type: catalogRoom.type
    }
  })
}

export async function getFloorPlan() {
  return loadPlanConfig()
}

export async function getPlanForLevel(levelId) {
  const planConfig = await getFloorPlan()
  const resolvedLevelId = levelId ?? planConfig.defaultLevelId
  const level = planConfig.levels.find((item) => item.id === resolvedLevelId) ?? planConfig.levels[0]

  return {
    ...level,
    rooms: enrichLevelRooms(planConfig, level)
  }
}

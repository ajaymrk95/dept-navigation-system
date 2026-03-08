import type { Location } from "../types/Location"

export function searchLocations(
  locations: Location[],
  query: string
): Location[] {

  const q = query.toLowerCase()

  return locations.filter((location) => {

    const nameMatch = location.name.toLowerCase().includes(q)
    const roomMatch = location.room.toLowerCase().includes(q)
    const abbreviationMatch = location.abbreviation.toLowerCase().includes(q)
    const floorMatch = location.floor.toLowerCase().includes(q)

    const keywordMatch = location.keywords.some((k) =>
      k.toLowerCase().includes(q)
    )

    return (
      nameMatch ||
      roomMatch ||
      abbreviationMatch ||
      floorMatch ||
      keywordMatch
    )
  })
}
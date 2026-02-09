import { useState } from "react"
import type { Location } from "../data/locations"
import LocationSearch from "./LocationSearch"

type Props = {
  locations: Location[]
  onRouteRequest: (start: Location, end: Location) => void
}

export default function RoutePanel({ locations, onRouteRequest }: Props) {
  const [start, setStart] = useState<Location | null>(null)
  const [end, setEnd] = useState<Location | null>(null)

  return (
    <div className="
      absolute top-6 left-6 z-[2000]
      bg-white/95 backdrop-blur
      p-4 rounded-2xl shadow-xl
      border border-gray-200
      space-y-3 w-80
    ">
      <div className="text-sm font-semibold text-gray-700">
        Campus Navigation
      </div>

      <LocationSearch
        label="Start location"
        locations={locations}
        onSelect={setStart}
      />

      <LocationSearch
        label="Destination"
        locations={locations}
        onSelect={setEnd}
      />

      <button
        disabled={!start || !end}
        onClick={() => start && end && onRouteRequest(start, end)}
        className="
          w-full py-2.5 rounded-xl
          bg-blue-600 text-white font-medium
          disabled:bg-gray-300 disabled:cursor-not-allowed
          hover:bg-blue-700 transition
        "
      >
        Find Route
      </button>
    </div>
  )
}

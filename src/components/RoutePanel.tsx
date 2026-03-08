import type { Location } from "../data/locations"
import LocationSearch from "./LocationSearch"

type Props = {
  locations: Location[]
  selectedLocation: Location | null
  onSelectLocation: (location: Location) => void
}

export default function RoutePanel({
  locations,
  selectedLocation,
  onSelectLocation
}: Props) {

  return (
    <div className="h-full w-full flex flex-col bg-[#f5f3ee] border-r border-[#547792]/20 overflow-y-auto p-6 gap-4">

      <div className="bg-[#1a305b] px-6 py-4 rounded-md">
        <h2 className="text-[#e9e4d9] text-xl font-bold">
          Find Your Location
        </h2>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <LocationSearch
          locations={locations}
          onSelect={onSelectLocation}
        />
      </div>

      {selectedLocation && (
        <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">

          <div className="h-48 bg-gray-200 flex items-center justify-center text-gray-500">
            Image Placeholder
          </div>

          <div className="p-4 space-y-2">

            <h3 className="text-lg font-semibold text-[#1a305b]">
              {selectedLocation.name}
            </h3>

            <p className="text-sm text-gray-600">
              Room: {selectedLocation.room}
            </p>

            {selectedLocation.floor !== undefined && (
              <p className="text-sm text-gray-600">
                Floor {selectedLocation.floor}
              </p>
            )}

            {selectedLocation.description && (
              <p className="text-sm text-gray-700">
                {selectedLocation.description}
              </p>
            )}

            {selectedLocation.tag && (
              <div className="flex flex-wrap gap-2 pt-2">
                {selectedLocation.tag.map(tag => (
                  <span
                    key={tag}
                    className="text-xs bg-[#e9e4d9] text-[#1a305b] px-2 py-1 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  )
}
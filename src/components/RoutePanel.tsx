import { useNavigate } from "react-router-dom"
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

const navigate = useNavigate()

return ( <div className="h-full w-full flex flex-col bg-[#1A3263] border-r border-[#547792] p-4">


  {/* Top content */}
  <div className="flex flex-col gap-4">

    {/* Search + Filters Container */}
    {/* <div className="bg-[#547792] rounded-lg shadow-sm p-4"> */}
      <LocationSearch
        locations={locations}
        onSelect={onSelectLocation}
      />
    {/* </div> */}

    {selectedLocation && (
      <div className="bg-[#e9e4d9] rounded-xl shadow border border-[#547792]/30 overflow-hidden">

        <div className="h-48 bg-[#547792]/30 flex items-center justify-center text-[#1a305b]">
          Image Placeholder
        </div>

        <div className="p-4 space-y-2">

          <h3 className="text-lg font-semibold text-[#1a305b]">
            {selectedLocation.name}
          </h3>

          <p className="text-sm text-[#1a305b]/80">
            Room: {selectedLocation.room}
          </p>

          {selectedLocation.floor !== undefined && (
            <p className="text-sm text-[#1a305b]/80">
              Floor {selectedLocation.floor}
            </p>
          )}

          {selectedLocation.description && (
            <p className="text-sm text-[#1a305b]/80">
              {selectedLocation.description}
            </p>
          )}

          {selectedLocation.tag && (
            <div className="flex flex-wrap gap-2 pt-2">
              {selectedLocation.tag.map(tag => (
                <span
                  key={tag}
                  className="text-xs bg-[#547792]/20 text-[#1a305b] px-2 py-1 rounded-md"
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

  {/* Bottom Button */}
  <div className="mt-auto pt-6">

    <button
      onClick={() => navigate("/navigate")}
      className="
        w-full
        flex items-center justify-between
        px-6 py-4
        rounded-full
        bg-[#e9e4d9]
        text-[#1a305b]
        text-lg
        font-semibold
        transition
        hover:bg-[#f0b35a]
      "
    >
      Start Navigating
      <span className="text-xl">→</span>
    </button>

  </div>

</div>


)
}

import { useRef, useState } from "react"
import type { Location } from "../data/locations"
import LocationSearch from "./LocationSearch"

type Props = {
  locations: Location[]
  selectedLocation: Location | null
  onSelectLocation: (location: Location) => void
}

export default function MobileLocationSheet({
  locations,
  selectedLocation,
  onSelectLocation
}: Props) {

  const screenHeight = window.innerHeight

  const CLOSED = 0
  const HALF = screenHeight * 0.45
  const FULL = screenHeight

  const [height, setHeight] = useState(CLOSED)

  const startY = useRef(0)
  const startHeight = useRef(0)

  function openSearch() {
    setHeight(FULL)
  }

  function handleSearchFocus() {
    setHeight(FULL)
  }

  function handleSelect(location: Location) {
    onSelectLocation(location)
    setHeight(HALF)
  }

  function handlePointerDown(e: React.PointerEvent) {
    startY.current = e.clientY
    startHeight.current = height

    window.addEventListener("pointermove", handlePointerMove)
    window.addEventListener("pointerup", handlePointerUp)
  }

  function handlePointerMove(e: PointerEvent) {
    const delta = startY.current - e.clientY
    let newHeight = startHeight.current + delta

    if (newHeight < CLOSED) newHeight = CLOSED
    if (newHeight > FULL) newHeight = FULL

    setHeight(newHeight)
  }

  function handlePointerUp() {
    window.removeEventListener("pointermove", handlePointerMove)
    window.removeEventListener("pointerup", handlePointerUp)
  }

  return (
    <>
      {height === CLOSED && (
        <button
          onClick={openSearch}
          className="fixed top-4 right-4 z-50 bg-white shadow-md rounded-full px-4 py-2 text-sm font-medium"
        >
          Find Location
        </button>
      )}

      <div
        className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-xl transition-all"
        style={{ height, maxHeight: "100vh" }}
      >

        <div
          className="w-12 h-1.5 bg-gray-300 rounded mx-auto mt-3 mb-3 cursor-grab"
          onPointerDown={handlePointerDown}
        />

        <div className="px-4 pb-6 overflow-y-auto h-full">

          <LocationSearch
            locations={locations}
            onSelect={handleSelect}
            onFocusSearch={handleSearchFocus}
          />

          {selectedLocation && (
            <div className="mt-5 bg-white rounded-xl shadow border border-gray-200 overflow-hidden">

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

      </div>
    </>
  )
}
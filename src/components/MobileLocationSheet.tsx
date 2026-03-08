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

  const sheetRef = useRef<HTMLDivElement>(null)

  const screenHeight = window.innerHeight

  const MIN_HEIGHT = 90
  const HALF = screenHeight * 0.45
  const FULL = screenHeight

  const [height, setHeight] = useState(MIN_HEIGHT)

  const startY = useRef(0)
  const startHeight = useRef(0)

  function setSheetHeight(h: number) {
    if (!sheetRef.current) return
    sheetRef.current.style.height = `${h}px`
  }

  function openSearch() {
    setHeight(FULL)
    setSheetHeight(FULL)
  }

  function handleSearchFocus() {
    setHeight(FULL)
    setSheetHeight(FULL)
  }

  function handleSelect(location: Location) {
    onSelectLocation(location)
    setHeight(HALF)
    setSheetHeight(HALF)
  }

  /* ---------- DRAG START ---------- */

  function startDrag(clientY: number) {
    startY.current = clientY
    startHeight.current = sheetRef.current?.offsetHeight || MIN_HEIGHT

    window.addEventListener("touchmove", onTouchMove)
    window.addEventListener("touchend", stopDrag)

    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mouseup", stopDrag)
  }

  function onTouchStart(e: React.TouchEvent) {
    startDrag(e.touches[0].clientY)
  }

  function onMouseDown(e: React.MouseEvent) {
    startDrag(e.clientY)
  }

  /* ---------- DRAG MOVE ---------- */

  function updateHeight(clientY: number) {
    const delta = startY.current - clientY
    let newHeight = startHeight.current + delta

    if (newHeight < MIN_HEIGHT) newHeight = MIN_HEIGHT
    if (newHeight > FULL) newHeight = FULL

    setSheetHeight(newHeight)
  }

  function onTouchMove(e: TouchEvent) {
    updateHeight(e.touches[0].clientY)
  }

  function onMouseMove(e: MouseEvent) {
    updateHeight(e.clientY)
  }

  /* ---------- DRAG END ---------- */

  function stopDrag() {
    const currentHeight = sheetRef.current?.offsetHeight || MIN_HEIGHT
    setHeight(currentHeight)

    window.removeEventListener("touchmove", onTouchMove)
    window.removeEventListener("touchend", stopDrag)

    window.removeEventListener("mousemove", onMouseMove)
    window.removeEventListener("mouseup", stopDrag)
  }

  return (
    <>
      {/* Find Location button */}
      {height <= MIN_HEIGHT && (
        <button
          onClick={openSearch}
          className="fixed top-4 left-4 z-50 bg-white shadow-md rounded-full px-4 py-2 text-sm font-medium"
        >
          Find Location
        </button>
      )}

      <div
        ref={sheetRef}
        className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-xl"
        style={{ height }}
      >

        {/* Drag Handle */}
        <div
          className="w-16 h-2 bg-gray-300 rounded mx-auto mt-3 mb-4 cursor-grab touch-none"
          onTouchStart={onTouchStart}
          onMouseDown={onMouseDown}
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
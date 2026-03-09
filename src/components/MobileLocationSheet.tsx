import { useRef, useState } from "react"
import type { Location } from "../data/locations"
import LocationSearch from "./LocationSearch"
import { useNavigate } from "react-router-dom"

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

const navigate = useNavigate()

const screenHeight = window.innerHeight

const MIN_HEIGHT = 30
const HALF = screenHeight * 0.45
const FULL = screenHeight

const [height, setHeight] = useState(MIN_HEIGHT)

const startY = useRef(0)
const startHeight = useRef(0)

function goToNavigate() {
navigate("/navigate")
}

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
  {/* Navigate button */}
  <div className="fixed top-4 right-4 z-30 flex items-center gap-3">

    {height <= MIN_HEIGHT && (
      <button
        onClick={openSearch}
        className="
          flex items-center justify-center gap-2
          px-4 py-2.5
          rounded-full
          bg-[#1A3263]
          text-[#E8E2DB]
          text-sm
          font-semibold
          shadow-lg
          transition
          hover:bg-[#f0b35a]
          hover:text-[#1A3263]
        "
      >

        Find Location
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 
          9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"/>
        </svg>
      </button>
    )}

    <button
      onClick={goToNavigate}
      className="
        flex items-center justify-center gap-2
        px-4 py-2.5
        rounded-full
        bg-[#1A3263]
        text-[#E8E2DB]
        text-sm
        font-semibold
        shadow-lg
        transition
        hover:bg-[#f0b35a]
        hover:text-[#1A3263]
        active:bg-[#f0b35a]
        active:text-[#1A3263]
      "
    >
      Navigate

      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </button>

  </div>

  {/* Bottom Sheet */}

  <div
    ref={sheetRef}
    className="fixed bottom-0 left-0 right-0 z-50 bg-[#1A3263] rounded-t-2xl shadow-xl border-t border-[#1a305b]/30"
    style={{ height }}
  >

    {/* Drag Handle */}

    <div
      className="w-16 h-2 bg-[#e9e4d9]/60 rounded mx-auto mt-3 mb-4 cursor-grab touch-none"
      onTouchStart={onTouchStart}
      onMouseDown={onMouseDown}
    />

    <div className="px-4 pb-6 flex flex-col h-full">

      <LocationSearch
        locations={locations}
        onSelect={handleSelect}
        onFocusSearch={handleSearchFocus}
      />

      {selectedLocation && (
        <div className="mt-5 bg-[#e9e4d9] rounded-xl shadow-md border border-[#1a305b]/20 overflow-hidden">

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

  </div>
</>


)
}

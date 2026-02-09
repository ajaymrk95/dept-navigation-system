import { useState } from "react"
import type { Location } from "../data/locations"

type Props = {
  label: string
  locations: Location[]
  onSelect: (loc: Location) => void
}

export default function LocationSearch({ label, locations, onSelect }: Props) {
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)

  const filtered = locations.filter(loc =>
    loc.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="relative w-72">
      <input
        value={query}
        placeholder={label}
        onChange={(e) => {
          setQuery(e.target.value)
          setOpen(true)
        }}
        className="
          w-full px-4 py-2.5
          border border-gray-300 rounded-xl
          shadow-sm text-sm
          focus:outline-none focus:ring-2 focus:ring-blue-500
        "
      />

      {open && (
        <div className="
          absolute mt-2 w-full
          bg-white border border-gray-200
          rounded-xl shadow-lg
          max-h-52 overflow-y-auto z-[2000]
        ">
          {filtered.map(loc => (
            <div
              key={loc.id}
              className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
              onClick={() => {
                onSelect(loc)
                setQuery(loc.name)
                setOpen(false)
              }}
            >
              {loc.name}
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="px-4 py-2 text-sm text-gray-400">
              No locations found
            </div>
          )}
        </div>
      )}
    </div>
  )
}

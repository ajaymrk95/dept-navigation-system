import { useState } from "react"
import type { Location } from "../data/locations"
import { searchLocations } from "../utils/searchLocation"
import SearchResults from "./SearchResults"

type Props = {
  locations: Location[]
  onSelect: (location: Location) => void
  onFocusSearch?: () => void
}

export default function LocationSearch({ locations, onSelect, onFocusSearch }: Props) {

  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Location[]>([])
  const [showDropdown, setShowDropdown] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setQuery(value)

    if (value.trim() === "") {
      setResults([])
      setShowDropdown(false)
      return
    }

    const matches = searchLocations(value, locations)
    setResults(matches)
    setShowDropdown(true)
  }

  function handleSelect(location: Location) {
    setQuery(location.name)
    setShowDropdown(false)
    onSelect(location)
  }

  return (
    <div className="relative w-full">

      <input
        type="text"
        value={query}
        onChange={handleChange}
        onFocus={onFocusSearch}
        placeholder="Search location..."
        className="w-full px-4 py-2 border rounded-md focus:outline-none"
      />

      {showDropdown && (
        <SearchResults
          results={results}
          onSelect={handleSelect}
        />
      )}

    </div>
  )
}
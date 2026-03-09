import { useState } from "react";
import { searchLocations } from "../utils/searchLocation";
import type { Location } from "../data/locations";
import SearchResults from "./SearchResults";

type Props = {
locations: Location[]
onSelect: (location: Location) => void
onFocusSearch?: () => void
}

const filters = [
"Faculty",
"Labs",
"Classrooms",
"Toilets",
"Offices",
"Indoor",
"Outdoor"
]

export default function LocationSearch({
locations,
onSelect,
onFocusSearch
}: Props) {

const [query, setQuery] = useState("")
const [results, setResults] = useState<Location[]>([])
const [activeFilter, setActiveFilter] = useState<string | null>(null)

function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {


const value = e.target.value
setQuery(value)

if (value.trim() === "") {
  setResults([])
  return
}

const matches = searchLocations(value, locations)
setResults(matches)


}

function handleFilter(filter: string) {


setActiveFilter(filter)

const matches = locations.filter(
  loc => loc.tag && loc.tag.includes(filter)
)

setResults(matches)


}

function handleSelect(loc: Location) {


setQuery(loc.name)
setResults([])
setActiveFilter(null)

onSelect(loc)


}

return (


<div className="bg-[#E8E2DB] p-4 rounded-lg relative">

  {/* Search Input */}

  <input
    type="text"
    placeholder="Search location..."
    value={query}
    onChange={handleSearch}
    onFocus={onFocusSearch}
    className="w-full px-4 py-2 rounded-md border border-gray-300 bg-white text-[#1a305b] placeholder-gray-500 focus:outline-none"
  />

  {/* Filters */}

  <div className="mt-4 mb-2 inline-block px-3 py-1 rounded-md text-[#000000] text-md font-semibold">
    Filters : 
  </div>

  <div className="flex flex-wrap gap-2 mt-2 ">

    {filters.map(filter => {

      const isActive = activeFilter === filter

      return (

        <button
          key={filter}
          onClick={() => handleFilter(filter)}
          className={`
            px-4 py-1.5 rounded-lg text-sm transition duration-200
            ${
              isActive
                ? "bg-[#f0b35a] text-[#1a305b]"
                : "bg-[#e9e4d9] text-[#1a305b] hover:bg-[#f0b35a]"
            }
          `}
        >
          {filter}
        </button>

      )
    })}

  </div>

  {/* Search Results (unchanged structure) */}

  <SearchResults
    results={results}
    onSelect={handleSelect}
  />

</div>


)
}

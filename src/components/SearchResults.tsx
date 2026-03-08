import type { Location } from "../data/locations"

type Props = {
  results: Location[]
  onSelect: (location: Location) => void
}

export default function SearchResults({ results, onSelect }: Props) {

  if (results.length === 0) return null

  return (
    <ul className="absolute w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto z-50">

      {results.map((loc) => (
        <li
          key={loc.id}
          onClick={() => onSelect(loc)}
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
        >
          <div className="font-medium">{loc.name}</div>

          {loc.tag && (
            <div className="text-xs text-gray-500">
              {loc.tag.join(", ")}
            </div>
          )}

        </li>
      ))}

    </ul>
  )
}
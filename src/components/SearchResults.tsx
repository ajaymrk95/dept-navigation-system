import type { Location } from "../types/Location"

interface Props {
  results: Location[]
  onSelect: (location: Location) => void
}

export default function SearchResults({ results, onSelect }: Props) {

  return (
    <ul className="border border-gray-200 rounded-md overflow-hidden">

      {results.map((location, index) => (

        <li
          key={index}
          className="px-4 py-3 border-b last:border-b-0 hover:bg-gray-100 cursor-pointer"
          onClick={() => onSelect(location)}
        >
          <strong>{location.name}</strong>
          <br />
          <small className="text-gray-500">
            Room {location.room} · Floor {location.floor}
          </small>
        </li>

      ))}

    </ul>
  )
}
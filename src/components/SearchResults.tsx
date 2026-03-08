import type { Location } from "../types/Location"

interface Props {
  results: Location[]
  onSelect: (location: Location) => void
}

export default function SearchResults({ results, onSelect }: Props) {

  return (
    <ul className="list-group">
  
      {results.map((location, index) => (
  
        <li
          key={index}
          className="list-group-item list-group-item-action"
          onClick={() => onSelect(location)}
          style={{ cursor: "pointer" }}
        >
          <strong>{location.name}</strong>
          <br />
          <small className="text-muted">
            Room {location.room} · Floor {location.floor}
          </small>
        </li>
  
      ))}
  
    </ul>
  )
}
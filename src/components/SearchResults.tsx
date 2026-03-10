import type { Location } from "../types/Location"

interface Props {
  results: Location[]
  onSelect: (location: Location) => void
}

export default function SearchResults({ results, onSelect }: Props) {
  return (
    <ul
      style={{
        listStyle: "none",
        margin: 0,
        padding: 0,
        border: "1px solid #e8e2d9",
        borderRadius: "10px",
        overflow: "hidden",
        backgroundColor: "#ffffff",
        boxShadow: "0 2px 8px rgba(26, 37, 64, 0.06)",
        fontFamily: "'Georgia', 'Times New Roman', serif",
      }}
    >
      {results.map((location, index) => (
        <li
          key={index}
          onClick={() => onSelect(location)}
          style={{
            padding: "12px 16px",
            borderBottom: index < results.length - 1 ? "1px solid #ede8e0" : "none",
            cursor: "pointer",
            transition: "background-color 0.15s ease",
            backgroundColor: "transparent",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLLIElement).style.backgroundColor = "#f5f0e8"
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLLIElement).style.backgroundColor = "transparent"
          }}
        >
          <span
            style={{
              display: "block",
              fontWeight: 600,
              fontSize: "14px",
              color: "#1a2540",
              letterSpacing: "0.01em",
              marginBottom: "2px",
            }}
          >
            {location.name}
          </span>
          <span
            style={{
              fontSize: "12px",
              color: "#8a8070",
              letterSpacing: "0.02em",
            }}
          >
            Room {location.room} · Floor {location.floor}
          </span>
        </li>
      ))}
    </ul>
  )
}
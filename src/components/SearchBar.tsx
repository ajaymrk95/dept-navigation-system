import { useNavigate } from "react-router-dom"

interface Props {
  query: string
  onSearch: (query: string) => void
  onFocus: () => void
}

export default function SearchBar({ query, onSearch, onFocus }: Props) {
  const navigate = useNavigate()

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onSearch(e.target.value)
  }

  function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
    e.currentTarget.style.borderColor = "#d4a017"
    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(212,160,23,0.15)"
    onFocus()
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    e.currentTarget.style.borderColor = "#d9d2c7"
    e.currentTarget.style.boxShadow = "none"
  }

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        marginBottom: "12px",
        fontFamily: "'Georgia', 'Times New Roman', serif",
      }}
    >
      <input
        type="text"
        placeholder="Search location..."
        value={query}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={{
          flex: 1,
          border: "1px solid #d9d2c7",
          borderRadius: "8px",
          padding: "10px 14px",
          fontSize: "14px",
          color: "#1a2540",
          backgroundColor: "#faf8f4",
          outline: "none",
          fontFamily: "inherit",
          letterSpacing: "0.01em",
          transition: "border-color 0.2s ease, box-shadow 0.2s ease",
        }}
      />
      <button
        type="button"
        onClick={() => navigate("/scan")}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#d4a017"
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#1a2540"
        }}
        onMouseDown={e => {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.97)"
        }}
        onMouseUp={e => {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"
        }}
        style={{
          backgroundColor: "#1a2540",
          color: "#ffffff",
          border: "none",
          borderRadius: "8px",
          padding: "10px 18px",
          fontSize: "13px",
          fontWeight: 600,
          fontFamily: "inherit",
          letterSpacing: "0.04em",
          cursor: "pointer",
          whiteSpace: "nowrap",
          transition: "background-color 0.2s ease, transform 0.1s ease",
        }}
      >
        Scan QR
      </button>
    </div>
  )
}
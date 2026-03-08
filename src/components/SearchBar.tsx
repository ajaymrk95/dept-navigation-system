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

  return (
    <div className="input-group mb-3">
  
      <input
        type="text"
        className="form-control"
        placeholder="Search location..."
        value={query}
        onChange={handleChange}
        onFocus={onFocus}
      />
  
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => navigate("/scan")}
      >
        Scan QR
      </button>
  
    </div>
  )
}
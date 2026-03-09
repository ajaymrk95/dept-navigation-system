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
    <div className="flex gap-2 mb-3">

      <input
        type="text"
        className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search location..."
        value={query}
        onChange={handleChange}
        onFocus={onFocus}
      />

      <button
        type="button"
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        onClick={() => navigate("/scan")}
      >
        Scan QR
      </button>

    </div>
  )
}
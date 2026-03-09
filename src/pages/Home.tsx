import { useNavigate, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"

function Home() {
  const navigate = useNavigate()
  const location = useLocation()

  const [query, setQuery] = useState("")

  useEffect(() => {
    if (location.state?.qrData) {
      setQuery(location.state.qrData)
    }
  }, [location.state])

  return (
    <div className="p-4 flex items-center gap-2">

      <input
        type="text"
        placeholder="Search location..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-2"
      />

      <button
        type="button"
        className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-600 hover:text-white transition"
        onClick={() => navigate("/scan")}
      >
        Scan QR
      </button>

    </div>
  )
}

export default Home
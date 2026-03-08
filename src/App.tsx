import { useState, useEffect } from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import SearchBar from "./components/SearchBar"
import SearchResults from "./components/SearchResults"
import { locations } from "./data/locations"
import { searchLocations } from "./utils/searchLocations"
import type { Location } from "./types/Location"
import Scanner from "./pages/Scanner"

function Home() {

  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Location[]>([])
  const [locationSelected, setLocationSelected] = useState(false)

  const location = useLocation()

  function handleSearch(value: string) {

    setQuery(value)
    setLocationSelected(false)

    if (value.trim() === "") {
      setResults([])
      return
    }

    const filtered = searchLocations(locations, value)

    setResults(filtered)
  }

  function handleSelect(location: Location) {
    setQuery(location.name)
    setLocationSelected(true)
    setResults([])
  }

  useEffect(() => {
    if (location.state?.qrData) {

      const qrValue = location.state.qrData

      setQuery(qrValue)

      const filtered = searchLocations(locations, qrValue)

      setResults(filtered)

      setLocationSelected(true)
    }
  }, [location.state])

  return (
    <div className="container mt-5">
  
      <h1 className="text-center mb-4">
        Department Navigation
      </h1>
  
      <div className="row justify-content-center">
  
        <div className="col-md-6">
  
          <SearchBar
            query={query}
            onSearch={handleSearch}
            onFocus={() => setLocationSelected(false)}
          />
  
          {!locationSelected && (
            <SearchResults
              results={results}
              onSelect={handleSelect}
            />
          )}
  
        </div>
  
      </div>
  
    </div>
  )
}

export default function App() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/scan" element={<Scanner />} />

    </Routes>
  )
}
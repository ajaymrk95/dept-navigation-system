import { BrowserRouter, Routes, Route } from "react-router-dom"
import MapPage from "./components/MapPage"

function NavigatePage() {
  return (
    <div className="h-screen flex items-center justify-center text-xl">
      Navigate Page Placeholder
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<MapPage />} />

        <Route path="/navigate" element={<NavigatePage />} />

      </Routes>
    </BrowserRouter>
  )
}
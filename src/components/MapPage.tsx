import { useState } from "react"
import type { Location } from "../data/locations"
import RoutePanel from "./RoutePanel"
import MobileLocationSheet from "./MobileLocationSheet"
import { locations } from "../data/locations"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import MapRecenter from "./MapRecenter"
import "leaflet/dist/leaflet.css"



export default function MapPage() {

  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)

  return (
    <div className="h-screen w-screen relative">

      {/* MAP PLACEHOLDER */}
      
    <MapContainer
        center={[11.3215, 75.9339]}
        zoom={16}
        className="absolute inset-0 z-0"
        >
        <TileLayer
            attribution="© OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* move map when location changes */}
        <MapRecenter location={selectedLocation} />

        {/* marker for selected location */}
        {selectedLocation && (
            <Marker position={selectedLocation.coords}>
            <Popup>{selectedLocation.name}</Popup>
            </Marker>
        )}

    </MapContainer>

      {/* DESKTOP PANEL */}
      <div className="hidden md:block absolute left-0 top-0 h-full w-[420px] z-50">
      <RoutePanel
        locations={locations}
        selectedLocation={selectedLocation}
        onSelectLocation={setSelectedLocation}
        />
      </div>

      {/* MOBILE BOTTOM SHEET */}
      <div className="md:hidden">
        <MobileLocationSheet
          locations={locations}
          selectedLocation={selectedLocation}
          onSelectLocation={setSelectedLocation}
        />
      </div>

    </div>
  )
}

import "leaflet/dist/leaflet.css"

import { MapContainer, TileLayer, } from "react-leaflet"
import {  type Graph } from "../utils/buildGraph"
import { type Location } from "../data/locations"
import { Marker, Popup, Polyline } from "react-leaflet"
import L from "leaflet"
import MapRecenter from "./MapRecenter"


type Props = {
  center: [number, number]
  locations: Location[]
  start: Location | null
  destination: Location | null
  graph: Graph | null
  routeCoords: [number, number][]
  currentLocation?: [number, number] | null
}

const redIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})


function MapView({ center,
  locations,
  start,
  destination,
  routeCoords,currentLocation }: Props) {
  

  return (
    <MapContainer center={center} zoom={19} className="h-full w-full">
      <TileLayer
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

        {locations.map((loc: Location) => (
    <Marker key={loc.id} position={loc.coords}>
        <Popup>
        <div className="text-sm font-medium">
            {loc.name}
        </div>
        </Popup>
    </Marker>
    ))} 

    <MapRecenter center={center} />


    {routeCoords.length > 0 && (
    <Polyline positions={routeCoords} />
    )}


    {start && <Marker position={start.coords} icon={redIcon} />}
    {destination && <Marker position={destination.coords} icon={redIcon} />}


      {currentLocation && (
      <Marker position={currentLocation} icon={redIcon}>
        <Popup>You are here</Popup>
      </Marker>
    )}

    </MapContainer>
  )
}

export default MapView

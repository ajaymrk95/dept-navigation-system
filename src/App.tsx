import { useState, useEffect } from "react"
import MapView from "./components/MapView"
import RoutePanel from "./components/RoutePanel"
import { locations, type Location } from "./data/locations"
import { buildGraph, type Graph } from "./utils/buildGraph"
import { findNearestNode } from "./utils/findNearestNode"
import { shortestPath } from "./utils/shortestPath"
import LocateButton from "./components/LocateButton"
import { useCurrentLocation } from "./hooks/useCurrentLocation"


import { distance } from "./utils/distance"

const DEFAULT_CENTER: [number, number] = [11.3210, 75.9346]

export default function App() {
  const [graph, setGraph] = useState<Graph | null>(null)
  const [start, setStart] = useState<Location | null>(null)
  const [destination, setDestination] = useState<Location | null>(null)
  const [routeCoords, setRouteCoords] = useState<[number, number][]>([])
  const [distanceText, setDistanceText] = useState("")

  const { location: currentLocation } = useCurrentLocation()

  const currentLocationOption: Location | null = currentLocation
  ? {
      id: 0, 
      name: "My Current Location",
      coords: currentLocation,
      type: "custom"
    }
  : null

  const selectableLocations: Location[] = currentLocationOption
  ? [currentLocationOption, ...locations]
  : locations


  const [center, setCenter] = useState<[number, number]>(DEFAULT_CENTER)

  useEffect(() => {
    fetch("/nitc_roads.geojson")
      .then(r => r.json())
      .then(data => setGraph(buildGraph(data)))
  }, [])


  function handleRoute(startLoc: Location, endLoc: Location) {
    if (!graph) return

    setStart(startLoc)
    setDestination(endLoc)

    const startId = findNearestNode(graph, startLoc.coords)!
    const endId = findNearestNode(graph, endLoc.coords)!

    const pathIds = shortestPath(graph, startId, endId)
    const coords = pathIds.map(id => graph.get(id)!.coord)

    setRouteCoords(coords)

    let total = 0
    for (let i = 0; i < coords.length - 1; i++) {
      total += distance(coords[i], coords[i + 1])
    }

    console.log(total)
    setDistanceText(
      total < 1
        ? Math.round(total * 1000) + " m"
        : total.toFixed(2) + " km"
    )
  }

  return (
    <div className="h-screen w-screen flex flex-col bg-slate-100">

      <header className="h-16 bg-white shadow flex items-center justify-center font-semibold">
        Department Navigation System
      </header>

      <div className="flex-1 relative">

        <RoutePanel
          locations={selectableLocations}
          onRouteRequest={handleRoute}
        />

        <div className="
  absolute bottom-6 left-1/2 -translate-x-1/2
  bg-white px-6 py-3 rounded-2xl shadow-xl
  border text-sm font-medium z-[2000]
">
  {distanceText || "Select two locations"}
</div>


        <MapView
          center={center}
          locations={locations}
          start={start}
          destination={destination}
          graph={graph}
          routeCoords={routeCoords}
          currentLocation={currentLocation}
        />

        <LocateButton
          onClick={() => {
            if (currentLocation) setCenter(currentLocation)
          }}
        />
      </div>
    </div>
  )
}

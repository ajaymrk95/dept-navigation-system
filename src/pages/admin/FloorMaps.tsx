import Sidebar from "../../components/Sidebar";
import { useState } from "react";
import {
  buildings as initialBuildings,
  floorMaps as initialFloorMaps
} from "../../data/data";

type FloorMap = {
  id: number;
  buildingId: number;
  floor: string;
  geoJson: string;
};

export default function FloorMaps() {

  const [list, setList] = useState<FloorMap[]>(initialFloorMaps);

  const [buildingId, setBuildingId] = useState<number | "">("");
  const [floor, setFloor] = useState("");
  const [geoJson, setGeoJson] = useState("");

  // ---------------- FILE UPLOAD ----------------
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      setGeoJson(event.target?.result as string);
    };

    reader.readAsText(file);
  };

  // ---------------- ADD MAP ----------------
  const addMap = () => {
    if (!buildingId || !floor || !geoJson) {
      alert("Fill all fields");
      return;
    }

    setList([
      ...list,
      {
        id: Date.now(),
        buildingId: Number(buildingId),
        floor,
        geoJson
      }
    ]);

    setBuildingId("");
    setFloor("");
    setGeoJson("");
  };

  // ------------------------------------------------

  return (
    <div className="flex">
      <Sidebar />

      <div className="p-6 w-full">

        <h2 className="text-2xl font-bold mb-4">
          Floor Map Upload (GeoJSON)
        </h2>

        {/* FORM */}
        <div className="bg-gray-100 p-4 mb-6 rounded grid grid-cols-3 gap-2">

          {/* SELECT BUILDING */}
          <select
            className="border p-2"
            value={buildingId}
            onChange={e => setBuildingId(Number(e.target.value))}
          >
            <option value="">Select Building</option>
            {initialBuildings.map(b => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>

          {/* FLOOR */}
          <input
            className="border p-2"
            placeholder="Floor (eg: 1st Floor)"
            value={floor}
            onChange={e => setFloor(e.target.value)}
          />

          {/* FILE INPUT */}
          <input
            type="file"
            accept=".geojson,application/json"
            onChange={handleFileUpload}
            className="col-span-3"
          />

          <button
            onClick={addMap}
            className="bg-blue-600 text-white px-4 py-2 rounded col-span-3"
          >
            Upload Floor Map
          </button>

        </div>

        {/* DISPLAY BY BUILDING */}
        {initialBuildings.map(b => (
          <div key={b.id} className="mb-6">

            <h3 className="text-xl font-bold mb-2">
              {b.name}
            </h3>

            {list
              .filter(m => m.buildingId === b.id)
              .map(m => (
                <div
                  key={m.id}
                  className="border p-3 mb-2 rounded"
                >
                  <b>{m.floor}</b>

                  <p className="text-xs text-gray-500 mt-1">
                    GeoJSON Loaded ✔
                  </p>
                </div>
              ))}

            {list.filter(m => m.buildingId === b.id).length === 0 && (
              <p className="text-gray-400">
                No floor maps uploaded
              </p>
            )}

          </div>
        ))}

      </div>
    </div>
  );
}

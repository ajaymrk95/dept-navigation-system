import Sidebar from "../../components/Sidebar";
import { useState } from "react";
import { buildings as initialBuildings } from "../../data/data";

type Entrance = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
};

type Building = {
  id: number;
  name: string;
  entrances: Entrance[];
};

export default function Buildings() {

  const [list, setList] = useState<Building[]>(initialBuildings || []);
  const [name, setName] = useState("");

  // entrance form
  const [selectedBuilding, setSelectedBuilding] = useState<number | null>(null);
  const [entranceName, setEntranceName] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  // ---------------- ADD BUILDING ----------------
  const addBuilding = () => {
    if (!name) return;

    setList([
      ...list,
      {
        id: Date.now(),
        name,
        entrances: []
      }
    ]);

    setName("");
  };

  // ---------------- DELETE BUILDING ----------------
  const deleteBuilding = (id: number) => {
    setList(list.filter(b => b.id !== id));
  };

  // ---------------- ADD ENTRANCE ----------------
  const addEntrance = (buildingId: number) => {
    if (!entranceName || !lat || !lng) return;

    const newList = list.map(b =>
      b.id === buildingId
        ? {
            ...b,
            entrances: [
              ...b.entrances,
              {
                id: Date.now(),
                name: entranceName,
                latitude: Number(lat),
                longitude: Number(lng)
              }
            ]
          }
        : b
    );

    setList(newList);
    setEntranceName("");
    setLat("");
    setLng("");
    setSelectedBuilding(null);
  };

  // ---------------- DELETE ENTRANCE ----------------
  const deleteEntrance = (buildingId: number, entranceId: number) => {
    const newList = list.map(b =>
      b.id === buildingId
        ? {
            ...b,
            entrances: b.entrances.filter(e => e.id !== entranceId)
          }
        : b
    );

    setList(newList);
  };

  // ==================================================

  return (
    <div className="flex">
      <Sidebar />

      <div className="p-6 w-full">

        <h2 className="text-2xl font-bold mb-4">Building Management</h2>

        {/* ADD BUILDING */}
        <div className="bg-gray-100 p-4 mb-6 rounded">
          <input
            className="border p-2 mr-2"
            placeholder="Building Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />

          <button
            onClick={addBuilding}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Building
          </button>
        </div>

        {/* BUILDINGS LIST */}
        {list.map(b => (
          <div key={b.id} className="border p-4 mb-4 rounded">

            {/* Building Header */}
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">{b.name}</h3>

              <button
                onClick={() => deleteBuilding(b.id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>

            {/* ENTRANCES */}
            <div className="mt-3">

              <p className="font-semibold mb-2">
                Entrances ({b.entrances.length})
              </p>

              {b.entrances.map(e => (
                <div
                  key={e.id}
                  className="flex justify-between border p-2 mb-2 rounded"
                >
                  <span>
                    {e.name} → ({e.latitude}, {e.longitude})
                  </span>

                  <button
                    onClick={() => deleteEntrance(b.id, e.id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </div>
              ))}

              {/* ADD ENTRANCE FORM */}
              {selectedBuilding === b.id ? (
                <div className="mt-3 bg-gray-50 p-3 rounded">

                  <input
                    className="border p-2 mr-2"
                    placeholder="Entrance Name"
                    value={entranceName}
                    onChange={e => setEntranceName(e.target.value)}
                  />

                  <input
                    className="border p-2 mr-2"
                    placeholder="Latitude"
                    value={lat}
                    onChange={e => setLat(e.target.value)}
                  />

                  <input
                    className="border p-2 mr-2"
                    placeholder="Longitude"
                    value={lng}
                    onChange={e => setLng(e.target.value)}
                  />

                  <button
                    onClick={() => addEntrance(b.id)}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Save
                  </button>

                </div>
              ) : (
                <button
                  onClick={() => setSelectedBuilding(b.id)}
                  className="bg-purple-600 text-white px-3 py-1 rounded mt-2"
                >
                  Add Entrance
                </button>
              )}

            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

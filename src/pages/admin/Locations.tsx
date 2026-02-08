import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { locations as initialData } from "../../data/data";
import { modifyBuildingData } from "../../services/adminService.ts";


type LocationType = {
  id: number;
  name: string;
  floor: string;
  type: string;
  description: string;
  latitude: number;
  longitude: number;
};

export default function Locations() {

  const [list, setList] = useState<LocationType[]>(initialData);

  const [name, setName] = useState("");
  const [floor, setFloor] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const [editId, setEditId] = useState<number | null>(null);

  // ADD
  const addLocation = () => {
    if (!name || !floor || !type || !description || !latitude || !longitude) {
      alert("Fill all fields");
      return;
    }
    const newlist =[
      ...list,
      {
        id: Date.now(),
        name,
        floor,
        type,
        description,
        latitude: Number(latitude),
        longitude: Number(longitude),
      }
    ];
    setList(newlist);
    modifyBuildingData(newlist);

    clearForm();
  };

  // DELETE
  const deleteLocation = (id: number) => {
    const newList = list.filter(l => l.id !== id)
    setList(newList);
    modifyBuildingData(newList);
  };

  // EDIT
  const editLocation = (loc: LocationType) => {
    setEditId(loc.id);
    setName(loc.name);
    setFloor(loc.floor);
    setType(loc.type);
    setDescription(loc.description);
    setLatitude(String(loc.latitude));
    setLongitude(String(loc.longitude));
  };

  // UPDATE
  const updateLocation = () => {
    const newList =list.map(l =>
        l.id === editId
          ? {
              ...l,
              name,
              floor,
              type,
              description,
              latitude: Number(latitude),
              longitude: Number(longitude),
            }
          : l
      );
    setList(newList);
    modifyBuildingData(newList);

    clearForm();
  };

  const clearForm = () => {
    setEditId(null);
    setName("");
    setFloor("");
    setType("");
    setDescription("");
    setLatitude("");
    setLongitude("");
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="p-6 w-full">
        <h2 className="text-2xl font-bold mb-4">Location Management</h2>

        {/* FORM */}
        <div className="bg-gray-100 p-4 rounded mb-4 grid grid-cols-3 gap-3">

          <input
            className="border p-2"
            placeholder="Location Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="border p-2"
            placeholder="Floor"
            value={floor}
            onChange={(e) => setFloor(e.target.value)}
          />

          <input
            className="border p-2"
            placeholder="Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />

          <input
            className="border p-2 col-span-3"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            className="border p-2"
            placeholder="Latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          />

          <input
            className="border p-2"
            placeholder="Longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />

          {editId === null ? (
            <button
              onClick={addLocation}
              className="bg-blue-600 text-white px-4 py-2 rounded col-span-3"
            >
              Add Location
            </button>
          ) : (
            <button
              onClick={updateLocation}
              className="bg-green-600 text-white px-4 py-2 rounded col-span-3"
            >
              Update Location
            </button>
          )}

        </div>

        {/* LIST */}
        {list.map(l => (
          <div
            key={l.id}
            className="border p-3 mb-2 rounded"
          >
            <div className="font-bold">
              {l.name} — {l.floor} — {l.type}
            </div>

            <div className="text-sm text-gray-600">
              {l.description}
            </div>

            <div className="text-sm">
              Lat: {l.latitude} | Long: {l.longitude}
            </div>

            <div className="mt-2 space-x-2">
              <button
                onClick={() => editLocation(l)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => deleteLocation(l.id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

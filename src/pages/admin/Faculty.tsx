import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { faculty as initialFaculty, locations } from "../../data/data";

type FacultyType = {
  id: number;
  name: string;
  room: string;
  locationId: number;
};

export default function Faculty() {

  const [list, setList] = useState<FacultyType[]>(initialFaculty);

  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [locationId, setLocationId] = useState<number | "">("");
  const [editId, setEditId] = useState<number | null>(null);

  // ADD
  const addFaculty = () => {
    if (!name || !room || !locationId) {
      alert("Fill all fields");
      return;
    }

    setList([
      ...list,
      {
        id: Date.now(),
        name,
        room,
        locationId: Number(locationId),
      }
    ]);

    clearForm();
  };

  // DELETE
  const deleteFaculty = (id: number) => {
    setList(list.filter(f => f.id !== id));
  };

  // EDIT
  const editFaculty = (f: FacultyType) => {
    setEditId(f.id);
    setName(f.name);
    setRoom(f.room);
    setLocationId(f.locationId);
  };

  // UPDATE
  const updateFaculty = () => {
    setList(
      list.map(f =>
        f.id === editId
          ? { ...f, name, room, locationId: Number(locationId) }
          : f
      )
    );

    clearForm();
  };

  const clearForm = () => {
    setEditId(null);
    setName("");
    setRoom("");
    setLocationId("");
  };

  const getLocationName = (id: number) => {
    return locations.find(l => l.id === id)?.name || "Unknown";
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="p-6 w-full">
        <h2 className="text-2xl font-bold mb-4">Faculty Management</h2>

        {/* FORM */}
        <div className="bg-gray-100 p-4 rounded mb-4 grid grid-cols-3 gap-3">

          <input
            className="border p-2"
            placeholder="Faculty Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="border p-2"
            placeholder="Room"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />

          <select
            className="border p-2"
            value={locationId}
            onChange={(e) => setLocationId(Number(e.target.value))}
          >
            <option value="">Select Location</option>
            {locations.map(loc => (
              <option key={loc.id} value={loc.id}>
                {loc.name} ({loc.floor})
              </option>
            ))}
          </select>

          {editId === null ? (
            <button
              onClick={addFaculty}
              className="bg-blue-600 text-white px-4 py-2 rounded col-span-3"
            >
              Add Faculty
            </button>
          ) : (
            <button
              onClick={updateFaculty}
              className="bg-green-600 text-white px-4 py-2 rounded col-span-3"
            >
              Update Faculty
            </button>
          )}

        </div>

        {/* LIST */}
        {list.map(f => (
          <div
            key={f.id}
            className="border p-3 mb-2 rounded"
          >
            <div className="font-bold">
              {f.name} — {f.room}
            </div>

            <div className="text-sm text-gray-600">
              Location: {getLocationName(f.locationId)}
            </div>

            <div className="mt-2 space-x-2">
              <button
                onClick={() => editFaculty(f)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => deleteFaculty(f.id)}
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

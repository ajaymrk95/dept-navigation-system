import Sidebar from "../../components/Sidebar";
import { useState } from "react";
import { paths as initialPaths } from "../../data/data";
import { managePathNodes } from "../../services/adminService";

/* ================= TYPES ================= */

type Coord = {
  x: number;
  y: number;
};

type PathType = {
  id: number;
  building: string;
  floor: string;
  fromNode: string;
  toNode: string;
  fromCoord: Coord;
  toCoord: Coord;
  status: string;
};

/* ================= COMPONENT ================= */

export default function Paths() {

  const [list, setList] = useState<PathType[]>(initialPaths as any);

  const [building, setBuilding] = useState("");
  const [floor, setFloor] = useState("");
  const [fromNode, setFromNode] = useState("");
  const [toNode, setToNode] = useState("");

  const [fx, setFx] = useState("");
  const [fy, setFy] = useState("");
  const [tx, setTx] = useState("");
  const [ty, setTy] = useState("");

  const [editId, setEditId] = useState<number | null>(null);

  /* ================= ADD ================= */

  const addPath = () => {
    if (!building || !floor || !fromNode || !toNode || !fx || !fy || !tx || !ty) {
      alert("Fill all fields");
      return;
    }

    const newList = [
      ...list,
      {
        id: Date.now(),
        building,
        floor,
        fromNode,
        toNode,
        fromCoord: { x: Number(fx), y: Number(fy) },
        toCoord: { x: Number(tx), y: Number(ty) },
        status: "Open",
      }
    ];

    setList(newList);
    managePathNodes(newList);
    clearForm();
  };

  /* ================= DELETE ================= */

  const deletePath = (id: number) => {
    const newList = list.filter(p => p.id !== id);
    setList(newList);
    managePathNodes(newList);
  };

  /* ================= EDIT ================= */

  const editPath = (p: PathType) => {
    setEditId(p.id);
    setBuilding(p.building);
    setFloor(p.floor);
    setFromNode(p.fromNode);
    setToNode(p.toNode);
    setFx(String(p.fromCoord.x));
    setFy(String(p.fromCoord.y));
    setTx(String(p.toCoord.x));
    setTy(String(p.toCoord.y));
  };

  /* ================= UPDATE ================= */

  const updatePath = () => {
    const newList = list.map(p =>
      p.id === editId
        ? {
            ...p,
            building,
            floor,
            fromNode,
            toNode,
            fromCoord: { x: Number(fx), y: Number(fy) },
            toCoord: { x: Number(tx), y: Number(ty) },
          }
        : p
    );

    setList(newList);
    managePathNodes(newList);
    clearForm();
  };

  /* ================= TOGGLE ================= */

  const toggleStatus = (id: number) => {
    const newList = list.map(p =>
      p.id === id
        ? { ...p, status: p.status === "Open" ? "Blocked" : "Open" }
        : p
    );

    setList(newList);
    managePathNodes(newList);
  };

  /* ================= HELPERS ================= */

  const clearForm = () => {
    setEditId(null);
    setBuilding("");
    setFloor("");
    setFromNode("");
    setToNode("");
    setFx("");
    setFy("");
    setTx("");
    setTy("");
  };

  /* ================= UI ================= */

  return (
    <div className="flex">
      <Sidebar />

      <div className="p-6 w-full">
        <h2 className="text-2xl font-bold mb-4">
          Navigation Path Management
        </h2>

        {/* FORM */}
        <div className="bg-gray-100 p-4 rounded mb-4 grid grid-cols-2 gap-2">

          <input
            className="border p-2"
            placeholder="Building"
            value={building}
            onChange={(e) => setBuilding(e.target.value)}
          />

          <input
            className="border p-2"
            placeholder="Floor"
            value={floor}
            onChange={(e) => setFloor(e.target.value)}
          />

          <input
            className="border p-2"
            placeholder="From Node (N1)"
            value={fromNode}
            onChange={(e) => setFromNode(e.target.value)}
          />

          <input
            className="border p-2"
            placeholder="To Node (N2)"
            value={toNode}
            onChange={(e) => setToNode(e.target.value)}
          />

          <input
            className="border p-2"
            placeholder="From X"
            value={fx}
            onChange={(e) => setFx(e.target.value)}
          />

          <input
            className="border p-2"
            placeholder="From Y"
            value={fy}
            onChange={(e) => setFy(e.target.value)}
          />

          <input
            className="border p-2"
            placeholder="To X"
            value={tx}
            onChange={(e) => setTx(e.target.value)}
          />

          <input
            className="border p-2"
            placeholder="To Y"
            value={ty}
            onChange={(e) => setTy(e.target.value)}
          />

          {editId === null ? (
            <button
              onClick={addPath}
              className="bg-blue-600 text-white px-4 py-2 rounded col-span-2"
            >
              Add Path
            </button>
          ) : (
            <button
              onClick={updatePath}
              className="bg-green-600 text-white px-4 py-2 rounded col-span-2"
            >
              Update Path
            </button>
          )}

        </div>

        {/* LIST */}
        {list.map(p => (
          <div
            key={p.id}
            className="border p-3 mb-2 rounded"
          >
            <div className="font-bold">
              {p.building} - {p.floor}
            </div>

            <div>
              {p.fromNode} → {p.toNode}
            </div>

            <div className="text-sm text-gray-600">
              From({p.fromCoord.x},{p.fromCoord.y}) →
              To({p.toCoord.x},{p.toCoord.y})
            </div>

            <div className="mt-1">
              Status: {p.status}
            </div>

            <div className="mt-2 space-x-2">
              <button
                onClick={() => toggleStatus(p.id)}
                className="bg-purple-600 text-white px-3 py-1 rounded"
              >
                Toggle
              </button>

              <button
                onClick={() => editPath(p)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => deletePath(p.id)}
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

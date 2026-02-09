import { useState } from "react";

type DestinationType =
  | "Faculty"
  | "Labs"
  | "Classrooms"
  | "Halls"
  | "Offices"
  | "";

interface DestinationItem {
  name: string;
  floor: string;
  room: string;
  type: string;
}

const HARD_CODED_DESTINATIONS: Record<string, Omit<DestinationItem, "type">[]> = {
  Faculty: [
    { name: "Dr. Anil Kumar", floor: "2nd Floor", room: "Room 201" },
    { name: "Dr. Meera Nair", floor: "3rd Floor", room: "Room 305" },
    { name: "Dr. Rahul Menon", floor: "1st Floor", room: "Room 120" },
  ],
  Labs: [
    { name: "AI Lab", floor: "1st Floor", room: "Lab 102" },
    { name: "Systems Lab", floor: "2nd Floor", room: "Lab 210" },
  ],
  Classrooms: [
    { name: "CSE A", floor: "Ground Floor", room: "Room G05" },
    { name: "CSE B", floor: "1st Floor", room: "Room 110" },
  ],
  Halls: [
    { name: "Seminar Hall", floor: "Ground Floor", room: "Hall G01" },
    { name: "Conference Hall", floor: "2nd Floor", room: "Hall 205" },
  ],
  Offices: [
    { name: "Department Office", floor: "Ground Floor", room: "Office G02" },
  ],
};

const DestinationSearch: React.FC = () => {
  const [destinationType, setDestinationType] =
    useState<DestinationType>("");
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<DestinationItem[]>([]);
  const [selected, setSelected] = useState<DestinationItem | null>(null);
  const [error, setError] = useState("");

  // 🔍 Dynamic suggestions (with or without type)
  const handleQueryChange = (value: string) => {
    setQuery(value);
    setError("");
    setSelected(null);

    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    let matches: DestinationItem[] = [];

    if (destinationType) {
      // 🔹 Search within selected type
      matches =
        HARD_CODED_DESTINATIONS[destinationType]
          ?.filter((item) =>
            item.name.toLowerCase().includes(value.toLowerCase())
          )
          .map((item) => ({ ...item, type: destinationType })) || [];
    } else {
      // 🔹 Search across ALL types
      Object.entries(HARD_CODED_DESTINATIONS).forEach(([type, items]) => {
        items.forEach((item) => {
          if (item.name.toLowerCase().includes(value.toLowerCase())) {
            matches.push({ ...item, type });
          }
        });
      });
    }

    setSuggestions(matches);
  };

  // ✅ Select suggestion
  const handleSelect = (item: DestinationItem) => {
    setSelected(item);
    setQuery(item.name);
    setDestinationType(item.type as DestinationType);
    setSuggestions([]);
  };

  // 🚦 Validate on Find Route
  const handleFindRoute = (): void => {
    setError("");

    if (!query.trim()) {
      setError("Please enter a destination.");
      return;
    }

    if (!selected) {
      setError(
        "Invalid destination. Please select a valid option from the suggestions."
      );
      return;
    }

    alert(
      `Route will be generated to ${selected.name} (${selected.floor}, ${selected.room})`
    );
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <h3 className="text-lg font-medium mb-4">Destination</h3>

      <select
        className="w-full mb-3 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={destinationType}
        onChange={(e) => {
          setDestinationType(e.target.value as DestinationType);
          setQuery("");
          setSuggestions([]);
          setSelected(null);
          setError("");
        }}
      >
        <option value="">All destination types</option>
        <option value="Faculty">Faculty</option>
        <option value="Labs">Labs</option>
        <option value="Classrooms">Classrooms</option>
        <option value="Halls">Halls</option>
        <option value="Offices">Offices</option>
      </select>

      <input
        type="text"
        placeholder="Search destination..."
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={query}
        onChange={(e) => handleQueryChange(e.target.value)}
      />

      {/* 🔽 Suggestions */}
      {suggestions.length > 0 && (
        <ul className="mt-2 border rounded-lg max-h-40 overflow-y-auto bg-white">
          {suggestions.map((item, index) => (
            <li
              key={index}
              onClick={() => handleSelect(item)}
              className="px-3 py-2 cursor-pointer hover:bg-gray-100"
            >
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">
                {item.type} • {item.floor} • {item.room}
              </p>
            </li>
          ))}
        </ul>
      )}

      {query && suggestions.length === 0 && !selected && (
        <p className="mt-2 text-sm text-gray-500">
          No matching destinations found
        </p>
      )}

      <button
        onClick={handleFindRoute}
        className="w-full mt-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
      >
        Find Route
      </button>

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
          {error}
        </div>
      )}

      {selected && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm">
          <p className="font-medium text-green-700">
            Destination Selected
          </p>
          <p className="text-green-600">
            {selected.name} — {selected.floor}, {selected.room}
          </p>
        </div>
      )}
    </div>
  );
};

export default DestinationSearch;

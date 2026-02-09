import { useState } from "react";

type DestinationType =
  | "Faculty"
  | "Labs"
  | "Classrooms"
  | "Halls"
  | "Offices"
  | "";

const DestinationSearch: React.FC = () => {
  const [destinationType, setDestinationType] = useState<DestinationType>("");
  const [query, setQuery] = useState<string>("");

  const handleFindRoute = (): void => {
    console.log("Destination Type:", destinationType);
    console.log("Query:", query);
    alert("Route calculation logic will be added later");
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <h3 className="text-lg font-medium mb-4">Destination</h3>

      <select
        className="w-full mb-4 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={destinationType}
        onChange={(e) =>
          setDestinationType(e.target.value as DestinationType)
        }
      >
        <option value="">Select destination type</option>
        <option value="Faculty">Faculty</option>
        <option value="Labs">Labs</option>
        <option value="Classrooms">Classrooms</option>
        <option value="Halls">Halls</option>
        <option value="Offices">Offices</option>
      </select>

      <input
        type="text"
        placeholder="Search destination..."
        className="w-full mb-4 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button
        onClick={handleFindRoute}
        className="w-full py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
      >
        Find Route
      </button>
    </div>
  );
};

export default DestinationSearch;

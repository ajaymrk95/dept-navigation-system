import { useState } from "react";
import { locations } from "../data/locations";
import { searchLocations } from "../utils/searchLocation";
import type { Location } from "../data/locations";

export default function LocationSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Location[]>([]);

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setResults([]);
      return;
    }

    const matches = searchLocations(value, locations);
    setResults(matches);
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search location..."
        value={query}
        onChange={handleSearch}
      />

      <ul>
        {results.map((loc) => (
          <li key={loc.id}>
            {loc.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
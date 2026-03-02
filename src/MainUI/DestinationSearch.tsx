import { useState } from "react";

type DestinationType = "Faculty" | "Labs" | "Classrooms" | "Halls" | "Offices" | "";

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
  const [destinationType, setDestinationType] = useState<DestinationType>("");
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<DestinationItem[]>([]);
  const [selected, setSelected] = useState<DestinationItem | null>(null);
  const [error, setError] = useState("");

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setError("");
    setSelected(null);

    if (!value.trim()) { setSuggestions([]); return; }

    let matches: DestinationItem[] = [];
    if (destinationType) {
      matches = HARD_CODED_DESTINATIONS[destinationType]
        ?.filter((item) => item.name.toLowerCase().includes(value.toLowerCase()))
        .map((item) => ({ ...item, type: destinationType })) || [];
    } else {
      Object.entries(HARD_CODED_DESTINATIONS).forEach(([type, items]) => {
        items.forEach((item) => {
          if (item.name.toLowerCase().includes(value.toLowerCase()))
            matches.push({ ...item, type });
        });
      });
    }
    setSuggestions(matches);
  };

  const handleSelect = (item: DestinationItem) => {
    setSelected(item);
    setQuery(item.name);
    setDestinationType(item.type as DestinationType);
    setSuggestions([]);
  };

  const handleFindRoute = (): void => {
    setError("");
    if (!query.trim()) { setError("Please enter a destination."); return; }
    if (!selected) { setError("Invalid destination. Please select a valid option from the suggestions."); return; }
    alert(`Route will be generated to ${selected.name} (${selected.floor}, ${selected.room})`);
  };

  return (
    <>
      <style>{`
        .ds-select,
        .ds-input {
          width: 100%;
          padding: 10px 14px;
          border-radius: 8px;
          border: 1.5px solid rgba(246, 231, 188, 0.2);
          background: rgba(246, 231, 188, 0.06);
          color: #F6E7BC;
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          font-weight: 300;
          outline: none;
          transition: border-color 0.2s ease;
          appearance: none;
        }

        .ds-select option {
          background: #0B2D72;
          color: #F6E7BC;
        }

        .ds-select:focus,
        .ds-input:focus {
          border-color: #0AC4E0;
        }

        .ds-input::placeholder {
          color: rgba(246, 231, 188, 0.35);
        }

        .ds-field-group {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 12px;
        }

        .ds-suggestions {
          list-style: none;
          border: 1.5px solid rgba(10, 196, 224, 0.25);
          border-radius: 8px;
          overflow: hidden;
          margin-bottom: 12px;
          max-height: 180px;
          overflow-y: auto;
        }

        .ds-suggestion-item {
          padding: 10px 14px;
          cursor: pointer;
          border-bottom: 1px solid rgba(246, 231, 188, 0.08);
          transition: background 0.15s ease;
        }

        .ds-suggestion-item:last-child {
          border-bottom: none;
        }

        .ds-suggestion-item:hover {
          background: rgba(10, 196, 224, 0.1);
        }

        .ds-suggestion-name {
          font-size: 13px;
          font-weight: 500;
          color: #F6E7BC;
          margin-bottom: 2px;
        }

        .ds-suggestion-meta {
          font-size: 12px;
          font-weight: 300;
          color: rgba(246, 231, 188, 0.45);
        }

        .ds-no-results {
          font-size: 13px;
          color: rgba(246, 231, 188, 0.35);
          margin-bottom: 12px;
          font-weight: 300;
        }

        .ds-find-btn {
          width: 100%;
          padding: 11px;
          border-radius: 8px;
          border: 1.5px solid #0B2D72;
          background: #0AC4E0;
          color: #ffffff;
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.22s ease;
          letter-spacing: 0.02em;
        }

        .ds-find-btn:hover {
          background: #0AC4E0;
          border-color: #0AC4E0;
          color: #0B2D72;
        }

        .ds-status-success {
          margin-top: 12px;
          padding: 12px 14px;
          background: rgba(10, 196, 224, 0.08);
          border: 1px solid rgba(10, 196, 224, 0.25);
          border-radius: 8px;
          font-size: 13px;
        }

        .ds-status-success p:first-child {
          font-weight: 500;
          color: #0AC4E0;
          margin-bottom: 2px;
        }

        .ds-status-success p:last-child {
          font-weight: 300;
          color: rgba(10, 196, 224, 0.7);
        }

        .ds-status-error {
          margin-top: 12px;
          padding: 12px 14px;
          background: rgba(255, 80, 80, 0.08);
          border: 1px solid rgba(255, 80, 80, 0.25);
          border-radius: 8px;
          font-size: 13px;
          color: #ff6b6b;
          font-weight: 300;
        }
      `}</style>

      <div className="ds-field-group">
        <select
          className="ds-select"
          value={destinationType}
          onChange={(e) => {
            setDestinationType(e.target.value as DestinationType);
            setQuery(""); setSuggestions([]); setSelected(null); setError("");
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
          className="ds-input"
          placeholder="Search destination..."
          value={query}
          onChange={(e) => handleQueryChange(e.target.value)}
        />
      </div>

      {suggestions.length > 0 && (
        <ul className="ds-suggestions">
          {suggestions.map((item, index) => (
            <li key={index} className="ds-suggestion-item" onClick={() => handleSelect(item)}>
              <p className="ds-suggestion-name">{item.name}</p>
              <p className="ds-suggestion-meta">{item.type} · {item.floor} · {item.room}</p>
            </li>
          ))}
        </ul>
      )}

      {query && suggestions.length === 0 && !selected && (
        <p className="ds-no-results">No matching destinations found</p>
      )}

      <button className="ds-find-btn" onClick={handleFindRoute}>
        Find Route →
      </button>

      {error && <div className="ds-status-error">⚠ {error}</div>}

      {selected && (
        <div className="ds-status-success">
          <p>✓ Destination Selected</p>
          <p>{selected.name} — {selected.floor}, {selected.room}</p>
        </div>
      )}
    </>
  );
};

export default DestinationSearch;
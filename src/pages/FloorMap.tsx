import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import {
  ToggleLeft,
  ToggleRight,
  MapPin,
  Route,
  Navigation,
  DoorOpen,
  ChevronDown,
  Loader2,
  Lock,
  Unlock,
  X,
} from "lucide-react";

/* ─── Types ──────────────────────────────────────────────────── */
type GeoFeature = {
  properties: Record<string, any>;
  geometry: any;
  type: string;
};
type GeoJSON = { type: string; features: GeoFeature[] };
type FloorMeta = {
  id: string;
  level: number;
  name: string;
  buildingId: string;
};

type SelectedFeature =
  | { kind: "path"; id: string }
  | { kind: "poi"; name: string }
  | { kind: "unit"; index: number };

/* ─── Config ─────────────────────────────────────────────────── */
const BUILDINGS = [
  { id: "elhc", name: "ELHC", label: "Electronics & Hardware Lab Complex" },
];
const MAX_FLOORS_TO_PROBE = 10;
const FLOOR_NAMES: Record<number, string> = {
  1: "Ground Floor",
  2: "First Floor",
  3: "Second Floor",
  4: "Third Floor",
  5: "Fourth Floor",
  6: "Fifth Floor",
  7: "Sixth Floor",
  8: "Seventh Floor",
  9: "Eighth Floor",
  10: "Ninth Floor",
};

/* ─── Helpers ────────────────────────────────────────────────── */
async function probeFloor(id: string): Promise<boolean> {
  try {
    return (await fetch(`/maps/${id}/paths.geojson`, { method: "HEAD" })).ok;
  } catch {
    return false;
  }
}

async function loadFloorData(id: string) {
  const [paths, poi, units] = await Promise.all([
    fetch(`/maps/${id}/paths.geojson`).then((r) => r.json()),
    fetch(`/maps/${id}/poi.geojson`).then((r) => r.json()),
    fetch(`/maps/${id}/units.geojson`).then((r) => r.json()),
  ]);
  return { paths, poi, units } as {
    paths: GeoJSON;
    poi: GeoJSON;
    units: GeoJSON;
  };
}

function roomPopup(p: Record<string, any>) {
  return `<div style="font-family:system-ui,sans-serif;min-width:140px;padding:2px 0">
    <div style="font-weight:700;font-size:13px;color:#1a202c;margin-bottom:3px">${p.name}</div>
    ${p.room_no ? `<div style="font-size:11px;color:#64748b">Room <b>${p.room_no}</b></div>` : ""}
    <div style="font-size:11px;color:#64748b;text-transform:capitalize">${p.category ?? ""}</div>
  </div>`;
}

function poiPopup(p: Record<string, any>, isOpen: boolean) {
  const typeColor = p.type === "entry" ? "#FAB95B" : "#547792";
  return `<div style="font-family:system-ui,sans-serif;min-width:140px;padding:2px 0">
    <div style="font-weight:700;font-size:13px;color:#1a202c;margin-bottom:4px">${p.name}</div>
    <div style="display:flex;align-items:center;gap:6px">
      <span style="font-size:10px;background:${typeColor}22;color:${typeColor};border:1px solid ${typeColor}55;
        padding:1px 7px;border-radius:99px;font-weight:700;text-transform:capitalize">${p.type}</span>
      <span style="font-size:10px;font-weight:700;padding:1px 7px;border-radius:99px;
        background:${isOpen ? "#dcfce7" : "#fee2e2"};color:${isOpen ? "#16a34a" : "#dc2626"};
        border:1px solid ${isOpen ? "#bbf7d0" : "#fecaca"}">
        ${isOpen ? "Open" : "Closed"}
      </span>
    </div>
  </div>`;
}

function pathPopup(p: Record<string, any>) {
  const typeColor =
    p.type === "entry"
      ? "#FAB95B"
      : p.type === "stairs"
        ? "#e74c3c"
        : "#547792";
  return `<div style="font-family:system-ui,sans-serif;min-width:120px;padding:2px 0">
    <div style="font-weight:700;font-size:12px;color:#1a202c;margin-bottom:3px">
      Path ${p.id}${p.name ? ` · ${p.name}` : ""}
    </div>
    <span style="font-size:10px;background:${typeColor}22;color:${typeColor};border:1px solid ${typeColor}55;
      padding:1px 7px;border-radius:99px;font-weight:700;text-transform:capitalize">${p.type}</span>
  </div>`;
}

/* ─── Small UI ───────────────────────────────────────────────── */
function SectionHeader({
  icon,
  label,
  count,
}: {
  icon: React.ReactNode;
  label: string;
  count?: number;
}) {
  return (
    <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-100">
      <span className="text-zinc-400">{icon}</span>
      <span className="text-xs font-bold text-zinc-600 uppercase tracking-widest">
        {label}
      </span>
      {count !== undefined && (
        <span className="ml-auto bg-zinc-100 text-zinc-500 text-[10px] font-bold px-2 py-0.5 rounded-full">
          {count}
        </span>
      )}
    </div>
  );
}

function SelectBox({
  value,
  onChange,
  children,
}: {
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-white border border-zinc-200 text-zinc-700 text-xs font-medium
          rounded-lg pl-3 pr-8 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-300 cursor-pointer"
      >
        {children}
      </select>
      <ChevronDown
        size={13}
        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
export default function FloorMap() {
  const mapDivRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const pathLayer = useRef<L.GeoJSON | null>(null);
  const selectedItemRef = useRef<HTMLDivElement | null>(null);

  const [availableFloors, setAvailableFloors] = useState<FloorMeta[]>([]);
  const [probingFloors, setProbingFloors] = useState(true);

  const [outline, setOutline] = useState<GeoJSON | null>(null);
  const [paths, setPaths] = useState<GeoJSON | null>(null);
  const [poi, setPoi] = useState<GeoJSON | null>(null);
  const [units, setUnits] = useState<GeoJSON | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [pathToggles, setPathToggles] = useState<Record<string, boolean>>({});
  const [poiStatus, setPoiStatus] = useState<Record<string, boolean>>({});
  const [selectedBuilding, setSelectedBuilding] = useState("elhc");
  const [selectedFloor, setSelectedFloor] = useState("");
  const [activeTab, setActiveTab] = useState<"paths" | "poi" | "units">("paths");

  // NEW: track what's selected from map click
  const [selectedFeature, setSelectedFeature] = useState<SelectedFeature | null>(null);

  const poiStatusRef = useRef(poiStatus);
  useEffect(() => { poiStatusRef.current = poiStatus; }, [poiStatus]);

  // Ref so map event closures can always call the latest setter
  const setSelectedFeatureRef = useRef(setSelectedFeature);
  useEffect(() => { setSelectedFeatureRef.current = setSelectedFeature; }, []);

  const buildingFloors = availableFloors.filter((f) => f.buildingId === selectedBuilding);
  const currentFloor = availableFloors.find((f) => f.id === selectedFloor);
  const currentBuilding = BUILDINGS.find((b) => b.id === selectedBuilding);

  /* ── Discover floors ─────────────────────────────────────── */
  useEffect(() => {
    (async () => {
      setProbingFloors(true);
      const checks = Array.from({ length: MAX_FLOORS_TO_PROBE }, (_, i) => {
        const level = i + 1, id = `floor${level}`;
        return probeFloor(id).then((ok) =>
          ok ? { id, level, name: FLOOR_NAMES[level] ?? `Floor ${level}`, buildingId: "elhc" } : null
        );
      });
      const found = (await Promise.all(checks)).filter(Boolean).sort((a, b) => a!.level - b!.level) as FloorMeta[];
      setAvailableFloors(found);
      if (found.length > 0) setSelectedFloor(found[0].id);
      setProbingFloors(false);
    })();
  }, []);

  useEffect(() => {
    fetch("/maps/outline.geojson").then((r) => r.json()).then(setOutline).catch(() => {});
  }, []);

  useEffect(() => {
    if (!selectedFloor) return;
    setLoading(true);
    setError(null);
    setPaths(null);
    setPoi(null);
    setUnits(null);
    setPathToggles({});
    setPoiStatus({});
    setSelectedFeature(null);
    loadFloorData(selectedFloor)
      .then(({ paths, poi, units }) => { setPaths(paths); setPoi(poi); setUnits(units); })
      .catch(() => setError("Failed to load floor data"))
      .finally(() => setLoading(false));
  }, [selectedFloor]);

  /* ── Scroll selected item into view when selection or tab changes ── */
  useEffect(() => {
    if (selectedItemRef.current) {
      selectedItemRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [selectedFeature, activeTab]);

  /* ── Build map ───────────────────────────────────────────── */
  useEffect(() => {
    if (!mapDivRef.current || !paths || !poi || !units) return;

    mapRef.current?.remove();
    const map = L.map(mapDivRef.current, { zoomControl: false }).setView([11.32258, 75.9337], 19);
    mapRef.current = map;
    L.control.zoom({ position: "topright" }).addTo(map);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 22,
      attribution: "© OpenStreetMap",
    }).addTo(map);

    const tooltipOpts: L.TooltipOptions = {
      sticky: true, opacity: 1, className: "leaflet-custom-tooltip",
    };

    if (outline) {
      L.geoJSON(outline as any, {
        style: { color: "#1A3263", weight: 2, fillColor: "#E8E2DB", fillOpacity: 0.35, interactive: false },
      }).addTo(map);
    }

    /* ── Room units ── */
    L.geoJSON(units as any, {
      style: { color: "#547792", weight: 1.5, fillColor: "#547792", fillOpacity: 0.12, className: "map-clickable" },
      onEachFeature: (f, layer) => {
        const p = f.properties;
        const tooltipLabel = p.room_no ? `${p.room_no} · ${p.name}` : p.name;
        layer.bindTooltip(tooltipLabel, { ...tooltipOpts, direction: "top", offset: [0, -4] });
        layer.bindPopup(roomPopup(p), { maxWidth: 220, className: "leaflet-custom-popup" });
        layer.on("mouseover", function (this: L.GeoJSON) { (this as any).setStyle({ fillOpacity: 0.35, weight: 2.5 }); });
        layer.on("mouseout", function (this: L.GeoJSON) { (this as any).setStyle({ fillOpacity: 0.12, weight: 1.5 }); });

        // NEW: on click, find unit index and switch to units tab
        layer.on("click", () => {
          const idx = (units as GeoJSON).features.findIndex(
            (u) => u.properties.name === p.name && u.properties.room_no === p.room_no
          );
          setSelectedFeatureRef.current({ kind: "unit", index: idx >= 0 ? idx : 0 });
          setActiveTab("units");
        });
      },
    }).addTo(map);

    /* ── POI markers ── */
    poi.features.forEach((f, i) => {
      const [lng, lat] = f.geometry.coordinates;
      const latlng: [number, number] = [lat, lng];
      const typ = f.properties.type as string;
      const name = f.properties.name as string;
      const isOpen = poiStatusRef.current[name] !== false;
      const color = typ === "entry" ? "#FAB95B" : "#547792";

      const marker = L.circleMarker(latlng, {
        radius: 7, fillColor: isOpen ? color : "#9ca3af",
        color: "#fff", weight: 2, fillOpacity: 1, bubblingMouseEvents: false,
      });

      marker.bindTooltip(name, { ...tooltipOpts, direction: "top", offset: [0, -8] });
      marker.bindPopup(poiPopup(f.properties, isOpen), { maxWidth: 220, className: "leaflet-custom-popup" });
      marker.on("mouseover", () => marker.setRadius(10));
      marker.on("mouseout", () => marker.setRadius(7));

      // NEW: on click, switch to poi tab and select this poi
      marker.on("click", () => {
        setSelectedFeatureRef.current({ kind: "poi", name });
        setActiveTab("poi");
      });

      marker.addTo(map);
    });

    /* ── Paths ── */
    renderPaths(map, paths, pathToggles);

    try {
      const pts: [number, number][] = [];
      map.eachLayer((l: any) => {
        if (l.getBounds) { const b = l.getBounds(); if (b.isValid()) pts.push(b.getNorthEast(), b.getSouthWest()); }
        else if (l.getLatLng) { const ll = l.getLatLng(); pts.push([ll.lat, ll.lng]); }
      });
      if (pts.length) map.fitBounds(pts as any, { padding: [30, 30] });
    } catch {}
  }, [outline, paths, poi, units]);

  useEffect(() => {
    if (!mapRef.current || !paths) return;
    renderPaths(mapRef.current, paths, pathToggles);
  }, [pathToggles]);

  function renderPaths(map: L.Map, data: GeoJSON, toggles: Record<string, boolean>) {
    if (pathLayer.current) map.removeLayer(pathLayer.current);

    const filtered = {
      ...data,
      features: data.features.filter((f) => toggles[String(f.properties.id)] !== false),
    };

    pathLayer.current = L.geoJSON(filtered as any, {
      style: (f) => {
        const t = f?.properties?.type;
        return {
          color: t === "entry" ? "#FAB95B" : t === "stairs" ? "#e74c3c" : "#547792",
          weight: t === "entry" ? 3 : 2,
          dashArray: t === "rentry" ? "5,5" : undefined,
          opacity: 0.9,
          cursor: "pointer",
        };
      },
      onEachFeature: (f, layer) => {
        const p = f.properties;
        const label = `Path ${p.id}${p.name ? ` · ${p.name}` : ""} (${p.type})`;
        layer.bindTooltip(label, { sticky: true, opacity: 1, className: "leaflet-custom-tooltip", direction: "top" });
        layer.bindPopup(pathPopup(p), { maxWidth: 200, className: "leaflet-custom-popup" });
        layer.on("mouseover", function (this: any) { this.setStyle({ weight: (this.options.weight ?? 2) + 2, opacity: 1 }); });
        layer.on("mouseout", function (this: any) { const t = f?.properties?.type; this.setStyle({ weight: t === "entry" ? 3 : 2, opacity: 0.9 }); });

        // NEW: on click, switch to paths tab and select this path
        layer.on("click", () => {
          setSelectedFeatureRef.current({ kind: "path", id: String(p.id) });
          setActiveTab("paths");
        });
      },
    }).addTo(map);
  }

  const togglePath = (id: string) => setPathToggles((p) => ({ ...p, [id]: p[id] === false }));
  const togglePoiStatus = (name: string) => setPoiStatus((p) => ({ ...p, [name]: p[name] === false }));

  const pathFeatures = (() => {
    if (!paths) return [];
    const seen = new Set<number>();
    return paths.features.filter((f) => {
      if (seen.has(f.properties.id)) return false;
      seen.add(f.properties.id);
      return true;
    });
  })();
  const poiFeatures = poi?.features ?? [];
  const unitFeatures = units?.features ?? [];

  const legendItems = [
    { color: "#FAB95B", label: "Entry", dash: false },
    { color: "#547792", label: "Corridor", dash: false },
    { color: "#e74c3c", label: "Stairs", dash: false },
    { color: "#547792", label: "Room entry", dash: true },
  ];

  /* ─── Selected feature detail card ──────────────────────── */
  function SelectedCard() {
    if (!selectedFeature) return null;

    let title = "";
    let subtitle = "";
    let badge = "";
    let badgeColor = "#547792";
    let dot = "#547792";
    let extra: React.ReactNode = null;

    if (selectedFeature.kind === "path") {
      const f = pathFeatures.find((f) => String(f.properties.id) === selectedFeature.id);
      if (!f) return null;
      const p = f.properties;
      const typ = p.type as string;
      dot = typ === "entry" ? "#FAB95B" : typ === "stairs" ? "#e74c3c" : "#547792";
      badgeColor = dot;
      title = `Path ${p.id}${p.name ? ` · ${p.name}` : ""}`;
      subtitle = "Navigation Path";
      badge = typ;
    } else if (selectedFeature.kind === "poi") {
      const f = poiFeatures.find((f) => f.properties.name === selectedFeature.name);
      if (!f) return null;
      const p = f.properties;
      const isOpen = poiStatus[p.name] !== false;
      dot = p.type === "entry" ? "#FAB95B" : "#547792";
      badgeColor = dot;
      title = p.name;
      subtitle = "Point of Interest";
      badge = p.type;
      extra = (
        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${
          isOpen ? "bg-emerald-50 text-emerald-600 border-emerald-200" : "bg-red-50 text-red-500 border-red-200"
        }`}>
          {isOpen ? "Open" : "Closed"}
        </span>
      );
    } else if (selectedFeature.kind === "unit") {
      const f = unitFeatures[selectedFeature.index];
      if (!f) return null;
      const p = f.properties;
      title = p.name;
      subtitle = p.category ?? "Room Unit";
      badge = p.room_no ? `Room ${p.room_no}` : "–";
      badgeColor = "#547792";
      dot = "#547792";
    }

    return (
      <div className="mx-3 mt-3 mb-1 rounded-xl border-2 border-amber-300 bg-amber-50 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-3 py-1.5 bg-amber-100 border-b border-amber-200">
          <span className="text-[9px] font-black text-amber-700 uppercase tracking-widest">Selected</span>
          <button
            onClick={() => setSelectedFeature(null)}
            className="text-amber-500 hover:text-amber-700 transition-colors"
          >
            <X size={12} />
          </button>
        </div>
        <div className="flex items-center gap-2.5 px-3 py-2.5">
          <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: dot }} />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-zinc-800 truncate">{title}</p>
            <p className="text-[10px] text-zinc-500 mt-0.5">{subtitle}</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span
              className="text-[9px] font-bold px-2 py-0.5 rounded-full capitalize"
              style={{ background: badgeColor + "22", color: badgeColor, border: `1px solid ${badgeColor}55` }}
            >
              {badge}
            </span>
            {extra}
          </div>
        </div>
      </div>
    );
  }

  /* ─────────────────────────────────────────────────────────── */
  return (
    <>
      <style>{`
        .leaflet-custom-tooltip {
          background: #1e293b !important; color: #f8fafc !important; border: none !important;
          border-radius: 6px !important; font-size: 11px !important; font-weight: 600 !important;
          font-family: system-ui, sans-serif !important; padding: 4px 9px !important;
          box-shadow: 0 2px 8px rgba(0,0,0,.25) !important; white-space: nowrap !important;
        }
        .leaflet-custom-tooltip::before { border-top-color: #1e293b !important; }
        .leaflet-custom-popup .leaflet-popup-content-wrapper {
          border-radius: 10px !important; box-shadow: 0 4px 20px rgba(0,0,0,.15) !important;
          border: 1px solid #e2e8f0 !important; padding: 0 !important;
        }
        .leaflet-custom-popup .leaflet-popup-content { margin: 12px 14px !important; }
        .leaflet-custom-popup .leaflet-popup-tip-container { margin-top: -1px !important; }
        .panel-item-selected {
          outline: 2px solid #F59E0B;
          outline-offset: -2px;
        }
      `}</style>

      <div className="flex flex-col gap-4 h-full font-sans">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-bold text-zinc-800 tracking-tight">Floor Layout</h1>
            <p className="text-xs text-zinc-400 mt-0.5">Hover over map elements to preview · click for details</p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <SelectBox value={selectedBuilding} onChange={setSelectedBuilding}>
              {BUILDINGS.map((b) => (<option key={b.id} value={b.id}>{b.name}</option>))}
            </SelectBox>

            {probingFloors ? (
              <div className="flex items-center gap-1.5 bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs text-zinc-400 shadow-sm">
                <Loader2 size={12} className="animate-spin" /> Detecting floors…
              </div>
            ) : buildingFloors.length === 0 ? (
              <div className="bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs text-zinc-400 shadow-sm">No floors found</div>
            ) : (
              <SelectBox value={selectedFloor} onChange={setSelectedFloor}>
                {buildingFloors.map((f) => (<option key={f.id} value={f.id}>Level {f.level} — {f.name}</option>))}
              </SelectBox>
            )}

            {!probingFloors && buildingFloors.length > 1 && (
              <div className="flex items-center gap-1 bg-white border border-zinc-200 rounded-lg px-2.5 py-1.5 shadow-sm">
                {buildingFloors.map((f) => (
                  <button key={f.id} onClick={() => setSelectedFloor(f.id)}
                    className={`text-[10px] font-bold px-2 py-0.5 rounded transition-all
                      ${selectedFloor === f.id ? "bg-zinc-800 text-white" : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200"}`}>
                    L{f.level}
                  </button>
                ))}
              </div>
            )}

            {(paths || poi || units) && (
              <div className="flex items-center gap-1.5 bg-white border border-zinc-200 rounded-lg px-3 py-1.5 shadow-sm">
                {paths && <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-600">Path</span>}
                {poi && <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-600">POI</span>}
                {units && <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-600">Units</span>}
              </div>
            )}
          </div>
        </div>

        {/* Main */}
        <div className="flex gap-4 flex-1 min-h-0" style={{ height: 580 }}>
          {/* Map */}
          <div className="relative flex-1 rounded-2xl overflow-hidden shadow-md border border-zinc-200 bg-zinc-50">
            {(loading || probingFloors) && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
                <div className="w-8 h-8 border-2 border-slate-200 border-t-slate-600 rounded-full animate-spin mb-3" />
                <p className="text-xs text-zinc-500 font-medium">
                  {probingFloors ? "Discovering floors…" : "Loading map data…"}
                </p>
              </div>
            )}

            {error && !loading && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/80">
                <MapPin size={28} className="text-red-300 mb-2" />
                <p className="text-xs text-red-500 font-medium">{error}</p>
              </div>
            )}

            <div ref={mapDivRef} className="w-full h-full" />

            {currentFloor && (
              <div className="absolute top-3 left-3 z-[1000] bg-white/95 backdrop-blur-sm rounded-lg border border-zinc-100 shadow px-3 py-1.5 pointer-events-none">
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                  {currentBuilding?.name} · Level {currentFloor.level} — {currentFloor.name}
                </p>
              </div>
            )}

            <div className="absolute bottom-4 left-4 z-[1000] bg-white/95 backdrop-blur-sm rounded-xl border border-zinc-100 shadow-lg p-3 space-y-1.5 pointer-events-none">
              <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Legend</p>
              {legendItems.map(({ color, label, dash }) => (
                <div key={label} className="flex items-center gap-2">
                  <svg width="22" height="8" className="flex-shrink-0">
                    <line x1="0" y1="4" x2="22" y2="4" stroke={color} strokeWidth="2.5" strokeDasharray={dash ? "4,3" : undefined} />
                  </svg>
                  <span className="text-[10px] text-zinc-600 font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Side panel */}
          {(paths || poi || units) && (
            <div className="w-72 flex flex-col rounded-2xl overflow-hidden shadow-md border border-zinc-200 bg-zinc-50">
              <div className="flex bg-white border-b border-zinc-100">
                {(
                  [
                    { key: "paths", show: !!paths },
                    { key: "poi", show: !!poi },
                    { key: "units", show: !!units },
                  ] as const
                )
                  .filter((t) => t.show)
                  .map(({ key }) => (
                    <button key={key} onClick={() => setActiveTab(key as any)}
                      className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-widest transition-all
                      ${activeTab === key ? "text-zinc-800 border-b-2 border-zinc-800 bg-white" : "text-zinc-400 hover:text-zinc-600 hover:bg-zinc-50"}`}>
                      {key}
                    </button>
                  ))}
              </div>

              {/* ── Selected feature card — always shown at top ── */}
              <SelectedCard />

              <div className="flex-1 overflow-y-auto">
                {activeTab === "paths" && paths && (
                  <>
                    <SectionHeader icon={<Route size={13} />} label="Navigation Paths" count={pathFeatures.length} />
                    <div className="p-3 space-y-1">
                      {pathFeatures.length === 0 ? (
                        <p className="text-xs text-zinc-400 text-center py-6">No paths defined</p>
                      ) : (
                        pathFeatures.map((f) => {
                          const id = String(f.properties.id);
                          const on = pathToggles[id] !== false;
                          const typ = f.properties.type as string;
                          const dot = typ === "entry" ? "#FAB95B" : typ === "stairs" ? "#e74c3c" : "#547792";
                          const isSelected = selectedFeature?.kind === "path" && selectedFeature.id === id;
                          return (
                            <div
                              key={id}
                              ref={isSelected ? (el) => { selectedItemRef.current = el; } : undefined}
                              onClick={() => togglePath(id)}
                              className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-all cursor-pointer
                                ${on ? "bg-white shadow-sm border border-zinc-100" : "bg-zinc-50 opacity-50"}
                                ${isSelected ? "panel-item-selected" : ""}`}
                            >
                              <div className="flex items-center gap-2.5">
                                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: dot }} />
                                <div>
                                  <p className="text-xs font-semibold text-zinc-700">
                                    Path {id}{f.properties.name ? ` · ${f.properties.name}` : ""}
                                  </p>
                                  <p className="text-[10px] text-zinc-400 capitalize mt-0.5">{typ}</p>
                                </div>
                              </div>
                              <span className="flex-shrink-0">
                                {on ? <ToggleRight size={20} className="text-amber-400" /> : <ToggleLeft size={20} className="text-zinc-300" />}
                              </span>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </>
                )}

                {activeTab === "poi" && poi && (
                  <>
                    <SectionHeader icon={<Navigation size={13} />} label="Points of Interest" count={poiFeatures.length} />
                    <div className="p-3 space-y-1">
                      {poiFeatures.length === 0 ? (
                        <p className="text-xs text-zinc-400 text-center py-6">No POIs defined</p>
                      ) : (
                        poiFeatures.map((f, i) => {
                          const name = f.properties.name as string;
                          const typ = f.properties.type as string;
                          const isOpen = poiStatus[name] !== false;
                          const color = typ === "entry" ? "#FAB95B" : "#547792";
                          const isSelected = selectedFeature?.kind === "poi" && selectedFeature.name === name;
                          return (
                            <div
                              key={i}
                              ref={isSelected ? (el) => { selectedItemRef.current = el; } : undefined}
                              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white shadow-sm border transition-all
                                ${isSelected ? "border-amber-300 panel-item-selected" : "border-zinc-100"}`}
                            >
                              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: isOpen ? color : "#9ca3af" }} />
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-semibold text-zinc-700 truncate">{name}</p>
                                <p className="text-[10px] text-zinc-400 capitalize mt-0.5">{typ}</p>
                              </div>
                              <button
                                onClick={() => togglePoiStatus(name)}
                                className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold border transition-all
                                  ${isOpen ? "bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100" : "bg-red-50 text-red-500 border-red-200 hover:bg-red-100"}`}
                              >
                                {isOpen ? <><Unlock size={9} /> Open</> : <><Lock size={9} /> Closed</>}
                              </button>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </>
                )}

                {activeTab === "units" && units && (
                  <>
                    <SectionHeader icon={<DoorOpen size={13} />} label="Room Units" count={unitFeatures.length} />
                    <div className="p-3 space-y-1">
                      {unitFeatures.length === 0 ? (
                        <p className="text-xs text-zinc-400 text-center py-6">No units defined</p>
                      ) : (
                        unitFeatures.map((f, i) => {
                          const p = f.properties;
                          const isSelected = selectedFeature?.kind === "unit" && selectedFeature.index === i;
                          return (
                            <div
                              key={i}
                              ref={isSelected ? (el) => { selectedItemRef.current = el; } : undefined}
                              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white shadow-sm border transition-all
                                ${isSelected ? "border-amber-300 panel-item-selected" : "border-zinc-100"}`}
                            >
                              <div className="w-7 h-7 rounded-md bg-slate-100 flex items-center justify-center flex-shrink-0">
                                <span className="text-[10px] font-bold text-slate-500">{p.room_no ?? "–"}</span>
                              </div>
                              <div className="min-w-0">
                                <p className="text-xs font-semibold text-zinc-700 truncate">{p.name}</p>
                                <p className="text-[10px] text-zinc-400 capitalize mt-0.5">{p.category}</p>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </>
                )}
              </div>

              <div className="bg-white border-t border-zinc-100 px-4 py-2.5 flex items-center">
                {[
                  paths && { label: "Paths", val: pathFeatures.length },
                  poi && { label: "POIs", val: poiFeatures.length },
                  units && { label: "Units", val: unitFeatures.length },
                ]
                  .filter(Boolean)
                  .map(({ label, val }: any) => (
                    <div key={label} className="flex flex-col items-center flex-1">
                      <span className="text-sm font-bold text-zinc-700">{val}</span>
                      <span className="text-[9px] text-zinc-400 uppercase tracking-widest">{label}</span>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
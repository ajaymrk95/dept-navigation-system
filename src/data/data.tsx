// ================= ADMIN =================
export const ADMIN = {
  username: "admin",
  password: "admin123",
};

// ================= LOCATIONS =================
export const locations = [
  {
    id: 1,
    name: "CSE Lab",
    floor: "1st Floor",
    type: "Laboratory",
    description: "Computer Science Programming Lab",
    latitude: 11.321,
    longitude: 75.934,
  },
  {
    id: 2,
    name: "Seminar Hall",
    floor: "Ground Floor",
    type: "Hall",
    description: "Main seminar and presentation hall",
    latitude: 11.322,
    longitude: 75.935,
  },
  {
    id: 3,
    name: "HOD Office",
    floor: "2nd Floor",
    type: "Office",
    description: "Head of Department Office",
    latitude: 11.323,
    longitude: 75.936,
  },
];

// ================= FACULTY =================
export const faculty = [
  {
    id: 1,
    name: "Dr. Ajay Mahesh",
    room: "CSE-201",
    locationId: 3, // HOD Office
  },
  {
    id: 2,
    name: "Dr. Lishin VS",
    room: "CSE-205",
    locationId: 3,
  },
];

// ================= PATHS =================
export const paths = [
  {
    id: 1,
    building: "Main Block",
    floor: "1st Floor",

    fromNode: "N1",
    toNode: "N2",

    fromCoord: { x: 120, y: 80 },
    toCoord: { x: 300, y: 200 },

    status: "Open",
  },
];

// ================= FLOOR MAPS =================
export const floorMaps = [
  {
    id: 1,
    buildingId: 1,
    floor: "1st Floor",
    image: "/maps/mainblock_floor1.png"
  },
  {
    id: 2,
    buildingId: 1,
    floor: "2nd Floor",
    image: "/maps/mainblock_floor2.png"
  },
  {
    id: 3,
    buildingId: 2,
    floor: "1st Floor",
    image: "/maps/itblock_floor1.png"
  }
];

// ================= BUILDINGS =================
export const buildings = [
  {
    id: 1,
    name: "Main Block",
    entrances: [
      { id: 1, name: "North Gate", latitude: 11.3205, longitude: 75.9338 },
      { id: 2, name: "South Gate", latitude: 11.3212, longitude: 75.9345 }
    ]
  }
];



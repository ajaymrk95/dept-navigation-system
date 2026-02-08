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


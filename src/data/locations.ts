export type Location = {
  id: number;
  name: string;
  coords: [number, number];
  type: "building" | "lab" | "connection" | "custom" | "room";
  category?: "indoor" | "outdoor";
  description?: string;
  parentLocationId?: number; 
}

export const locations: Location[] = [
 
  { 
    id: 1, 
    name: "Rajpath", 
    coords: [11.320713, 75.933313], 
    type: "connection", 
    category: "outdoor",
    description: "The main central walkway of the campus connecting major blocks." 
  },
  { 
    id: 2, 
    name: "CSED", 
    coords: [11.3222231, 75.9339917], 
    type: "building", 
    category: "outdoor",
    description: "Computer Science & Engineering Department building." 
  },
  { 
    id: 3, 
    name: "ELHC", 
    coords: [11.3225979, 75.9337476], 
    type: "building", 
    category: "outdoor",
    description: "Electrical Lecture Hall Complex, primarily for power systems and electronics classes." 
  },
  { 
    id: 4, 
    name: "NLHC", 
    coords: [11.3217918, 75.9327887], 
    type: "building", 
    category: "outdoor",
    description: "New Lecture Hall Complex - the primary hub for multi-disciplinary lectures." 
  },
  { 
    id: 5, 
    name: "Main Building", 
    coords: [11.3215577, 75.9342156], 
    type: "building", 
    category: "outdoor",
    description: "Administrative headquarters housing the Director's office and main auditorium." 
  },
  { 
    id: 6, 
    name: "Central Computer Centre", 
    coords: [11.3215840, 75.9334955], 
    type: "building", 
    category: "outdoor",
    description: "The 24/7 computing hub for all students, housing T1 and T2 terminals." 
  },
  { 
    id: 7, 
    name: "IT Lab Complex", 
    coords: [11.3229687, 75.9343269], 
    type: "lab", 
    category: "outdoor",
    description: "Specialized laboratory complex for Information Technology and advanced research." 
  },

  // --- INDOOR LOCATIONS (CCC) ---
  { 
    id: 8, 
    name: "CCC T1", 
    coords: [11.3215840, 75.9334955], 
    type: "room", 
    category: "indoor", 
    parentLocationId: 6,
    description: "Terminal 1 located on the ground floor of CCC, used for general labs." 
  },
  { 
    id: 9, 
    name: "CCC T2", 
    coords: [11.3215840, 75.9334955], 
    type: "room", 
    category: "indoor", 
    parentLocationId: 6,
    description: "Terminal 2 located on the first floor of CCC, reserved for senior projects." 
  },

  // --- INDOOR LOCATIONS (IT Lab Complex) ---
  { 
    id: 10, 
    name: "Software Systems Lab", 
    coords: [11.3229687, 75.9343269], 
    type: "room", 
    category: "indoor", 
    parentLocationId: 7,
    description: "Specialized lab for software engineering, design patterns, and application development." 
  },
  { 
    id: 11, 
    name: "Network Systems Lab", 
    coords: [11.3229687, 75.9343269], 
    type: "room", 
    category: "indoor", 
    parentLocationId: 7,
    description: "Advanced lab for network security, routing, and switching protocols." 
  }
];
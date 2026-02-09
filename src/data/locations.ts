export type Location = {
  id: number
  name: string
  coords: [number, number]
  type: "building" | "lab" | "connection"|"custom"
}

export const locations: Location[] = [
  { id:1, name:"Rajpath", coords:[11.320713, 75.933313], type:"connection" },
  { id:2, name:"CSED", coords:[11.3222231, 75.9339917], type:"building" },
  { id:3, name:"ELHC", coords:[11.3225979, 75.9337476], type:"building" },
  { id:4, name:"NLHC", coords:[11.3217918, 75.9327887], type:"building" },
  { id:5, name:"Main Building", coords:[11.3215577, 75.9342156], type:"building" },
  { id:6, name:"Central Computer Centre", coords:[11.3215840, 75.9334955], type:"building" },
  { id:7, name:"IT Lab Complex", coords:[11.3229687, 75.9343269], type:"lab" }

]

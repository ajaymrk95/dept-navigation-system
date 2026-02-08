export function modifyBuildingData(updatedLocations: any[]) {
  console.log("Building Data Updated:", updatedLocations);
  return updatedLocations;
}

export function updateFloorPlan(
  floor: string,
  geoJsonData: any
) {
  console.log("Floor:", floor);
  console.log("New Floor Plan:", geoJsonData);
}

export function managePathNodes(updatedPaths: any[]) {
  console.log("Paths Updated:", updatedPaths);
  return updatedPaths;
}

export function assignFaculty(room: string, facultyName: string) {
  console.log(`${facultyName} assigned to ${room}`);
}

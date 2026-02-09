import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/admin/Dashboard";
import Locations from "./pages/admin/Locations";
import Faculty from "./pages/admin/Faculty";
import Paths from "./pages/admin/Paths";
import ProtectedRoute from "./auth/ProtectedRoute";
import Buildings from "./pages/admin/Buildings";
import FloorMaps from "./pages/admin/FloorMaps";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/locations" element={<Locations />} />
          <Route path="/admin/faculty" element={<Faculty />} />
          <Route path="/admin/paths" element={<Paths />} />
          <Route path="/admin/buildings" element={<Buildings/>} />
          <Route path="/admin/floormaps" element={<FloorMaps/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

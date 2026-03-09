import { Routes, Route } from "react-router-dom";
import Dashboard from "./MainUI/Dashboard";
import Navigation from "./MainUI/Navigation";
import ViewMap from "./MainUI/ViewMap";
import AdminLogin from "./MainUI/AdminLogin";
import "./index.css";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/navigate" element={<Navigation />} />
      <Route path="/map" element={<ViewMap />} />
      <Route path="/admin-login" element={<AdminLogin />} />
    </Routes>
  );
};

export default App;
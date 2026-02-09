import { Routes, Route } from "react-router-dom";
import Dashboard from "./MainUI/Dashboard";
import Navigation from "./MainUI/Navigation";
import ViewMap from "./MainUI/ViewMap";
import "./index.css";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/navigate" element={<Navigation />} />
      <Route path="/map" element={<ViewMap />} />
    </Routes>
  );
};

export default App;

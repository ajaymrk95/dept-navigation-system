import { Routes, Route } from "react-router-dom";
import Dashboard from "./MainUI/dashboard";
import Navigation from "./MainUI/Navigation";
import ViewMap from "./MainUI/ViewMap";

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

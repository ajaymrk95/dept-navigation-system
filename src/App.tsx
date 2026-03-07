import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Scanner from "./pages/Scanner";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scan" element={<Scanner />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function Home() {
  const navigate = useNavigate();
  const location = useLocation();

  const [query, setQuery] = useState("");

  useEffect(() => {
    if (location.state?.qrData) {
      setQuery(location.state.qrData);
    }
  }, [location.state]);

  return (
    <div className="p-4">

      {/* search bar */}
      <input
        type="text"
        placeholder="Search location..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ marginRight: "10px" }}
      />

      {/* QR button beside search */}
      <button
        type="button"
        className="btn btn-outline-primary"
        onClick={() => navigate("/scan")}
      >
        Scan QR
      </button>

    </div>
  );
}

export default Home;
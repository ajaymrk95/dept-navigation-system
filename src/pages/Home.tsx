import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <button type="button" className="btn btn-outline-primary" onClick={() => navigate("/scan")}>
        Scan QR
      </button>
    </div>
  );
}

export default Home;

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
    const navigate = useNavigate();

     const logout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/");
  };
  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <h2 className="text-xl mb-6">Admin Panel</h2>
      <Link to="/admin/dashboard">Dashboard</Link><br/>
      <Link to="/admin/locations">Locations</Link><br/>
      <Link to="/admin/faculty">Faculty</Link><br/>
      <Link to="/admin/paths">Paths</Link>
      <button
  onClick={logout}
  className="mt-10 bg-red-600 text-white px-4 py-2 rounded w-full"
>
  Logout
</button>
    </div>
  );
}

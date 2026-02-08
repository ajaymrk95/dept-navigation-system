import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const isAuth = localStorage.getItem("admin") === "true";
  return isAuth ? <Outlet /> : <Navigate to="/" />;
}

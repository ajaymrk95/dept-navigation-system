import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ADMIN } from "../data/data";

export default function Login() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const nav = useNavigate();

  const login = () => {
    if (user === ADMIN.username && pass === ADMIN.password) {
      localStorage.setItem("admin", "true");
      nav("/admin/dashboard");
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-white p-8 rounded w-80">
        <h1 className="text-xl font-bold mb-4">Admin Login</h1>
        <input className="input" placeholder="Username"
          onChange={e=>setUser(e.target.value)} />
        <input className="input mt-2" type="password" placeholder="Password"
          onChange={e=>setPass(e.target.value)} />
        <button onClick={login} className="btn mt-4 w-full">Login</button>
      </div>
    </div>
  );
}

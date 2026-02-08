import Sidebar from "../../components/Sidebar";

export default function Dashboard(){
  return(
    <div className="flex">
      <Sidebar/>
      <div className="p-6">
        <h1 className="text-2xl">Welcome Admin</h1>
        <p>Manage locations, faculty and navigation paths</p>
      </div>
    </div>
  );
}

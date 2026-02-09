import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-gray-50 to-indigo-100">

      {/* Top Bar */}
      <div className="flex items-center justify-between px-8 py-5">
        <h1 className="text-lg font-semibold text-gray-800">
          DeptNavSys
        </h1>

        <button
          onClick={() => navigate("/admin-login")}
          className="flex items-center gap-2 px-4 py-2 rounded-full
                     bg-white text-gray-700 shadow-sm hover:shadow-md
                     hover:bg-gray-100 transition text-sm font-medium"
        >
          🔐 Admin Login
        </button>
      </div>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-6">

        {/* Hero + Actions Card */}
        <div className="bg-white rounded-3xl shadow-xl px-10 py-14 mt-6">

          {/* Hero Section */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Department Navigation System
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Navigate faculty offices, laboratories, classrooms, and halls
              inside the Computer Science Department with ease.
            </p>
          </div>

          {/* Feature Strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
            <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-4">
              <span className="text-2xl">📡</span>
              <p className="text-sm text-gray-700">
                GPS-based starting point detection
              </p>
            </div>
            <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-4">
              <span className="text-2xl">📷</span>
              <p className="text-sm text-gray-700">
                QR-based indoor entry navigation
              </p>
            </div>
            <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-4">
              <span className="text-2xl">🧭</span>
              <p className="text-sm text-gray-700">
                Shortest-path indoor routing
              </p>
            </div>
          </div>

          {/* Main Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

            {/* View Map */}
            <button
              onClick={() => navigate("/map")}
              className="group relative bg-indigo-50 rounded-2xl p-8 text-left
                         hover:bg-indigo-100 transition-all duration-300"
            >
              <div className="text-4xl mb-4">🗺</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                View Department Map
              </h3>
              <p className="text-gray-600">
                Explore floors, entrances, corridors, and department layout.
              </p>
            </button>

            {/* Start Navigation */}
            <button
              onClick={() => navigate("/navigate")}
              className="group relative bg-indigo-50 rounded-2xl p-8 text-left
                         hover:bg-indigo-100 transition-all duration-300"
            >
              <div className="text-4xl mb-4">📍</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Start Navigation
              </h3>
              <p className="text-gray-600">
                Get step-by-step directions from your location to your destination.
              </p>
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

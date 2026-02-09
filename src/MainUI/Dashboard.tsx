import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-4xl w-full px-6">
        <h1 className="text-3xl font-semibold text-center mb-2">
          Department Navigation System
        </h1>

        <p className="text-center text-gray-600 mb-10">
          Navigate faculty offices, labs, halls, and classrooms
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* View Map Card */}
          <button
            onClick={() => navigate("/map")}
            className="bg-white rounded-xl p-8 shadow-md text-left
                       hover:shadow-xl transition cursor-pointer"
          >
            <h2 className="text-xl font-medium mb-2">🗺 View Map</h2>
            <p className="text-gray-600">
              Explore the department layout
            </p>
          </button>

          {/* Start Navigation Card */}
          <button
            onClick={() => navigate("/navigate")}
            className="bg-white rounded-xl p-8 shadow-md text-left
                       hover:shadow-xl transition cursor-pointer"
          >
            <h2 className="text-xl font-medium mb-2">📍 Start Navigation</h2>
            <p className="text-gray-600">
              Find the shortest route to your destination
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

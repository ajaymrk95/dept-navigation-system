import { useState } from "react";
import StartLocationSelector from "../MainUI/StartLocationSelector";
import DestinationSearch from "../MainUI/DestinationSearch";

const Navigation = () => {
  const [currentLocation, setCurrentLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [gpsError, setGpsError] = useState<string>("");

  // ✅ ACTUAL GPS HANDLER
  const handleUseGPS = () => {
    setGpsError("");

    if (!navigator.geolocation) {
      setGpsError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      () => {
        setGpsError("Unable to retrieve your location. Please allow GPS access.");
      }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-12">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Page Header */}
        <div className="mb-10">
          <h2 className="text-3xl font-semibold text-gray-800 mb-2">
            Navigation
          </h2>
          <p className="text-gray-600">
            Set your starting point and destination to get the shortest route
          </p>
        </div>

        {/* Step 1: Start Location */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-600 text-white font-semibold">
              1
            </span>
            <h3 className="text-xl font-medium text-gray-800">
              Choose Start Location
            </h3>
          </div>

          {/* ✅ pass GPS handler */}
          <StartLocationSelector onUseGPS={handleUseGPS} />


          {/* ✅ Show detected location */}
          {currentLocation && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm">
              <p className="font-medium text-green-700">
                Current Location Detected
              </p>
              <p className="text-green-600">
                Latitude: {currentLocation.latitude.toFixed(6)}, Longitude:{" "}
                {currentLocation.longitude.toFixed(6)}
              </p>
            </div>
          )}
          

          {/* ❌ GPS error */}
          {gpsError && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
              {gpsError}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="flex items-center my-10">
          <div className="flex-grow h-px bg-gray-300" />
          <span className="mx-4 text-gray-500 text-sm">then</span>
          <div className="flex-grow h-px bg-gray-300" />
        </div>

        {/* Step 2: Destination */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-600 text-white font-semibold">
              2
            </span>
            <h3 className="text-xl font-medium text-gray-800">
              Select Destination
            </h3>
          </div>

          <DestinationSearch />
        </div>
      </div>
    </div>
  );
};

export default Navigation;

const StartLocationSelector: React.FC = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md mb-6">
      <h3 className="text-lg font-medium mb-4">Start Location</h3>

      <div className="flex gap-4">
        <button className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition">
          📡 Use GPS
        </button>
        <button className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition">
          📷 Scan QR Code
        </button>
      </div>
    </div>
  );
};

export default StartLocationSelector;

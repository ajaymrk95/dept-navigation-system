interface StartLocationSelectorProps {
  onUseGPS: () => void;
}

const StartLocationSelector: React.FC<StartLocationSelectorProps> = ({ onUseGPS }) => {
  return (
    <>
      <style>{`
        .sls-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .sls-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          border-radius: 8px;
          border: 1.5px solid rgba(246, 231, 188, 0.25);
          background: transparent;
          color: #F6E7BC;
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          letter-spacing: 0.02em;
        }

        .sls-btn:hover {
          background: #0AC4E0;
          border-color: #0AC4E0;
          color: #0B2D72;
        }
      `}</style>

      <div className="sls-buttons">
        <button className="sls-btn" onClick={onUseGPS}>
          📡 Use GPS
        </button>
        <button className="sls-btn">
          📷 Scan QR Code
        </button>
        <button
          className="sls-btn"
          onClick={() => alert("Manual location selection will be implemented later.")}
        >
          📍 Manual Location
        </button>
      </div>
    </>
  );
};

export default StartLocationSelector;
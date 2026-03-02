import { useState } from "react";
import StartLocationSelector from "../MainUI/StartLocationSelector";
import DestinationSearch from "../MainUI/DestinationSearch";

const Navigation = () => {
  const [currentLocation, setCurrentLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [gpsError, setGpsError] = useState<string>("");

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
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .nav-root {
          min-height: 100vh;
          background-color: #F6E7BC;
          font-family: 'Outfit', sans-serif;
          display: flex;
          flex-direction: column;
        }

        /* ── TOP BAR ── */
        .nav-topbar {
          background-color: #0B2D72;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 40px;
        }

        .nav-logo {
          font-size: 18px;
          font-weight: 600;
          color: #F6E7BC;
          letter-spacing: 0.03em;
          text-decoration: none;
        }

        .nav-logo span {
          color: #0AC4E0;
        }

        .nav-back-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 9px 20px;
          border-radius: 8px;
          border: 1.5px solid rgba(10, 196, 224, 0.5);
          background: transparent;
          color: #0AC4E0;
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          letter-spacing: 0.02em;
        }

        .nav-back-btn:hover {
          background: #0AC4E0;
          border-color: #0AC4E0;
          color: #0B2D72;
        }

        /* ── HERO BAND ── */
        .nav-hero {
          background-color: #0992C2;
          padding: 40px 40px 36px;
          text-align: center;
        }

        .nav-eyebrow {
          display: inline-block;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(246, 231, 188, 0.7);
          margin-bottom: 10px;
        }

        .nav-title {
          font-size: clamp(26px, 3.5vw, 38px);
          font-weight: 700;
          color: #F6E7BC;
          line-height: 1.15;
          margin-bottom: 10px;
        }

        .nav-subtitle {
          font-size: 14px;
          font-weight: 300;
          color: rgba(246, 231, 188, 0.75);
          max-width: 400px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* ── STEP STRIP ── */
        .nav-step-strip {
          background-color: #0B2D72;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0;
        }

        .nav-step-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 36px;
          color: rgba(246, 231, 188, 0.5);
          font-size: 13px;
          font-weight: 400;
          border-right: 1px solid rgba(246, 231, 188, 0.1);
        }

        .nav-step-item:last-child {
          border-right: none;
        }

        .nav-step-num {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: rgba(10, 196, 224, 0.2);
          color: #0AC4E0;
          font-size: 11px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        /* ── MAIN ── */
        .nav-main {
          flex: 1;
          max-width: 720px;
          width: 100%;
          margin: 0 auto;
          padding: 48px 40px 60px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        /* ── SECTION CARD ── */
        .nav-section {
          background: #0B2D72;
          border-radius: 14px;
          padding: 32px;
        }

        .nav-section-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }

        .nav-section-num {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #0AC4E0;
          color: #0B2D72;
          font-size: 13px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .nav-section-title {
          font-size: 17px;
          font-weight: 600;
          color: #F6E7BC;
        }

        /* ── STATUS MESSAGES ── */
        .nav-status-success {
          margin-top: 16px;
          padding: 12px 16px;
          background: rgba(10, 196, 224, 0.1);
          border: 1px solid rgba(10, 196, 224, 0.3);
          border-radius: 8px;
          font-size: 13px;
        }

        .nav-status-success p:first-child {
          font-weight: 500;
          color: #0AC4E0;
          margin-bottom: 2px;
        }

        .nav-status-success p:last-child {
          color: rgba(10, 196, 224, 0.75);
          font-weight: 300;
        }

        .nav-status-error {
          margin-top: 16px;
          padding: 12px 16px;
          background: rgba(255, 80, 80, 0.08);
          border: 1px solid rgba(255, 80, 80, 0.25);
          border-radius: 8px;
          font-size: 13px;
          color: #ff6b6b;
          font-weight: 300;
        }

        /* ── DIVIDER ── */
        .nav-divider {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .nav-divider-line {
          flex: 1;
          height: 1px;
          background: rgba(11, 45, 114, 0.15);
        }

        .nav-divider-label {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(11, 45, 114, 0.35);
        }

        /* ── FOOTER ── */
        .nav-footer {
          background-color: #0B2D72;
          text-align: center;
          padding: 14px;
          font-size: 12px;
          color: rgba(246, 231, 188, 0.35);
          font-weight: 300;
          letter-spacing: 0.04em;
        }

        @media (max-width: 580px) {
          .nav-topbar { padding: 16px 20px; }
          .nav-hero { padding: 32px 20px 28px; }
          .nav-main { padding: 32px 20px 48px; }
          .nav-step-strip { flex-direction: column; }
          .nav-step-item { border-right: none; border-bottom: 1px solid rgba(246,231,188,0.1); width: 100%; justify-content: center; }
          .nav-step-item:last-child { border-bottom: none; }
        }
      `}</style>

      <div className="nav-root">

        {/* Top Bar */}
        <div className="nav-topbar">
          <div className="nav-logo">Dept<span>Nav</span>Sys</div>
          <button className="nav-back-btn" onClick={() => window.history.back()}>
            ← Back
          </button>
        </div>

        {/* Hero */}
        <div className="nav-hero">
          <span className="nav-eyebrow">Computer Science Department</span>
          <h1 className="nav-title">Start Navigation</h1>
          <p className="nav-subtitle">
            Set your starting point and destination to get the shortest indoor route.
          </p>
        </div>

        {/* Step Strip */}
        <div className="nav-step-strip">
          <div className="nav-step-item">
            <div className="nav-step-num">1</div>
            Choose Start Location
          </div>
          <div className="nav-step-item">
            <div className="nav-step-num">2</div>
            Select Destination
          </div>
        </div>

        {/* Main */}
        <div className="nav-main">

          {/* Step 1 */}
          <div className="nav-section">
            <div className="nav-section-header">
              <div className="nav-section-num">1</div>
              <div className="nav-section-title">Choose Start Location</div>
            </div>
            <StartLocationSelector onUseGPS={handleUseGPS} />
            {currentLocation && (
              <div className="nav-status-success">
                <p>📡 Current Location Detected</p>
                <p>
                  {currentLocation.latitude.toFixed(6)}, {currentLocation.longitude.toFixed(6)}
                </p>
              </div>
            )}
            {gpsError && (
              <div className="nav-status-error">⚠ {gpsError}</div>
            )}
          </div>

          {/* Divider */}
          <div className="nav-divider">
            <div className="nav-divider-line" />
            <span className="nav-divider-label">then</span>
            <div className="nav-divider-line" />
          </div>

          {/* Step 2 */}
          <div className="nav-section">
            <div className="nav-section-header">
              <div className="nav-section-num">2</div>
              <div className="nav-section-title">Select Destination</div>
            </div>
            <DestinationSearch />
          </div>

        </div>

        {/* Footer */}
        <div className="nav-footer">
          Computer Science Department · Indoor Navigation System
        </div>

      </div>
    </>
  );
};

export default Navigation;
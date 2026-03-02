import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .dns-root {
          min-height: 100vh;
          background-color: #F6E7BC;
          font-family: 'Outfit', sans-serif;
          display: flex;
          flex-direction: column;
        }

        /* ── TOP BAR ── */
        .dns-topbar {
          background-color: #0B2D72;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 40px;
        }

        .dns-logo {
          font-size: 18px;
          font-weight: 600;
          color: #F6E7BC;
          letter-spacing: 0.03em;
        }

        .dns-logo span {
          color: #0AC4E0;
        }

        .dns-admin-btn {
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

        .dns-admin-btn:hover {
          background: #0AC4E0;
          border-color: #0AC4E0;
          color: #0B2D72;
        }

        /* ── HERO BAND ── */
        .dns-hero {
          background-color: #0992C2;
          padding: 56px 40px 52px;
          text-align: center;
        }

        .dns-eyebrow {
          display: inline-block;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(246, 231, 188, 0.7);
          margin-bottom: 14px;
        }

        .dns-title {
          font-size: clamp(30px, 4.5vw, 48px);
          font-weight: 700;
          color: #F6E7BC;
          line-height: 1.15;
          margin-bottom: 16px;
        }

        .dns-subtitle {
          font-size: 15px;
          font-weight: 300;
          color: rgba(246, 231, 188, 0.8);
          max-width: 440px;
          margin: 0 auto;
          line-height: 1.7;
        }

        /* ── FEATURE STRIP ── */
        .dns-features {
          background-color: #0B2D72;
          display: flex;
          justify-content: center;
          gap: 0;
          flex-wrap: wrap;
        }

        .dns-feature {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 16px 32px;
          color: rgba(246, 231, 188, 0.75);
          font-size: 13px;
          font-weight: 400;
          border-right: 1px solid rgba(246, 231, 188, 0.1);
        }

        .dns-feature:last-child {
          border-right: none;
        }

        .dns-feature-icon {
          font-size: 16px;
        }

        /* ── MAIN CONTENT ── */
        .dns-main {
          flex: 1;
          max-width: 860px;
          width: 100%;
          margin: 0 auto;
          padding: 48px 40px 60px;
        }

        .dns-section-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #0B2D72;
          opacity: 0.5;
          margin-bottom: 20px;
        }

        /* ── ACTION CARDS ── */
        .dns-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 32px;
        }

        @media (max-width: 580px) {
          .dns-actions { grid-template-columns: 1fr; }
          .dns-topbar { padding: 16px 20px; }
          .dns-hero { padding: 40px 20px 36px; }
          .dns-main { padding: 32px 20px 48px; }
          .dns-features { flex-direction: column; }
          .dns-feature { border-right: none; border-bottom: 1px solid rgba(246,231,188,0.1); }
          .dns-feature:last-child { border-bottom: none; }
        }

        .dns-card {
          border-radius: 14px;
          padding: 32px 28px 28px;
          cursor: pointer;
          transition: transform 0.22s ease, box-shadow 0.22s ease;
          text-align: left;
          position: relative;
          border: none;
          outline: none;
        }

        .dns-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 40px rgba(11, 45, 114, 0.18);
        }

        .dns-card-map,
        .dns-card-nav {
          background: #0B2D72;
          border: 1.5px solid #0B2D72;
          transition: background 0.22s ease, border-color 0.22s ease, transform 0.22s ease, box-shadow 0.22s ease;
        }

        .dns-card-map:hover,
        .dns-card-nav:hover {
          background: #0AC4E0;
          border-color: #0AC4E0;
        }

        .dns-card-icon {
          font-size: 26px;
          margin-bottom: 18px;
          display: block;
        }

        .dns-card-title {
          font-size: 19px;
          font-weight: 600;
          margin-bottom: 8px;
          color: #ffffff;
          transition: color 0.22s ease;
        }

        .dns-card:hover .dns-card-title { color: #0B2D72; }

        .dns-card-desc {
          font-size: 13.5px;
          font-weight: 300;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.6);
          transition: color 0.22s ease;
        }

        .dns-card:hover .dns-card-desc { color: rgba(11, 45, 114, 0.7); }

        .dns-card-arrow {
          position: absolute;
          top: 28px;
          right: 28px;
          font-size: 16px;
          color: rgba(255, 255, 255, 0.35);
          transition: transform 0.2s ease, color 0.22s ease;
        }

        .dns-card:hover .dns-card-arrow {
          transform: translate(3px, -3px);
          color: rgba(11, 45, 114, 0.45);
        }

        /* ── FOOTER NOTE ── */
        .dns-footer {
          background-color: #0B2D72;
          text-align: center;
          padding: 14px;
          font-size: 12px;
          color: rgba(246, 231, 188, 0.35);
          font-weight: 300;
          letter-spacing: 0.04em;
        }
      `}</style>

      <div className="dns-root">

        {/* Top Bar */}
        <div className="dns-topbar">
          <div className="dns-logo">Dept<span>Nav</span>Sys</div>
          <button className="dns-admin-btn" onClick={() => navigate("/admin-login")}>
            🔐 Admin Login
          </button>
        </div>

        {/* Hero */}
        <div className="dns-hero">
          <span className="dns-eyebrow">Computer Science Department</span>
          <h1 className="dns-title">Department Navigation System</h1>
          <p className="dns-subtitle">
            Find faculty offices, labs, classrooms, and halls quickly and easily.
          </p>
        </div>

        {/* Feature Strip */}
        <div className="dns-features">
          <div className="dns-feature">
            <span className="dns-feature-icon">📡</span> GPS-based detection
          </div>
          <div className="dns-feature">
            <span className="dns-feature-icon">📷</span> QR indoor entry
          </div>
          <div className="dns-feature">
            <span className="dns-feature-icon">🧭</span> Shortest-path routing
          </div>
        </div>

        {/* Main Actions */}
        <div className="dns-main">
          <p className="dns-section-label">Where would you like to go?</p>
          <div className="dns-actions">

            <button className="dns-card dns-card-map" onClick={() => navigate("/map")}>
              <span className="dns-card-arrow">↗</span>
              <span className="dns-card-icon">🗺️</span>
              <div className="dns-card-title">View Department Map</div>
              <p className="dns-card-desc">
                Explore floors, entrances, corridors, and the full layout.
              </p>
            </button>

            <button className="dns-card dns-card-nav" onClick={() => navigate("/navigate")}>
              <span className="dns-card-arrow">↗</span>
              <span className="dns-card-icon">📍</span>
              <div className="dns-card-title">Start Navigation</div>
              <p className="dns-card-desc">
                Get step-by-step directions from your location to your destination.
              </p>
            </button>

          </div>
        </div>

        {/* Footer */}
        <div className="dns-footer">
          Computer Science Department · Indoor Navigation System
        </div>

      </div>
    </>
  );
};

export default Dashboard;
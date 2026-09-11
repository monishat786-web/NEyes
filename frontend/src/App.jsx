import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useApp } from './context/AppContext';
import Home from './pages/Home';
import Screening from './pages/Screening';
import History from './pages/History';
import Passport from './pages/Passport';
import { Eye, Globe, Wifi, WifiOff, Bell, X, Activity } from 'lucide-react';

export default function App() {
  const { 
    language, 
    setLanguage, 
    t, 
    isOnline, 
    toggleOnline, 
    showReminder, 
    setShowReminder 
  } = useApp();

  const location = useLocation();

  return (
    <div className="app-container">
      {/* Header / Navbar */}
      <header className="navbar">
        <div className="nav-brand">
          <div className="nav-logo">
            <Eye size={24} color="#ffffff" />
          </div>
          <div>
            <div className="nav-title">{t.appTitle}</div>
            <div style={{ fontSize: '0.75rem', opacity: 0.85, fontWeight: 500 }}>
              {t.appSubtitle}
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="nav-links">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            {t.navHome}
          </Link>
          <Link 
            to="/screening" 
            className={`nav-link ${location.pathname === '/screening' ? 'active' : ''}`}
          >
            {t.navScreening}
          </Link>
          <Link 
            to="/history" 
            className={`nav-link ${location.pathname === '/history' ? 'active' : ''}`}
          >
            {t.navHistory}
          </Link>
          <Link 
            to="/passport" 
            className={`nav-link ${location.pathname === '/passport' ? 'active' : ''}`}
          >
            {t.navPassport}
          </Link>
        </nav>

        {/* Controls: Language Selector & Network Sync Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Language Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: 'var(--primary-50)', padding: '0.35rem 0.6rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <Globe size={16} color="var(--primary-600)" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              style={{
                border: 'none',
                background: 'transparent',
                fontSize: '0.85rem',
                fontWeight: 700,
                color: 'var(--text-dark)',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="en">English (EN)</option>
              <option value="ta">தமிழ் (TA)</option>
              <option value="hi">हिंदी (HI)</option>
              <option value="te">తెలుగు (TE)</option>
            </select>
          </div>

          {/* Network Sync Toggle */}
          <button
            onClick={toggleOnline}
            className={`online-toggle ${isOnline ? 'online' : 'offline'}`}
            title={t.toggleOffline}
          >
            {isOnline ? <Wifi size={14} /> : <WifiOff size={14} />}
            <span>{isOnline ? t.online : t.offline}</span>
          </button>
        </div>
      </header>

      {/* Reminder Banner */}
      {showReminder && (
        <div className="reminder-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Bell size={18} />
            <span><strong>Screening Schedule Notice:</strong> {t.reminderMsg}</span>
          </div>
          <button className="reminder-close" onClick={() => setShowReminder(false)}>
            <X size={16} />
            <span>{t.dismiss}</span>
          </button>
        </div>
      )}

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '2rem 0' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/screening" element={<Screening />} />
          <Route path="/history" element={<History />} />
          <Route path="/passport" element={<Passport />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '1.5rem 0',
        borderTop: '1px solid var(--border-color)',
        color: 'var(--text-light)',
        fontSize: '0.85rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
          <Activity size={16} color="var(--primary-600)" />
          <strong>NEyes AI Screening Platform</strong>
        </div>
        <p style={{ margin: 0 }}>Designed for preliminary diabetic retinopathy screening & clinical support.</p>
      </footer>
    </div>
  );
}

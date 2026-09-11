import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useApp } from './context/AppContext';
import Home from './pages/Home';
import Screening from './pages/Screening';
import History from './pages/History';
import Passport from './pages/Passport';
import Guide from './pages/Guide';
import { 
  Eye, 
  Home as HomeIcon, 
  Activity, 
  History as HistoryIcon, 
  FileText, 
  BookOpen, 
  Globe, 
  Wifi, 
  WifiOff, 
  Bell, 
  X, 
  Menu 
} from 'lucide-react';

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const navItems = [
    { path: '/', label: t.navHome, icon: HomeIcon },
    { path: '/screening', label: t.navScreening, icon: Activity },
    { path: '/history', label: t.navHistory, icon: HistoryIcon },
    { path: '/passport', label: t.navPassport, icon: FileText },
    { path: '/guide', label: t.navGuide || 'App Guide', icon: BookOpen },
  ];

  return (
    <div className="app-layout">
      {/* Mobile Top Header (hidden on desktop) */}
      <div className="mobile-header">
        <div className="mobile-brand">
          <div className="nav-logo">
            <Eye size={22} color="#F5EBDD" />
          </div>
          <span className="mobile-title">{t.appTitle}</span>
        </div>
        <button 
          className="mobile-toggle-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div className="sidebar-backdrop" onClick={closeMobileMenu}></div>
      )}

      {/* Fixed Left Navigation Sidebar */}
      <aside className={`sidebar ${mobileMenuOpen ? 'open' : ''}`}>
        {/* Brand Header */}
        <div className="sidebar-brand">
          <div className="nav-logo">
            <Eye size={26} color="#F5EBDD" />
          </div>
          <div>
            <div className="nav-title">{t.appTitle}</div>
            <div className="nav-subtitle">{t.appSubtitle}</div>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="sidebar-nav-heading">Clinical Navigation</div>
        <nav className="sidebar-links">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`sidebar-link ${isActive ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                <IconComponent size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer Controls */}
        <div className="sidebar-footer">
          <div className="sidebar-control-group">
            {/* Language Selector */}
            <div className="sidebar-lang-box">
              <Globe size={16} color="#D8C7AE" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="sidebar-select"
              >
                <option value="en">English (EN)</option>
                <option value="ta">தமிழ் (TA)</option>
                <option value="hi">हिंदी (HI)</option>
                <option value="te">తెలుగు (TE)</option>
              </select>
            </div>

            {/* Network Sync Button */}
            <button
              onClick={toggleOnline}
              className={`sidebar-sync-btn ${isOnline ? 'online' : 'offline'}`}
              title={t.toggleOffline}
            >
              {isOnline ? <Wifi size={16} /> : <WifiOff size={16} />}
              <span>{isOnline ? t.online : t.offline}</span>
            </button>
          </div>

          <div className="sidebar-system-note">
            Protocol Standard v1.0
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="app-main-wrapper">
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

        {/* Dynamic Page Views */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/screening" element={<Screening />} />
            <Route path="/history" element={<History />} />
            <Route path="/passport" element={<Passport />} />
            <Route path="/guide" element={<Guide />} />
          </Routes>
        </main>

        {/* Global Footer */}
        <footer className="app-footer">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
            <Activity size={16} color="#D8C7AE" />
            <strong>NEyes AI Screening Platform</strong>
          </div>
          <p style={{ margin: 0 }}>Designed for preliminary diabetic retinopathy screening & clinical decision support.</p>
        </footer>
      </div>
    </div>
  );
}

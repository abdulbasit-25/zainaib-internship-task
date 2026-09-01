import React, { useState } from "react";
import {
  Bell,
  ChevronDown,
  Menu,
  MoonStar,
  Search,
  Sparkles,
  SunMedium,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

/**
 * Navbar - Premium enterprise top navigation
 */
export const Navbar = ({ title, onMenuClick, isLive, isDark, onToggleTheme }) => {
  const { user } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <nav className="navbar">
      {/* Left — Navigation + Page Identity */}
      <div className="navbar-left">
        <button
          className="menu-btn"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <Menu size={19} strokeWidth={2} />
        </button>

        <div className="navbar-heading">
          <div className="navbar-kicker-row">
            <span className="navbar-kicker">Workspace</span>
          </div>

          <h1 className="navbar-title">{title}</h1>
        </div>
      </div>

      {/* Center — Search */}
      <div className="navbar-center">
        <div className="search-box">
          <Search size={17} strokeWidth={2} className="search-icon" />

          <input
            type="text"
            placeholder="Search anything..."
            aria-label="Search"
          />
        </div>
      </div>

      {/* Right — Status, Theme, Notifications, Profile */}
      <div className="navbar-right">
        {isLive && (
          <div className="live-indicator">
            <span className="live-dot" />
            <span className="live-text">Live</span>
          </div>
        )}

        <button
          type="button"
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDark ? <SunMedium size={18} /> : <MoonStar size={18} />}
        </button>

        {/* Notifications */}
        <div className="notification-container">
          <button
            className={`notification-btn ${showNotifications ? "active" : ""}`}
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notifications"
            aria-expanded={showNotifications}
          >
            <Bell size={18} strokeWidth={2} />
            <span className="notification-badge">3</span>
          </button>

          {showNotifications && (
            <div className="notification-dropdown">
              <div className="notification-header">
                <div>
                  <span className="notification-kicker">Activity</span>
                  <h3>Notifications</h3>
                </div>

                <span className="notification-count">3 new</span>
              </div>

              <div className="notification-list">
                <div className="notification-item">
                  <div className="notification-icon transaction">$</div>

                  <div>
                    <p>New transaction from John Smith</p>
                    <span className="notification-time">2 minutes ago</span>
                  </div>
                </div>

                <div className="notification-item">
                  <div className="notification-icon warning">!</div>

                  <div>
                    <p>Low stock alert for Support Package</p>
                    <span className="notification-time">15 minutes ago</span>
                  </div>
                </div>

                <div className="notification-item">
                  <div className="notification-icon system">✓</div>

                  <div>
                    <p>System backup completed</p>
                    <span className="notification-time">1 hour ago</span>
                  </div>
                </div>
              </div>

              <button className="view-notifications">
                View all notifications
                <span>→</span>
              </button>
            </div>
          )}
        </div>

        {/* Profile */}
        <button className="user-profile" type="button">
          <div className="avatar-wrap">
            <img
              src={user?.avatar}
              alt={user?.name || "User"}
              className="avatar"
            />

            <span className="avatar-status" />
          </div>

          <div className="user-info">
            <p className="user-name">{user?.name}</p>
            <p className="user-role">{user?.role}</p>
          </div>

          <ChevronDown size={15} strokeWidth={2} className="profile-chevron" />

          <Sparkles size={12} strokeWidth={2} className="profile-accent" />
        </button>
      </div>
    </nav>
  );
};

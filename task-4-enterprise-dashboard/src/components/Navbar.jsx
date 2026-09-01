import React, { useState } from "react";
import { Bell, Menu, Search, Sparkles } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

/**
 * Navbar - Top navigation bar
 */
export const Navbar = ({ title, onMenuClick, isLive }) => {
  const { user } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button
          className="menu-btn"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <Menu size={18} />
        </button>
        <div className="navbar-heading">
          <p className="navbar-kicker">Overview</p>
          <h1 className="navbar-title">{title}</h1>
        </div>
      </div>

      <div className="navbar-center">
        <div className="search-box">
          <Search size={16} className="search-icon" />
          <input type="text" placeholder="Search reports, users, orders..." />
        </div>
      </div>

      <div className="navbar-right">
        {isLive && (
          <div className="live-indicator">
            <span className="live-dot"></span>
            <span className="live-text">Live</span>
          </div>
        )}

        <div className="notification-container">
          <button
            className="notification-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notifications"
          >
            <Bell size={18} />
            <span className="notification-badge">3</span>
          </button>
          {showNotifications && (
            <div className="notification-dropdown">
              <div className="notification-item">
                <p>New transaction from John Smith</p>
                <span className="notification-time">2 minutes ago</span>
              </div>
              <div className="notification-item">
                <p>Low stock alert for Support Package</p>
                <span className="notification-time">15 minutes ago</span>
              </div>
              <div className="notification-item">
                <p>System backup completed</p>
                <span className="notification-time">1 hour ago</span>
              </div>
            </div>
          )}
        </div>

        <div className="user-profile">
          <div className="avatar-wrap">
            <img src={user?.avatar} alt={user?.name} className="avatar" />
          </div>
          <div className="user-info">
            <p className="user-name">{user?.name}</p>
            <p className="user-role">{user?.role}</p>
          </div>
          <Sparkles size={14} className="profile-accent" />
        </div>
      </div>
    </nav>
  );
};

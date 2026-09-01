import React, { useEffect, useRef, useState } from "react";
import {
  Bell,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  Menu,
  MoonStar,
  Search,
  Sparkles,
  SunMedium,
  TriangleAlert,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

const notifications = [
  {
    id: 1,
    type: "transaction",
    icon: <CircleDollarSign size={16} />,
    text: "New transaction from John Smith",
    time: "2 minutes ago",
  },
  {
    id: 2,
    type: "warning",
    icon: <TriangleAlert size={16} />,
    text: "Low stock alert for Support Package",
    time: "15 minutes ago",
  },
  {
    id: 3,
    type: "system",
    icon: <CheckCircle2 size={16} />,
    text: "System backup completed",
    time: "1 hour ago",
  },
];

/**
 * Navbar - Premium enterprise top navigation
 */
export const Navbar = ({
  title,
  onMenuClick,
  isLive,
  theme,
  onToggleTheme,
}) => {
  const { user } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);

  // Close the dropdown on outside click or Escape
  useEffect(() => {
    if (!showNotifications) return;

    const handleClickOutside = (e) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target)
      ) {
        setShowNotifications(false);
      }
    };

    const handleEscape = (e) => {
      if (e.key === "Escape") setShowNotifications(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [showNotifications]);

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

      {/* Right — Status, Notifications, Profile */}
      <div className="navbar-right">
        {isLive && (
          <div className="live-indicator">
            <span className="live-dot" />
            <span className="live-text">Live</span>
          </div>
        )}

        {/* Notifications */}
        <div className="notification-container" ref={notificationRef}>
          <button
            className={`notification-btn ${showNotifications ? "active" : ""}`}
            onClick={() => setShowNotifications((prev) => !prev)}
            aria-label="Notifications"
            aria-expanded={showNotifications}
          >
            <Bell size={18} strokeWidth={2} />
            {notifications.length > 0 && (
              <span className="notification-badge">{notifications.length}</span>
            )}
          </button>

          {showNotifications && (
            <div className="notification-dropdown">
              <div className="notification-header">
                <div>
                  <span className="notification-kicker">Activity</span>
                  <h3>Notifications</h3>
                </div>

                <span className="notification-count">
                  {notifications.length} new
                </span>
              </div>

              <div className="notification-list">
                {notifications.map((n) => (
                  <div className="notification-item" key={n.id}>
                    <div className={`notification-icon ${n.type}`}>
                      {n.icon}
                    </div>

                    <div>
                      <p>{n.text}</p>
                      <span className="notification-time">{n.time}</span>
                    </div>
                  </div>
                ))}
              </div>

              <button className="view-notifications">
                View all notifications
              </button>
            </div>
          )}
        </div>

        <button
          type="button"
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label="Toggle theme"
          title={
            theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
          }
        >
          {theme === "dark" ? (
            <SunMedium size={18} strokeWidth={2} />
          ) : (
            <MoonStar size={18} strokeWidth={2} />
          )}
        </button>

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

import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  BarChart3,
  ChevronRight,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Package,
  Settings,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import "./Sidebar.css";

/**
 * Sidebar - Premium enterprise dashboard navigation
 */
export const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const menuItems = [
    {
      label: "Dashboard",
      description: "Overview",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Analytics",
      description: "Insights & reports",
      path: "/analytics",
      icon: BarChart3,
    },
    {
      label: "Users",
      description: "Manage accounts",
      path: "/users",
      icon: Users,
    },
    {
      label: "Products",
      description: "Inventory & catalog",
      path: "/products",
      icon: Package,
    },
    {
      label: "Transactions",
      description: "Payments & activity",
      path: "/transactions",
      icon: CreditCard,
    },
  ];

  const settingsItem = {
    label: "Settings",
    description: "System preferences",
    path: "/settings",
    icon: Settings,
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  // Close the mobile sidebar on Escape, matching the navbar dropdown behavior
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, setIsOpen]);

  return (
    <>
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        {/* Brand Header */}
        <div className="sidebar-header">
          <button
            className="brand"
            onClick={() => handleNavigation("/dashboard")}
            aria-label="Go to dashboard"
          >
            <span className="brand-mark">
              <Sparkles size={18} strokeWidth={2.2} />
            </span>

            <span className="brand-copy">
              <span className="brand-name">NovaOps</span>
              <span className="brand-subtitle">Enterprise Control</span>
            </span>
          </button>

          <button
            className="close-btn"
            onClick={() => setIsOpen(false)}
            aria-label="Close navigation"
          >
            <X size={18} strokeWidth={2} />
          </button>
        </div>

        {/* Scrollable navigation area */}
        <div className="sidebar-content">
          <div className="nav-section">
            <div className="nav-section-heading">
              <span>Workspace</span>
            </div>

            <nav className="sidebar-nav" aria-label="Primary navigation">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);

                return (
                  <button
                    key={item.path}
                    className={`nav-link ${active ? "active" : ""}`}
                    onClick={() => handleNavigation(item.path)}
                    aria-current={active ? "page" : undefined}
                  >
                    <span className="nav-icon">
                      <Icon size={18} strokeWidth={active ? 2.2 : 1.9} />
                    </span>

                    <span className="nav-copy">
                      <span className="nav-label">{item.label}</span>

                      <span className="nav-description">
                        {item.description}
                      </span>
                    </span>

                    <ChevronRight size={15} className="nav-arrow" />
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Settings */}
          <div className="nav-section nav-section-settings">
            <div className="nav-section-heading">
              <span>System</span>
            </div>

            <button
              className={`nav-link ${
                isActive(settingsItem.path) ? "active" : ""
              }`}
              onClick={() => handleNavigation(settingsItem.path)}
              aria-current={isActive(settingsItem.path) ? "page" : undefined}
            >
              <span className="nav-icon">
                <Settings
                  size={18}
                  strokeWidth={isActive(settingsItem.path) ? 2.2 : 1.9}
                />
              </span>

              <span className="nav-copy">
                <span className="nav-label">{settingsItem.label}</span>

                <span className="nav-description">
                  {settingsItem.description}
                </span>
              </span>

              <ChevronRight size={15} className="nav-arrow" />
            </button>
          </div>
        </div>

        {/* Bottom Area — stays fixed while nav above scrolls */}
        <div className="sidebar-bottom">
          <div className="creator-card">
            <div className="creator-icon">
              <Sparkles size={13} />
            </div>

            <div className="creator-copy">
              <span>Designed & built by</span>
              <strong>Zainab</strong>
            </div>
          </div>

          <button className="logout-btn" onClick={handleLogout}>
            <span className="logout-icon">
              <LogOut size={16} strokeWidth={2} />
            </span>

            <span>Sign out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};

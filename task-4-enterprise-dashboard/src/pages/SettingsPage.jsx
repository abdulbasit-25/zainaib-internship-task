import React, { useState } from "react";
import { AdminLayout } from "../layouts/AdminLayout";
import "./SettingsPage.css";

/**
 * SettingsPage - User settings and preferences
 */
export const SettingsPage = () => {
  const [settings, setSettings] = useState({
    profileName: "Admin User",
    email: "admin@progree.com",
    notifications: true,
    emailAlerts: true,
    darkMode: false,
    language: "English",
  });

  const handleChange = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    alert("Settings saved successfully!");
  };

  return (
    <AdminLayout title="Settings">
      <div className="settings-page">
        <div className="settings-container">
          {/* Profile Section */}
          <div className="settings-section">
            <h2 className="section-title">👤 Profile Settings</h2>
            <div className="settings-form">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={settings.profileName}
                  onChange={(e) => handleChange("profileName", e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
            </div>
          </div>

          {/* Notification Section */}
          <div className="settings-section">
            <h2 className="section-title">🔔 Notifications</h2>
            <div className="settings-form">
              <div className="form-group checkbox">
                <label>
                  <input
                    type="checkbox"
                    checked={settings.notifications}
                    onChange={(e) =>
                      handleChange("notifications", e.target.checked)
                    }
                  />
                  <span>Enable all notifications</span>
                </label>
              </div>
              <div className="form-group checkbox">
                <label>
                  <input
                    type="checkbox"
                    checked={settings.emailAlerts}
                    onChange={(e) =>
                      handleChange("emailAlerts", e.target.checked)
                    }
                  />
                  <span>Email alerts for important events</span>
                </label>
              </div>
            </div>
          </div>

          {/* Preferences Section */}
          <div className="settings-section">
            <h2 className="section-title">⚙️ Preferences</h2>
            <div className="settings-form">
              <div className="form-group checkbox">
                <label>
                  <input
                    type="checkbox"
                    checked={settings.darkMode}
                    onChange={(e) => handleChange("darkMode", e.target.checked)}
                  />
                  <span>Enable dark mode</span>
                </label>
              </div>
              <div className="form-group">
                <label>Language</label>
                <select
                  value={settings.language}
                  onChange={(e) => handleChange("language", e.target.value)}
                >
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                </select>
              </div>
            </div>
          </div>

          {/* Security Section */}
          <div className="settings-section">
            <h2 className="section-title">🔒 Security</h2>
            <div className="security-info">
              <p>
                <strong>Password:</strong> Last changed 3 months ago
              </p>
              <button className="btn-secondary">Change Password</button>
            </div>
            <div className="security-info">
              <p>
                <strong>Two-Factor Authentication:</strong> Not enabled
              </p>
              <button className="btn-secondary">Enable 2FA</button>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="settings-section danger-zone">
            <h2 className="section-title">⚠️ Danger Zone</h2>
            <div className="danger-actions">
              <button className="btn-danger">Delete Account</button>
              <p>Once you delete your account, there is no going back.</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="settings-actions">
            <button className="btn-primary" onClick={handleSave}>
              Save Changes
            </button>
            <button className="btn-secondary">Discard</button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

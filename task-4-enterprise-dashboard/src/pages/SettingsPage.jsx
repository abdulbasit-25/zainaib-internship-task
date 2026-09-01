import React, { useState } from "react";
import {
  User,
  Bell,
  SlidersHorizontal,
  Lock,
  AlertTriangle,
  Check,
} from "lucide-react";
import { AdminLayout } from "../layouts/AdminLayout";
import "./SettingsPage.css";

const initialSettings = {
  profileName: "Admin User",
  email: "zainab@admin.com",
  notifications: true,
  emailAlerts: true,
  darkMode: false,
  language: "English",
};

/**
 * SettingsPage - User settings and preferences
 */
export const SettingsPage = () => {
  const [saved, setSaved] = useState(initialSettings);
  const [settings, setSettings] = useState(initialSettings);
  const [saveState, setSaveState] = useState("idle"); // idle | saved
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const isDirty = JSON.stringify(saved) !== JSON.stringify(settings);

  const handleChange = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
    if (saveState === "saved") setSaveState("idle");
  };

  const handleSave = () => {
    setSaved(settings);
    setSaveState("saved");
    setTimeout(() => setSaveState("idle"), 2500);
  };

  const handleDiscard = () => {
    setSettings(saved);
  };

  const handleDeleteClick = () => {
    if (!confirmingDelete) {
      setConfirmingDelete(true);
      return;
    }
    // Actual delete logic would go here.
    setConfirmingDelete(false);
  };

  return (
    <AdminLayout title="Settings">
      <div className="settings-page">
        <div className="settings-container">
          {/* Profile Section */}
          <section className="settings-section">
            <h2 className="section-title">
              <span className="section-icon">
                <User size={16} />
              </span>
              Profile settings
            </h2>
            <div className="settings-form">
              <div className="form-group">
                <label htmlFor="profileName">Full name</label>
                <input
                  id="profileName"
                  type="text"
                  value={settings.profileName}
                  onChange={(e) => handleChange("profileName", e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  id="email"
                  type="email"
                  value={settings.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
            </div>
          </section>

          {/* Notification Section */}
          <section className="settings-section">
            <h2 className="section-title">
              <span className="section-icon">
                <Bell size={16} />
              </span>
              Notifications
            </h2>
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
          </section>

          {/* Preferences Section */}
          <section className="settings-section">
            <h2 className="section-title">
              <span className="section-icon">
                <SlidersHorizontal size={16} />
              </span>
              Preferences
            </h2>
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
                <label htmlFor="language">Language</label>
                <select
                  id="language"
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
          </section>

          {/* Security Section */}
          <section className="settings-section">
            <h2 className="section-title">
              <span className="section-icon">
                <Lock size={16} />
              </span>
              Security
            </h2>
            <div className="security-info">
              <p>
                <strong>Password</strong>
                <span className="security-meta">Last changed 3 months ago</span>
              </p>
              <button type="button" className="btn-secondary">
                Change password
              </button>
            </div>
            <div className="security-info">
              <p>
                <strong>Two-factor authentication</strong>
                <span className="security-meta">Not enabled</span>
              </p>
              <button type="button" className="btn-secondary">
                Enable 2FA
              </button>
            </div>
          </section>

          {/* Danger Zone */}
          <section className="settings-section danger-zone">
            <h2 className="section-title">
              <span className="section-icon section-icon--danger">
                <AlertTriangle size={16} />
              </span>
              Danger zone
            </h2>
            <div className="danger-actions">
              <button
                type="button"
                className={`btn-danger ${confirmingDelete ? "btn-danger--confirm" : ""}`}
                onClick={handleDeleteClick}
                onBlur={() => setConfirmingDelete(false)}
              >
                {confirmingDelete ? "Click again to confirm" : "Delete account"}
              </button>
              <p>Once you delete your account, there is no going back.</p>
            </div>
          </section>

          {/* Action Buttons */}
          <div className="settings-actions">
            {saveState === "saved" && (
              <span className="save-confirmation">
                <Check size={14} />
                Saved
              </span>
            )}
            <button
              type="button"
              className="btn-secondary"
              onClick={handleDiscard}
              disabled={!isDirty}
            >
              Discard
            </button>
            <button
              type="button"
              className="btn-primary"
              onClick={handleSave}
              disabled={!isDirty}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

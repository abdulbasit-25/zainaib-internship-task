import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart3, LockKeyhole, Mail } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import "./LoginPage.css";

/**
 * LoginPage - Authentication page
 * Demo credentials:
 * - zainab@admin.com / z@inab*#56
 * - demo@user.com / Dem@786-12
 */
export const LoginPage = () => {
  const [email, setEmail] = useState("zainab@admin.com");
  const [password, setPassword] = useState("z@inab*#56");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await login(email, password);
      if (result.success) {
        navigate("/dashboard");
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-shell">
        {/* Left: brand / live-status panel */}
        <aside className="login-visual">
          <div className="visual-top">
            <div className="visual-brand">
              <span className="brand-mark">
                <BarChart3 size={20} />
              </span>
              <span className="brand-name">NovaOps</span>
            </div>

            <h1 className="visual-heading">
              Every deployment, incident, and metric on one screen.
            </h1>
            <p className="visual-sub">
              NovaOps gives operations teams a live read on infrastructure
              health, without switching tools.
            </p>
          </div>

          <div className="status-panel">
            <div className="status-row">
              <span className="status-dot" />
              <span>All systems operational</span>
            </div>

            <div className="metric-grid">
              <div className="metric">
                <span className="metric-label">Uptime</span>
                <span className="metric-value">99.98%</span>
              </div>
              <div className="metric">
                <span className="metric-label">Open incidents</span>
                <span className="metric-value">0</span>
              </div>
              <div className="metric">
                <span className="metric-label">Deploys today</span>
                <span className="metric-value">12</span>
              </div>
            </div>

            <svg
              className="spark"
              viewBox="0 0 240 60"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polyline points="0,42 20,37 40,44 60,30 80,34 100,20 120,26 140,15 160,21 180,11 200,17 220,6 240,13" />
            </svg>
          </div>

          <p className="visual-credit">Made by Zainab</p>
        </aside>

        {/* Right: login form */}
        <main className="login-panel">
          <div className="login-panel-inner">
            <div className="login-header">
              <h2>Log in to NovaOps</h2>
              <p>Enter your credentials to reach the dashboard.</p>
            </div>

            <form className="login-form" onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="email">
                  <Mail size={14} />
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">
                  <LockKeyhole size={14} />
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  disabled={isLoading}
                />
              </div>

              {error && (
                <div className="error-message" role="alert">
                  {error}
                </div>
              )}

              <button type="submit" className="login-btn" disabled={isLoading}>
                {isLoading ? "Logging in…" : "Log in"}
              </button>
            </form>

            <div className="demo-credentials">
              <h3>Demo access</h3>
              <div className="credential-item">
                <span className="credential-role">Admin</span>
                <code>zainab@admin.com · z@inab*#56</code>
              </div>
              <div className="credential-item">
                <span className="credential-role">Demo</span>
                <code>demo@user.com · Dem@786-12</code>
              </div>
            </div>

            <p className="disclaimer">
              Frontend simulation only — authentication is handled in the
              browser via local storage.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart3,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import "./LoginPage.css";

/**
 * LoginPage - Authentication page
 * Demo credentials:
 * - zainab@admin.com / zainab1234
 * - demo@progree.com / Demo123!
 */
export const LoginPage = () => {
  const [email, setEmail] = useState("zainab@admin.com");
  const [password, setPassword] = useState("zainab1234");
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
      <div className="login-container">
        <div className="login-header">
          <div className="login-logo">
            <span className="logo-icon">
              <BarChart3 size={24} />
            </span>
            <span className="logo-text">NovaOps</span>
          </div>
          <p className="login-subtitle">Enterprise Dashboard Portal</p>
        </div>

        <div className="login-trust">
          <ShieldCheck size={16} />
          Secure operational access
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">
              <Mail size={14} />
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
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

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-btn" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="demo-credentials">
          <h4>
            <Sparkles size={14} />
            Demo Credentials
          </h4>
          <div className="credential-item">
            <p>
              <strong>Admin Account:</strong>
            </p>
            <p>Email: zainab@admin.com</p>
            <p>Password: zainab1234</p>
          </div>
          <div className="credential-item">
            <p>
              <strong>Demo Account:</strong>
            </p>
            <p>Email: demo@progree.com</p>
            <p>Password: Demo123!</p>
          </div>
        </div>

        <div className="login-footer">
          <p className="disclaimer">
            This is a frontend simulation for demonstration purposes only.
            Authentication is simulated in the browser using local storage.
          </p>
        </div>
      </div>
    </div>
  );
};

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import * as authService from "../services/authService";

/**
 * AuthContext - Manages authentication state across the application
 * Provides login, logout, token validation, and user information
 */
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check for existing token on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("authToken");
    if (savedToken && authService.validateToken(savedToken)) {
      setToken(savedToken);
      const userData = authService.getCurrentUser(savedToken);
      setUser(userData);
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = authService.login(email, password);
      if (result.success) {
        setToken(result.token);
        setUser(result.user);
        localStorage.setItem("authToken", result.token);
        return result;
      } else {
        setError(result.message);
        return result;
      }
    } catch (err) {
      const errorMsg = err.message || "Login failed";
      setError(errorMsg);
      return { success: false, message: errorMsg };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    setError(null);
    localStorage.removeItem("authToken");
  }, []);

  const isAuthenticated = () => {
    return token !== null && authService.validateToken(token);
  };

  const value = {
    user,
    token,
    isLoading,
    error,
    login,
    logout,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * useAuth hook - Provides access to authentication context
 * Usage: const { user, login, logout, isAuthenticated } = useAuth()
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

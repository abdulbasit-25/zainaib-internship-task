/**
 * Auth Service - Handles authentication logic
 * IMPORTANT: This is a FRONTEND SIMULATION for demonstration purposes.
 * In production, use a real backend authentication service.
 */

// Mock credentials for demonstration
const MOCK_CREDENTIALS = {
  "zainab@admin.com": "zainab1234",
  "demo@progree.com": "Demo123!",
};

// Token expiration time (24 hours)
const TOKEN_EXPIRATION = 24 * 60 * 60 * 1000;

/**
 * Generate a simulated JWT-like token
 * DISCLAIMER: This is NOT a real JWT and NOT production-grade
 */
function generateToken(userId, role, email) {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = btoa(
    JSON.stringify({
      userId,
      role,
      email,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + TOKEN_EXPIRATION / 1000,
    }),
  );
  const signature = btoa("SIMULATED_SIGNATURE_NOT_SECURE");
  return `${header}.${payload}.${signature}`;
}

/**
 * Decode the simulated token
 */
function decodeToken(token) {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const payload = JSON.parse(atob(parts[1]));
    return payload;
  } catch (err) {
    return null;
  }
}

/**
 * Login - Simulated authentication
 * DISCLAIMER: This is a FRONTEND SIMULATION
 */
export function login(email, password) {
  // Simulate network delay
  if (!email || !password) {
    return {
      success: false,
      message: "Email and password are required",
    };
  }

  // Check credentials
  if (MOCK_CREDENTIALS[email] && MOCK_CREDENTIALS[email] === password) {
    const userId = email === "zainab@admin.com" ? "user-001" : "user-002";
    const role = email === "zainab@admin.com" ? "admin" : "user";
    const token = generateToken(userId, role, email);

    return {
      success: true,
      token,
      user: {
        id: userId,
        email,
        name: email === "zainab@admin.com" ? "Admin User" : "Demo User",
        role,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(email)}&background=0D8ABC&color=fff`,
      },
    };
  }

  return {
    success: false,
    message:
      "Invalid email or password. Try zainab@admin.com / zainab1234 or demo@progree.com / Demo123!",
  };
}

/**
 * Logout - Clear authentication
 */
export function logout() {
  localStorage.removeItem("authToken");
  return { success: true };
}

/**
 * Validate token - Check if token exists and is not expired
 */
export function validateToken(token) {
  if (!token) return false;

  const payload = decodeToken(token);
  if (!payload) return false;

  // Check expiration
  const now = Math.floor(Date.now() / 1000);
  if (payload.exp < now) return false;

  return true;
}

/**
 * Get current user from token
 */
export function getCurrentUser(token) {
  if (!validateToken(token)) return null;

  const payload = decodeToken(token);
  if (!payload) return null;

  // Build user object from token payload
  return {
    id: payload.userId,
    email: payload.email,
    role: payload.role,
    name: payload.email === "zainab@admin.com" ? "Admin User" : "Demo User",
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(payload.email)}&background=0D8ABC&color=fff`,
  };
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated() {
  const token = localStorage.getItem("authToken");
  return validateToken(token);
}

/**
 * Get token from storage
 */
export function getToken() {
  return localStorage.getItem("authToken");
}

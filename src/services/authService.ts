import {
  setIsAuthenticated,
  setUser,
  authToken,
  setAuthToken,
  setShowLoginForm,
} from "../components/global/globalState";
import { User, ApiResponse } from "../types";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse
  extends ApiResponse<{
    user: User;
    token: string;
  }> {}

export class AuthService {
  private static readonly API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:3003/api";

  // Local storage keys for persistence
  private static readonly AUTH_TOKEN_KEY = "sigment_auth_token";
  private static readonly USER_DATA_KEY = "sigment_user_data";

  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await fetch(`${this.API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: AuthResponse = await response.json();

      if (data.success && data.data) {
        // Update global state using imported signals
        setIsAuthenticated(true);
        setUser(data.data.user as any);
        setAuthToken(data.data.token);
        setShowLoginForm(false);

        // Persist to localStorage
        this.saveAuthToStorage(data.data.token, data.data.user);
      }

      return data;
    } catch (error) {
      throw new Error("Failed to login. Please check your credentials.");
    }
  }

  static async getCurrentUser(): Promise<User | null> {
    if (!authToken()) {
      return null;
    }

    const response = await fetch(`${this.API_BASE_URL}/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken()}`,
      },
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    if (data.success && data.data) {
      return data.data.user;
    }

    return null;
  }

  static async logout(): Promise<void> {
    setIsAuthenticated(false);
    setUser(null);
    setAuthToken("");
    setShowLoginForm(false);
    this.clearAuthFromStorage();
  }

  static async getAuthToken(): Promise<string> {
    return authToken();
  }

  // localStorage helper methods
  private static saveAuthToStorage(token: string, user: User): void {
    try {
      localStorage.setItem(this.AUTH_TOKEN_KEY, token);
      localStorage.setItem(this.USER_DATA_KEY, JSON.stringify(user));
    } catch (error) {
      console.warn("Failed to save auth data to localStorage:", error);
    }
  }

  private static clearAuthFromStorage(): void {
    try {
      localStorage.removeItem(this.AUTH_TOKEN_KEY);
      localStorage.removeItem(this.USER_DATA_KEY);
    } catch (error) {
      console.warn("Failed to clear auth data from localStorage:", error);
    }
  }

  private static loadAuthFromStorage(): { token: string; user: User } | null {
    try {
      const token = localStorage.getItem(this.AUTH_TOKEN_KEY);
      const userData = localStorage.getItem(this.USER_DATA_KEY);

      if (token && userData) {
        return {
          token,
          user: JSON.parse(userData),
        };
      }
    } catch (error) {
      console.warn("Failed to load auth data from localStorage:", error);
    }
    return null;
  }

  // Authentication state from localStorage
  static async initializeAuth(): Promise<void> {
    const authData = this.loadAuthFromStorage();

    if (authData) {
      try {
        const response = await fetch(`${this.API_BASE_URL}/auth/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authData.token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data) {
            setIsAuthenticated(true);
            setUser(data.data.user as any);
            setAuthToken(authData.token);
            return;
          }
        }
      } catch (error) {
        console.warn("Failed to verify stored auth token:", error);
      }
      this.clearAuthFromStorage();
    }
    setIsAuthenticated(false);
    setUser(null);
    setAuthToken("");
  }
}

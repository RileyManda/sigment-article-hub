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
  }

  static async getAuthToken(): Promise<string> {
    return authToken();
  }
}

import { GlobalKeys } from "../components/global/globalState";
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
  private static readonly API_BASE_URL = "http://localhost:3003/api";

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
        // Update global state
        const { signal } = await import("sigment");
        const [isAuthenticated, setIsAuthenticated] = signal(
          GlobalKeys.isAuthenticated
        );
        const [user, setUser] = signal(GlobalKeys.user);
        const [authToken, setAuthToken] = signal(GlobalKeys.authToken);
        const [showLoginForm, setShowLoginForm] = signal(
          GlobalKeys.showLoginForm
        );

        // Only update if values have changed to avoid unnecessary re-renders
        if (!isAuthenticated()) {
          setIsAuthenticated(true as any);
        }
        if (!user() || (user() as any)?.id !== data.data.user.id) {
          setUser(data.data.user as any);
        }
        if (authToken() !== data.data.token) {
          setAuthToken(data.data.token);
        }
        if (showLoginForm()) {
          setShowLoginForm(false as any);
        }
      }

      return data;
    } catch (error) {
      console.error("Login error:", error);
      throw new Error("Failed to login. Please check your credentials.");
    }
  }

  static async getCurrentUser(): Promise<User | null> {
    try {
      const { signal } = await import("sigment");
      const [authToken] = signal(GlobalKeys.authToken);

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
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.data) {
        return data.data.user;
      }

      return null;
    } catch (error) {
      console.error("Get current user error:", error);
      return null;
    }
  }

  static async logout(): Promise<void> {
    const { signal } = await import("sigment");
    const [isAuthenticated, setIsAuthenticated] = signal(
      GlobalKeys.isAuthenticated
    );
    const [user, setUser] = signal(GlobalKeys.user);
    const [authToken, setAuthToken] = signal(GlobalKeys.authToken);
    if (isAuthenticated()) {
      setIsAuthenticated(false as any);
    }
    if (user() !== null) {
      setUser(null as any);
    }
    if (authToken() !== "") {
      setAuthToken("");
    }
  }

  static async getAuthToken(): Promise<string> {
    const { signal } = await import("sigment");
    const [authToken] = signal(GlobalKeys.authToken);
    return authToken();
  }
}

import { signal } from "sigment";
export const [userName, setUserName] = signal("");
export const [userMail, setUserMail] = signal("");
export const [isAuthenticated, setIsAuthenticated] = signal(false);
export const [user, setUser] = signal(null);
export const [authToken, setAuthToken] = signal("");
export const [showLoginForm, setShowLoginForm] = signal(false);

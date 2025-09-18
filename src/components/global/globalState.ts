import { signal } from "sigment";
import type { User } from "../../types";

export const [userName, setUserName] = signal("");
export const [userMail, setUserMail] = signal("");
export const [isAuthenticated, setIsAuthenticated] = signal(false);
export const [user, setUser] = signal<User | null>(null);
export const [authToken, setAuthToken] = signal("");
export const [showLoginForm, setShowLoginForm] = signal(false);
export const [showCreateArticleForm, setShowCreateArticleForm] = signal(false);
export const [refreshArticles, setRefreshArticles] = signal(0);

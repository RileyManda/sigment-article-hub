import { createGlobalSignal, getGlobalSignal, useGlobalSignal } from "sigment";
import type { User } from "../../types";

createGlobalSignal("userName", "");
createGlobalSignal("userMail", "");
createGlobalSignal("isAuthenticated", false);
createGlobalSignal("user", null as User | null);
createGlobalSignal("authToken", "");
createGlobalSignal("showLoginForm", false);
createGlobalSignal("showCreateArticleForm", false);
createGlobalSignal("refreshArticles", 0);

export const GlobalKeys = {
  userName: "userName",
  userMail: "userMail",
  isAuthenticated: "isAuthenticated",
  user: "user",
  authToken: "authToken",
  showLoginForm: "showLoginForm",
  showCreateArticleForm: "showCreateArticleForm",
  refreshArticles: "refreshArticles",
};

export const userName = () => {
  const [value] = getGlobalSignal(GlobalKeys.userName);
  return value();
};

export const userMail = () => {
  const [value] = getGlobalSignal(GlobalKeys.userMail);
  return value();
};

export const isAuthenticated = () => {
  const [value] = getGlobalSignal(GlobalKeys.isAuthenticated);
  return value();
};

export const user = () => {
  const [value] = getGlobalSignal(GlobalKeys.user);
  return value();
};

export const authToken = () => {
  const [value] = getGlobalSignal(GlobalKeys.authToken);
  return value();
};

export const showLoginForm = () => {
  const [value] = getGlobalSignal(GlobalKeys.showLoginForm);
  return value();
};

export const showCreateArticleForm = () => {
  const [value] = getGlobalSignal(GlobalKeys.showCreateArticleForm);
  return value();
};

export const refreshArticles = () => {
  const [value] = getGlobalSignal(GlobalKeys.refreshArticles);
  return value();
};

export const setUserName = (value: string) => {
  const [, setter] = getGlobalSignal(GlobalKeys.userName);
  setter(value);
};

export const setUserMail = (value: string) => {
  const [, setter] = getGlobalSignal(GlobalKeys.userMail);
  setter(value);
};

export const setIsAuthenticated = (value: boolean) => {
  const [, setter] = getGlobalSignal(GlobalKeys.isAuthenticated);
  setter(value);
};

export const setUser = (value: User | null) => {
  const [, setter] = getGlobalSignal(GlobalKeys.user);
  setter(value);
};

export const setAuthToken = (value: string) => {
  const [, setter] = getGlobalSignal(GlobalKeys.authToken);
  setter(value);
};

export const setShowLoginForm = (value: boolean) => {
  const [, setter] = getGlobalSignal(GlobalKeys.showLoginForm);
  setter(value);
};

export const setShowCreateArticleForm = (value: boolean) => {
  const [, setter] = getGlobalSignal(GlobalKeys.showCreateArticleForm);
  setter(value);
};

export const setRefreshArticles = (value: number) => {
  const [, setter] = getGlobalSignal(GlobalKeys.refreshArticles);
  setter(value);
};

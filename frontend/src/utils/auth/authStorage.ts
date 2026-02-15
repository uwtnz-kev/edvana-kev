// utils/auth/authStorage.ts: Handles localStorage operations for tokens and user data.

import { AuthUser } from "@/types/user";

const AUTH_TOKEN_KEY = "edvana_auth_token";
const AUTH_USER_KEY = "edvana_auth_user";

// Token management
export const getStoredToken = (): string | null => localStorage.getItem(AUTH_TOKEN_KEY);
export const setStoredToken = (token: string): void => localStorage.setItem(AUTH_TOKEN_KEY, token);
export const removeStoredToken = (): void => localStorage.removeItem(AUTH_TOKEN_KEY);

// User data management
export const getStoredUser = (): AuthUser | null => {
  const userStr = localStorage.getItem(AUTH_USER_KEY);
  try {
    return userStr ? JSON.parse(userStr) : null;
  } catch {
    console.error("Failed to parse stored user");
    return null;
  }
};
export const setStoredUser = (user: AuthUser): void => {
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
};
export const removeStoredUser = (): void => localStorage.removeItem(AUTH_USER_KEY);

// Clear all
export const clearAuthData = (): void => {
  removeStoredToken();
  removeStoredUser();
};

// Quick check
export const isAuthenticated = (): boolean => !!getStoredUser();
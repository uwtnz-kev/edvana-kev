import React, { createContext, useContext, useReducer, useEffect } from "react";
import { AuthUser } from "@/types/user";
import { authAPI, RegisterRequest } from "@/utils/api/auth";
import {
  getStoredToken,
  getStoredUser,
  setStoredToken,
  setStoredUser,
  clearAuthData,
} from "@/utils/auth/authStorage";
import { isTokenExpired, getTokenPayload } from "@/utils/auth/jwt";
import { normalizeUserRole } from "@/constants/roles";
import { getUserById } from "@/utils/data/users/getUserById";

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

type AuthAction =
  | { type: "AUTH_START" }
  | { type: "AUTH_SUCCESS"; payload: { user: AuthUser; token: string } }
  | { type: "AUTH_FAILURE" }
  | { type: "LOGOUT" }
  | { type: "SET_USER"; payload: AuthUser };

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: true,
  isAuthenticated: false,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "AUTH_START":
      return { ...state, isLoading: true };
    case "AUTH_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isLoading: false,
        isAuthenticated: true,
      };
    case "AUTH_FAILURE":
      return {
        ...state,
        user: null,
        token: null,
        isLoading: false,
        isAuthenticated: false,
      };
    case "LOGOUT":
      return { ...state, user: null, token: null, isAuthenticated: false };
    case "SET_USER":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

interface AuthContextValue extends AuthState {
  login: (emailOrPhone: string, password: string) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => void;
  updateUser: (user: AuthUser) => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // 🔹 Centralized user enrichment
  const fetchUser = async (userId: string, token: string) => {
    try {
      const fullUser = await getUserById(userId);
      if (fullUser) {
        const role = normalizeUserRole(fullUser.role);
        const normalizedUser: AuthUser = { ...fullUser, role };

        setStoredUser(normalizedUser);
        dispatch({ type: "SET_USER", payload: normalizedUser });
      }
    } catch (err) {
      console.warn("⚠️ Failed to fetch user profile:", err);
    }
  };

  // 🔹 On mount: check stored auth
  useEffect(() => {
    const initAuth = async () => {
      const token = getStoredToken();
      const storedUser = getStoredUser();

      if (!token || isTokenExpired(token)) {
        dispatch({ type: "AUTH_FAILURE" });
        return;
      }

      if (!storedUser) {
        dispatch({ type: "AUTH_FAILURE" });
        return;
      }

      const role = normalizeUserRole(storedUser.role);
      if (!role) {
        dispatch({ type: "AUTH_FAILURE" });
        return;
      }

      const normalizedUser: AuthUser = { ...storedUser, role };

      dispatch({
        type: "AUTH_SUCCESS",
        payload: { user: normalizedUser, token },
      });

      // Enrich profile after bootstrap
      await fetchUser(normalizedUser.id, token);
    };

    initAuth();
  }, []);

  // 🔹 Token expiry auto-logout
  useEffect(() => {
    if (!state.token) return;

    const payload = getTokenPayload(state.token);
    if (!payload?.exp) return;

    const expMs = payload.exp > 1e12 ? payload.exp : payload.exp * 1000;
    const timeRemaining = expMs - Date.now();

    if (timeRemaining <= 0) {
      logout();
      return;
    }

    const timer = setTimeout(logout, timeRemaining);
    return () => clearTimeout(timer);
  }, [state.token]);

  // 🔹 Login
  const login = async (emailOrPhone: string, password: string) => {
    dispatch({ type: "AUTH_START" });

    const trimmed = emailOrPhone.trim();
    const isPhone = /^[+]?[\d\s\-()]+$/.test(trimmed);

    const payload = {
      ...(isPhone ? { phone: trimmed } : { email: trimmed.toLowerCase() }),
      password,
    };

    try {
      const response = await authAPI.login(payload);

      const role = normalizeUserRole(response.user.role);
      if (!role) throw new Error("Unknown or invalid role from server");

      const normalizedUser: AuthUser = { ...response.user, role };

      if (response.token) setStoredToken(response.token);
      setStoredUser(normalizedUser);

      dispatch({
        type: "AUTH_SUCCESS",
        payload: { user: normalizedUser, token: response.token ?? "" },
      });

      // 🔹 Enrich right after login
      await fetchUser(normalizedUser.id, response.token ?? "");
    } catch (error) {
      dispatch({ type: "AUTH_FAILURE" });
      throw error;
    }
  };

  // 🔹 Register
  const register = async (userData: RegisterRequest) => {
    dispatch({ type: "AUTH_START" });

    try {
      const response = await authAPI.register(userData);

      const role = normalizeUserRole(response.user.role);
      if (!role) throw new Error("Unknown or invalid role from server");

      const normalizedUser: AuthUser = { ...response.user, role };

      setStoredToken(response.token);
      setStoredUser(normalizedUser);

      dispatch({
        type: "AUTH_SUCCESS",
        payload: { user: normalizedUser, token: response.token ?? "" },
      });

      // 🔹 Enrich right after register
      await fetchUser(normalizedUser.id, response.token ?? "");
    } catch (error) {
      dispatch({ type: "AUTH_FAILURE" });
      throw error;
    }
  };

  // 🔹 Logout
  const logout = async () => {
    clearAuthData();
    dispatch({ type: "LOGOUT" });
    try {
      await authAPI.logout();
    } catch (err) {
      console.warn("[logout] server call failed:", (err as Error).message);
    }
  };

  const updateUser = (user: AuthUser) => {
    setStoredUser(user);
    dispatch({ type: "SET_USER", payload: user });
  };

  const refreshUser = async () => {
    if (state.user && state.token) {
      await fetchUser(state.user.id, state.token);
    }
  };

  const value: AuthContextValue = {
    ...state,
    login,
    register,
    logout,
    updateUser,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

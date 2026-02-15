// src/utils/api/auth.ts

import api from "@/utils/api/axios";
import { AuthUser } from "@/types/user";
import { getStoredUser } from "@/utils/auth/authStorage";
export interface LoginRequest {
  email?: string;
  phone?: string;
  password: string;
}

// export interface RegisterRequest {
//   email: string;
//   password: string;
//   firstName: string;
//   lastName: string;
//   role: "student" | "teacher" | "parent" | "admin" | "superadmin";
//   gradeLevel?: string;
//   subGrade?: string;
//   schoolId?: string;
//   parentId?: string;
//   phone?: string;
//   subjectSpecialties?: string[];
//   gradeLevels?: string[];
//   childrenIds?: string[];
// }

export interface AuthResponse {
  user: AuthUser;
  token: string;
}

export const authAPI = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    try {
      const response = await api.post("/auth/login", credentials);
  return {
      token: response.data.access_token,
      user: response.data.user,
    };
    } catch (error: any) {
      const status = error.response?.status;
      const serverMsg =
        error.response?.data?.message || error.response?.data?.error;

      if (error.code === "ECONNABORTED") {
        throw new Error(
          "Server is taking too long to respond. Please try again."
        );
      }

      // Controlled messages for known status codes
      if (status === 400 || status === 401) {
        throw new Error(serverMsg || "Invalid email or password.");
      }

      if (status === 404) {
        throw new Error("User not found.");
      }

      if (status === 500) {
        throw new Error(
          "Something went wrong on the server. Please try again later."
        );
      }

      // Fallback for anything else
      throw new Error("An unexpected error occurred. Please try again.");
    }
  },

  // register: async (userData: RegisterRequest): Promise<AuthResponse> => {
  //   try {
  //     const response = await api.post("/users", userData);
  //     return response.data;
  //   } catch (error: any) {
  //     const status = error.response?.status;
  //     const serverMsg = error.response?.data?.message;

  //     if (status === 400) {
  //       throw new Error(serverMsg || "Invalid registration data.");
  //     }

  //     throw new Error("Registration failed. Please try again.");
  //   }
  // },

  logout: async (): Promise<void> => {
    try {
      await api.post("/auth/logout");
      return; // success
    } catch (error: any) {
      const status = error?.response?.status;
      const serverMsg =
        error?.response?.data?.message || error?.response?.data?.error;

      // Timeout
      if (error?.code === "ECONNABORTED") {
        throw new Error(
          "Server is taking too long to respond. Please try again."
        );
      }

      // Already logged out / invalid session — treat as success
      if (status === 401 || status === 403) {
        return;
      }

      if (status === 404) {
        throw new Error("Logout endpoint not found.");
      }

      if (status === 500) {
        throw new Error(
          "Something went wrong on the server. Please try again later."
        );
      }

      // Fallback
      throw new Error(serverMsg || "Failed to log out. Please try again.");
    }
  },

verifyToken: async (): Promise<AuthUser> => {
  const user = getStoredUser();
  if (user) return user;
  throw new Error("No valid session found");
},
};

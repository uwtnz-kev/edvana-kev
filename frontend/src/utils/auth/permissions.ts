// utils/auth/permissions.ts: Handles roles and permissions. Extendable later.

import { AuthUser } from "@/types/user";

export const hasRole = (user: AuthUser | null, role: string): boolean =>
  !!user && user.role === role;

export const hasAnyRole = (user: AuthUser | null, roles: string[]): boolean =>
  !!user && roles.includes(user.role);

// Optional permission groups
export const canAccessTeacherFeatures = (user: AuthUser | null): boolean =>
  hasAnyRole(user, ["teacher", "schooladmin", "superadmin"]);

export const canAccessAdminFeatures = (user: AuthUser | null): boolean =>
  hasAnyRole(user, ["schooladmin", "superadmin"]);

export const canManageUsers = (user: AuthUser | null): boolean =>
  hasAnyRole(user, ["schooladmin", "superadmin"]);
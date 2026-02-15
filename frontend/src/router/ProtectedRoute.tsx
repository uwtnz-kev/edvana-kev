import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { UserRole } from "../constants/roles";
import FullScreenLoader from "@/components/states/FullScreenLoader";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
  requiredRoles?: UserRole[];
  fallback?: React.ReactNode;
}

export function ProtectedRoute({
  children,
  requiredRole,
  requiredRoles,
  fallback,
}: ProtectedRouteProps) {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
  return <FullScreenLoader />;  // ⬅️ branded background + spinner
}

  // Not authenticated → redirect to /login with "from" state
  if (!isAuthenticated || !user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}  // so you can send them back after login
      />
    );
  }

  // Role checks
  if (requiredRole && user.role !== requiredRole) {
    return fallback ?? <Navigate to="/login" replace />;
  }
  if (requiredRoles && !requiredRoles.includes(user.role)) {
    return fallback ?? <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}


// Higher-order component for role-based access
export function withRoleProtection<P extends object>(
  Component: React.ComponentType<P>,
  requiredRole?: UserRole,
  requiredRoles?: UserRole[]
) {
  return function ProtectedComponent(props: P) {
    return (
      <ProtectedRoute requiredRole={requiredRole} requiredRoles={requiredRoles}>
        <Component {...props} />
      </ProtectedRoute>
    );
  };
}
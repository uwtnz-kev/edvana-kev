// src/hooks/useRoleRedirect.ts
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { USER_ROLES, normalizeUserRole } from "@/constants/roles";

/**
 * mode:
 * - "guard" (default) → if NOT authed, go to /login; if authed, go to role dashboard
 * - "login"           → ONLY redirect when authed; do nothing if not authed
 */
export const useRoleRedirect = (mode: "guard" | "login" = "guard") => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;

    if (mode === "guard") {
      if (!isAuthenticated) {
        navigate("/login");
        return;
      }
    }

    if (isAuthenticated && user) {
      const normalized = normalizeUserRole(user.role);
      switch (normalized) {
        case USER_ROLES.STUDENT:
          navigate("/dashboard/student");
          break;
        case USER_ROLES.TEACHER:
          navigate("/dashboard/teacher");
          break;
        case USER_ROLES.PARENT:
          navigate("/dashboard/parent");
          break;
        case USER_ROLES.SCHOOL_ADMIN:
          navigate("/dashboard/schooladmin");
          break;
        case USER_ROLES.SUPER_ADMIN:
          navigate("/dashboard/superadmin");
          break;
        default:
          // If role is unknown, send to login
          navigate("/login");
      }
    }
  }, [mode, user, isAuthenticated, isLoading, navigate]);
};


export const useRedirectToDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const redirectToDashboard = () => {
    if (!user) return;
console.log("Redirecting role:", user?.role);

    switch (user.role) {
      case USER_ROLES.STUDENT:
        navigate('/dashboard/student');
        break;
      case USER_ROLES.TEACHER:
        navigate('/dashboard/teacher');
        break;
      case USER_ROLES.PARENT:
        navigate('/dashboard/parent');
        break;
      case USER_ROLES.SCHOOL_ADMIN:
        navigate('/dashboard/schooladmin');
        break;
      case USER_ROLES.SUPER_ADMIN:
        navigate('/dashboard/superadmin');
        break;
      default:
        navigate('/');
    }
  };

  return redirectToDashboard;
};
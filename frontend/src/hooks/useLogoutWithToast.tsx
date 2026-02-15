// src/hooks/useLogoutWithToast.ts
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { SuccessToast } from "@/components/ui/success-toast";

export function useLogoutWithToast() {
  const [showToast, setShowToast] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setShowToast(true);
    setTimeout(() => {
      logout();
      navigate("/login");
    }, 1500);
  };

  const LogoutToastElement = (
    <SuccessToast
      isOpen={showToast}
      onClose={() => setShowToast(false)}
      title="Logout Successful"
      description="Redirecting to login..."
    />
  );

  return {
    handleLogout,
    LogoutToast: LogoutToastElement,
  };
}
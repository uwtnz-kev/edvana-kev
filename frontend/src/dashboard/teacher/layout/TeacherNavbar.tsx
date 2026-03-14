// Orchestrates the teacher navbar using focused navbar subcomponents.
import { useNavigate } from "react-router-dom";
import { teacherDashboardTheme } from "@/dashboard/teacher/theme/teacherDashboardTheme";
import { useAuth } from "@/context/AuthContext";
import { useLogoutWithToast } from "@/hooks/useLogoutWithToast";
import { TeacherNavbarAccountMenu } from "./navbar/TeacherNavbarAccountMenu";
import { TeacherNavbarBrand } from "./navbar/TeacherNavbarBrand";
import { TeacherNavbarContext } from "./navbar/TeacherNavbarContext";
import { getTeacherNavbarDisplayData } from "./navbar/teacherNavbarHelpers";

export default function TeacherNavbar() {
  const navigate = useNavigate();
  const { handleLogout, LogoutToast } = useLogoutWithToast();
  const { user } = useAuth();

  if (!user) return null;

  return (
    <header className={teacherDashboardTheme.surfaces.navbar}>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <TeacherNavbarBrand />
          <TeacherNavbarContext />
          <TeacherNavbarAccountMenu
            display={getTeacherNavbarDisplayData(user)}
            onAccount={() => navigate("/dashboard/teacher/settings/account")}
            onLogout={handleLogout}
            onSettings={() => navigate("/dashboard/teacher/settings/general")}
          />
        </div>
      </div>
      {LogoutToast}
    </header>
  );
}

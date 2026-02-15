import { Building, User, Settings, LogOut, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useLogoutWithToast } from "@/hooks/useLogoutWithToast";
import { useAuth } from "@/context/AuthContext";
import { ROLE_LABELS } from "@/constants/roles";
import { useSchoolAdminProfile } from "@/utils/data/users/getSchoolAdminProfile";

interface SchoolAdminNavbarProps {
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

export function SchoolAdminNavbar({
  isMobileOpen,
  setIsMobileOpen,
}: SchoolAdminNavbarProps) {
  const navigate = useNavigate();
  const toggleMobile = () => setIsMobileOpen(!isMobileOpen);

  const { fullName, email, role, school } = useSchoolAdminProfile();
  const { isLoading } = useAuth();
  if (isLoading) return (
  <div className="h-16 w-full bg-white/10 backdrop-blur-md animate-pulse rounded-b-2xl" />
);
  const { handleLogout, LogoutToast } = useLogoutWithToast();

  const handleSettings = () => navigate("/dashboard/schooladmin/settings");
  const handleProfile = () => navigate("/dashboard/schooladmin/profile");

  return (
    <header className="w-full sticky top-0 z-50 bg-white/15 backdrop-blur-xl border-b border-white/30 shadow-2xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo + Mobile Menu */}
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobile}
              className="lg:hidden bg-white/10 backdrop-blur-sm border border-white/20 hover:backdrop-blur-sm hover:bg-white/20 text-white rounded-lg shadow-lg"
            >
              {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-brand-accent shadow-xl hover:shadow-3xl transition-all duration-300">
              <Building className="h-7 w-7 text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">Edvana</span>
          </div>

          {/* Center: School Name and Role */}
          <div className="hidden md:block">
            <h1 className="text-xl font-semibold text-white">
              {school?.name ?? "Your School"} | {ROLE_LABELS[role as keyof typeof ROLE_LABELS] ?? role}

            </h1>
          </div>

          {/* Right: Profile */}
          <div className="relative">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-12 w-12 rounded-xl bg-white/20 backdrop-blur-xl hover:bg-white/30 border border-white/30 hover:border-white/40 transition-all duration-200 p-0 shadow-2xl"
                >
                  <div className="h-9 w-9 rounded-2xl bg-brand-teal flex items-center justify-center shadow-lg">
                    <User className="h-5 w-5 text-white" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                sideOffset={8}
                className="w-64 bg-white/20 backdrop-blur-3xl border border-white/30 shadow-2xl rounded-xl"
              >
                <div className="px-4 py-3 border-b border-white/20">
                  <h4 className="text-sm font-medium text-white/120 mb-1">{fullName}</h4>
                  <p className="text-xs text-brand-brown/60 mb-1">{email}</p>
                  <p className="text-xs text-brand-brown/60 font-medium">{ROLE_LABELS[role as keyof typeof ROLE_LABELS] ?? role}</p>
                  <p className="text-xs text-brand-brown/60 font-medium">{school?.name ?? "School not assigned"}</p>
                </div>
                <DropdownMenuItem
                  onClick={handleSettings}
                  className="px-4 py-2 text-sm text-brand-teal hover:bg-white/20 hover:backdrop-blur-sm cursor-pointer transition-colors rounded-xl mx-2 my-1"
                >
                  <Settings className="mr-3 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleProfile}
                  className="px-4 py-2 text-sm text-brand-teal hover:bg-white/20 hover:backdrop-blur-sm cursor-pointer transition-colors rounded-xl mx-2 my-1"
                >
                  <User className="mr-3 h-4 w-4" />
                  Account
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/20 mx-2" />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm text-red-600 hover:text-red-600 hover:bg-red-600/20 hover:backdrop-blur-sm cursor-pointer transition-colors rounded-xl mx-2 my-1"
                >
                  <LogOut className="mr-3 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      {LogoutToast}
    </header>
  );
}
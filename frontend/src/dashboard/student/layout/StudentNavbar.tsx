import { useNavigate } from "react-router-dom";
import { BookOpen, User, Settings, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useLogoutWithToast } from "@/hooks/useLogoutWithToast";
import { useStudentProfile } from "@/utils/data/users/getStudentProfile"; // ✅ now using hook

export function StudentNavbar() {
  const navigate = useNavigate();
  const { handleLogout, LogoutToast } = useLogoutWithToast();
  const {
    fullName,
    email,
    grade,
    school,
  } = useStudentProfile(); // ✅ abstracted student data

  const handleSettings = () => {
    navigate("/dashboard/student/settings/general");
  };

  const handleAccount = () => {
    navigate("/dashboard/student/settings/account");
  };

  if (!fullName) return null; // optional: avoid flicker if user is null

  return (
    <header className="w-full sticky top-0 z-50 bg-white/5 backdrop-blur-lg border-b border-white/10 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#FF715B] to-[#FF715B]/80 shadow-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              Edvana
            </span>
          </div>

          {/* Center: Title */}
          <div className="hidden md:block">
            <h1 className="text-xl font-bold text-white">Student Dashboard</h1>
          </div>

          {/* Right: Profile Dropdown */}
          <div className="relative">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full bg-white/10 backdrop-blur-sm hover:bg-[#FF715B]/20 border border-white/20 hover:border-[#FF715B]/40 transition-all duration-200 p-0 shadow-md"
                >
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#1EA896] to-[#1EA896]/80 flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                sideOffset={8}
                className="w-64 bg-black/40 backdrop-blur-lg border border-white/20 shadow-xl rounded-lg"
              >
                <div className="px-4 py-3 border-b border-white/10">
                  <p className="text-base font-semibold text-white mb-1">
                    {fullName}
                  </p>
                  <p className="text-xs text-white/70 mb-1">
                    {email}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-white/50">
                    <span>{grade}</span>
                    <span>•</span>
                    <span>{school.name}</span>
                  </div>
                </div>
                <DropdownMenuItem
                  onClick={handleSettings}
                  className="text-white hover:bg-white/10 focus:bg-white/10 cursor-pointer flex items-center px-3 py-2"
                >
                  <Settings className="h-4 w-4 mr-3 text-[#4C5454]" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleAccount}
                  className="text-white hover:bg-white/10 focus:bg-white/10 cursor-pointer flex items-center px-3 py-2"
                >
                  <User className="h-4 w-4 mr-3 text-[#1EA896]" />
                  Account
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/20 my-1" />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-[#FF715B] hover:bg-[#FF715B]/10 focus:bg-[#FF715B]/10 cursor-pointer flex items-center px-3 py-2"
                >
                  <LogOut className="h-4 w-4 mr-3" />
                  Logout
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
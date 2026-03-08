// Renders the teacher navbar profile menu and actions.
import { LogOut, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {
  display: { email: string; fullName: string; roleLabel: string };
  onAccount: () => void;
  onLogout: () => void;
  onSettings: () => void;
};

export function TeacherNavbarAccountMenu({ display, onAccount, onLogout, onSettings }: Props) {
  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/25 hover:border-white/40 transition-all duration-200 p-0 shadow-[0_8px_18px_rgba(59,36,15,0.25)]">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#C9B08D] to-[#7A5A3A] flex items-center justify-center">
              <User className="h-4 w-4 text-[#3B240F]" />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          sideOffset={8}
          className="w-64 bg-white/35 backdrop-blur-xl border border-white/30 shadow-[0_18px_50px_rgba(59,36,15,0.30)] rounded-lg"
        >
          <div className="px-4 py-3 border-b border-white/20">
            <p className="text-base font-semibold text-[#3B240F] mb-1">{display.fullName}</p>
            <p className="text-xs text-[#6B4F3A] mb-1">{display.email}</p>
            <div className="flex items-center gap-2 text-xs text-[#6B4F3A]">
              <span>{display.roleLabel}</span>
            </div>
          </div>
          <DropdownMenuItem onClick={onSettings} className="text-[#3B240F] hover:bg-white/20 focus:bg-white/20 cursor-pointer flex items-center px-3 py-2">
            <Settings className="h-4 w-4 mr-3 text-[#6B4F3A]" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onAccount} className="text-[#3B240F] hover:bg-white/20 focus:bg-white/20 cursor-pointer flex items-center px-3 py-2">
            <User className="h-4 w-4 mr-3 text-[#7A5A3A]" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-white/30 my-1" />
          <DropdownMenuItem onClick={onLogout} className="text-[#FF715B] hover:bg-[#FF715B]/10 focus:bg-[#FF715B]/10 cursor-pointer flex items-center px-3 py-2">
            <LogOut className="h-4 w-4 mr-3" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

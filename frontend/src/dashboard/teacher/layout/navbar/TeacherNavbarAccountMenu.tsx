// Renders the teacher navbar profile menu and actions.
import { LogOut, Settings, User } from "lucide-react";
import { teacherDashboardTheme } from "@/dashboard/teacher/theme/teacherDashboardTheme";
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
          <Button variant="ghost" className="relative h-10 w-10 rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] p-0 text-[var(--text-primary)] transition-all duration-200 hover:bg-[var(--card-hover)]">
            <div className={`flex h-8 w-8 items-center justify-center rounded-full ${teacherDashboardTheme.accents.brand}`}>
              <User className="h-4 w-4" />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          sideOffset={8}
          className="w-64 rounded-lg border border-[var(--card-border)] bg-[#161b22] text-[var(--text-primary)] shadow-[var(--card-shadow)]"
        >
          <div className="border-b border-[var(--topbar-border)] px-4 py-3">
            <p className="mb-1 text-base font-semibold text-[var(--text-primary)]">{display.fullName}</p>
            <p className="mb-1 text-xs text-[var(--text-secondary)]">{display.email}</p>
            <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
              <span>{display.roleLabel}</span>
            </div>
          </div>
          <DropdownMenuItem onClick={onSettings} className="flex cursor-pointer items-center px-3 py-2 text-[var(--text-primary)] focus:bg-[var(--sidebar-item-hover)]">
            <Settings className="mr-3 h-4 w-4 text-[var(--accent-primary)]" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onAccount} className="flex cursor-pointer items-center px-3 py-2 text-[var(--text-primary)] focus:bg-[var(--sidebar-item-hover)]">
            <User className="mr-3 h-4 w-4 text-[var(--accent-primary)]" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator className="my-1 bg-[var(--topbar-border)]" />
          <DropdownMenuItem onClick={onLogout} className="flex cursor-pointer items-center px-3 py-2 text-[var(--text-primary)] focus:bg-[var(--sidebar-item-hover)]">
            <LogOut className="mr-3 h-4 w-4 text-[var(--accent-purple)]" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

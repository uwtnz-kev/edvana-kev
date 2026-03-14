// Header for the teacher general settings page.
import { Settings } from "lucide-react";

export function GeneralSettingsHeader() {
  return (
    <div className="flex items-center space-x-3">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--sidebar-item-active)] p-3 text-[var(--accent-primary)]">
        <Settings className="h-6 w-6" />
      </div>
      <div>
        <h1 className="text-3xl font-bold text-white">General Settings</h1>
        <p className="text-white/70">Customize your teaching experience and notifications</p>
      </div>
    </div>
  );
}

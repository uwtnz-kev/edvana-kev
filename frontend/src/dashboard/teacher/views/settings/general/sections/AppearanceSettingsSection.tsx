// Appearance preferences section for the general settings page.
import { Moon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import type { TeacherPreferences } from "../generalSettingsHelpers";

type Props = {
  preferences: TeacherPreferences;
  onToggle: (key: keyof TeacherPreferences, value: boolean) => void;
};

export function AppearanceSettingsSection({ onToggle, preferences }: Props) {
  return (
    <div className="space-y-4 border-t border-white/10 pt-6">
      <h2 className="text-xl font-semibold text-white mb-4">Appearance</h2>
      <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
        <div className="flex items-center space-x-3"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/20"><Moon className="h-6 w-6 text-amber-700" /></div><div><div className="flex items-center space-x-2"><Label htmlFor="dark-mode" className="text-white font-medium">Dark Mode</Label><span className="px-2 py-1 bg-[#1EA896]/20 text-[#1EA896] text-xs font-medium rounded-full">Coming Soon</span></div><p className="text-white/60 text-sm">Switch between light and dark themes for comfortable viewing</p></div></div>
        <Switch id="dark-mode" checked={preferences.darkMode} onCheckedChange={(checked) => onToggle("darkMode", checked)} className="data-[state=checked]:bg-[#1EA896] data-[state=unchecked]:bg-white/10 border border-white/20" disabled />
      </div>
    </div>
  );
}

// Informational card describing current settings sync behavior.
import { Settings } from "lucide-react";

export function SettingsSyncSection() {
  return (
    <div className="bg-gradient-to-r from-[#1EA896]/10 to-[#FF715B]/10 border border-white/10 rounded-xl p-4">
      <div className="flex items-start space-x-3"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-500/20"><Settings className="h-6 w-6 text-blue-700" /></div><div><p className="text-white font-medium text-sm mb-1">Settings Sync</p><p className="text-white/70 text-xs">Preferences are saved locally for now. Later they can be synced to your account via the backend.</p></div></div>
    </div>
  );
}

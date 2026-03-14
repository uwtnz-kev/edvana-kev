// Notification-related preference toggles for the general settings page.
import type { ReactNode } from "react";
import { Clock, Mail } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import type { TeacherPreferences } from "../generalSettingsHelpers";

type Props = {
  preferences: TeacherPreferences;
  onToggle: (key: keyof TeacherPreferences, value: boolean) => void;
};

function SettingRow(props: { description: string; icon: ReactNode; iconClassName: string; id: string; label: string; onToggle: (checked: boolean) => void; checked: boolean }) {
  return (
    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
      <div className="flex items-center space-x-3"><div className={`flex h-12 w-12 items-center justify-center rounded-xl p-3 ${props.iconClassName}`}>{props.icon}</div><div><Label htmlFor={props.id} className="text-white font-medium">{props.label}</Label><p className="text-white/60 text-sm">{props.description}</p></div></div>
      <Switch id={props.id} checked={props.checked} onCheckedChange={props.onToggle} className="data-[state=checked]:bg-[#1EA896]" />
    </div>
  );
}

export function NotificationsSettingsSection({ onToggle, preferences }: Props) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white mb-4">Notifications</h2>
      <div className="space-y-6">
        <SettingRow id="email-notifications" label="Email Notifications" description="Receive updates about submissions, announcements, and system alerts" checked={preferences.emailNotifications} onToggle={(checked) => onToggle("emailNotifications", checked)} iconClassName="bg-violet-500/15 text-violet-300" icon={<Mail className="h-6 w-6" />} />
        <SettingRow id="class-reminders" label="Class Reminders" description="Get reminders for upcoming lessons, exams, and grading tasks" checked={preferences.classReminders} onToggle={(checked) => onToggle("classReminders", checked)} iconClassName="bg-cyan-500/15 text-cyan-300" icon={<Clock className="h-6 w-6" />} />
      </div>
    </div>
  );
}

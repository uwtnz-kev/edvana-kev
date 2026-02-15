import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Settings, Mail, Moon, Clock, Save } from "lucide-react";

interface TeacherPreferences {
  emailNotifications: boolean;
  darkMode: boolean;
  classReminders: boolean;
}

export default function GeneralSettingsView() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [preferences, setPreferences] = useState<TeacherPreferences>(() => {
    const saved = localStorage.getItem("teacherPreferences");
    if (saved) return JSON.parse(saved);
    return {
      emailNotifications: true,
      darkMode: false,
      classReminders: true,
    };
  });

  const updatePreference = (key: keyof TeacherPreferences, value: boolean) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));

    if (key === "darkMode") {
      if (value) document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
    }
  };

  const handleSavePreferences = async () => {
    setIsLoading(true);
    try {
      localStorage.setItem("teacherPreferences", JSON.stringify(preferences));
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Preferences saved successfully",
        description: "Your settings have been updated.",
      });
    } catch {
      toast({
        title: "Save failed",
        description: "There was an error saving your preferences. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#1EA896] to-[#1EA896]/80 rounded-lg flex items-center justify-center">
            <Settings className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">General Settings</h1>
            <p className="text-white/70">Customize your teaching experience and notifications</p>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl p-6">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white mb-4">Notifications</h2>

              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#FF715B]/20 to-[#FF715B]/10 rounded-lg flex items-center justify-center">
                      <Mail className="h-4 w-4 text-[#FF715B]" />
                    </div>
                    <div>
                      <Label htmlFor="email-notifications" className="text-white font-medium">
                        Email Notifications
                      </Label>
                      <p className="text-white/60 text-sm">
                        Receive updates about submissions, announcements, and system alerts
                      </p>
                    </div>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={preferences.emailNotifications}
                    onCheckedChange={(checked) => updatePreference("emailNotifications", checked)}
                    className="data-[state=checked]:bg-[#1EA896]"
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#4C5454]/20 to-[#523F38]/10 rounded-lg flex items-center justify-center">
                      <Clock className="h-4 w-4 text-[#4C5454]" />
                    </div>
                    <div>
                      <Label htmlFor="class-reminders" className="text-white font-medium">
                        Class Reminders
                      </Label>
                      <p className="text-white/60 text-sm">
                        Get reminders for upcoming lessons, exams, and grading tasks
                      </p>
                    </div>
                  </div>
                  <Switch
                    id="class-reminders"
                    checked={preferences.classReminders}
                    onCheckedChange={(checked) => updatePreference("classReminders", checked)}
                    className="data-[state=checked]:bg-[#1EA896]"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4 border-t border-white/10 pt-6">
              <h2 className="text-xl font-semibold text-white mb-4">Appearance</h2>

              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-lg flex items-center justify-center">
                    <Moon className="h-4 w-4 text-purple-400" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="dark-mode" className="text-white font-medium">
                        Dark Mode
                      </Label>
                      <span className="px-2 py-1 bg-[#1EA896]/20 text-[#1EA896] text-xs font-medium rounded-full">
                        Coming Soon
                      </span>
                    </div>
                    <p className="text-white/60 text-sm">
                      Switch between light and dark themes for comfortable viewing
                    </p>
                  </div>
                </div>
                <Switch
                  id="dark-mode"
                  checked={preferences.darkMode}
                  onCheckedChange={(checked) => updatePreference("darkMode", checked)}
                  className="data-[state=checked]:bg-[#1EA896] data-[state=unchecked]:bg-white/10 border border-white/20"
                  disabled
                />
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#1EA896]/10 to-[#FF715B]/10 border border-white/10 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <Settings className="h-5 w-5 text-[#1EA896] mt-0.5" />
                <div>
                  <p className="text-white font-medium text-sm mb-1">Settings Sync</p>
                  <p className="text-white/70 text-xs">
                    Preferences are saved locally for now. Later they can be synced to your account via the backend.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button
                onClick={handleSavePreferences}
                disabled={isLoading}
                className="bg-gradient-to-r from-[#1EA896] to-[#1EA896]/90 hover:from-[#1EA896]/90 hover:to-[#1EA896]/80 text-white font-medium px-6 py-2 rounded-xl transition-all duration-200 shadow-lg hover:shadow-[#1EA896]/20 disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Saving...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Save className="h-4 w-4" />
                    <span>Save Preferences</span>
                  </div>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

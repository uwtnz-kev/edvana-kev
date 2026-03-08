// State hook for local general settings preferences and save feedback.
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { defaultTeacherPreferences, TEACHER_PREFERENCES_KEY, type TeacherPreferences } from "./generalSettingsHelpers";

export function useGeneralSettingsState() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [preferences, setPreferences] = useState<TeacherPreferences>(() => {
    const saved = localStorage.getItem(TEACHER_PREFERENCES_KEY);
    return saved ? JSON.parse(saved) : defaultTeacherPreferences;
  });

  return {
    isLoading,
    preferences,
    savePreferences: async () => {
      setIsLoading(true);
      try {
        localStorage.setItem(TEACHER_PREFERENCES_KEY, JSON.stringify(preferences));
        await new Promise((resolve) => setTimeout(resolve, 1000));
        toast({ title: "Preferences saved successfully", description: "Your settings have been updated." });
      } catch {
        toast({ title: "Save failed", description: "There was an error saving your preferences. Please try again.", variant: "destructive" });
      } finally {
        setIsLoading(false);
      }
    },
    updatePreference: (key: keyof TeacherPreferences, value: boolean) => {
      setPreferences((prev) => ({ ...prev, [key]: value }));
      if (key === "darkMode") value ? document.documentElement.classList.add("dark") : document.documentElement.classList.remove("dark");
    },
  };
}

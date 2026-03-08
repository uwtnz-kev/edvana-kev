// Groups the general settings sections and save controls into one card shell.
import type { useGeneralSettingsState } from "./useGeneralSettingsState";
import { GeneralSettingsControls } from "./GeneralSettingsControls";
import { AppearanceSettingsSection } from "./sections/AppearanceSettingsSection";
import { NotificationsSettingsSection } from "./sections/NotificationsSettingsSection";
import { SettingsSyncSection } from "./sections/SettingsSyncSection";

type Props = { state: ReturnType<typeof useGeneralSettingsState> };

export function GeneralSettingsSections({ state }: Props) {
  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl p-6">
      <div className="space-y-8">
        <NotificationsSettingsSection preferences={state.preferences} onToggle={state.updatePreference} />
        <AppearanceSettingsSection preferences={state.preferences} onToggle={state.updatePreference} />
        <SettingsSyncSection />
        <GeneralSettingsControls isLoading={state.isLoading} onSave={state.savePreferences} />
      </div>
    </div>
  );
}

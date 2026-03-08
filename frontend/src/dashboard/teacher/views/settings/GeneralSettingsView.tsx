// Orchestrates the teacher general settings page using extracted modules.
import {
  GeneralSettingsHeader,
  GeneralSettingsSections,
  useGeneralSettingsState,
} from "./general";

export default function GeneralSettingsView() {
  const state = useGeneralSettingsState();

  return (
    <div className="p-4 sm:p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <GeneralSettingsHeader />
        <GeneralSettingsSections state={state} />
      </div>
    </div>
  );
}

// Save controls for the general settings page.
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  isLoading: boolean;
  onSave: () => void;
};

export function GeneralSettingsControls({ isLoading, onSave }: Props) {
  return (
    <div className="flex justify-end pt-4">
      <Button onClick={onSave} disabled={isLoading} className="bg-gradient-to-r from-[#1EA896] to-[#1EA896]/90 hover:from-[#1EA896]/90 hover:to-[#1EA896]/80 text-white font-medium px-6 py-2 rounded-xl transition-all duration-200 shadow-lg hover:shadow-[#1EA896]/20 disabled:opacity-50">
        {isLoading ? <div className="flex items-center space-x-2"><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /><span>Saving...</span></div> : <div className="flex items-center space-x-2"><Save className="h-4 w-4" /><span>Save Preferences</span></div>}
      </Button>
    </div>
  );
}

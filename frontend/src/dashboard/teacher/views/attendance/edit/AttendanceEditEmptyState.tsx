// Renders the fallback state when the attendance record cannot be found.
import { Button } from "@/components/ui/button";

type Props = {
  onBack: () => void;
};

export function AttendanceEditEmptyState({ onBack }: Props) {
  return (
    <div className="w-full p-4 sm:p-6">
      <div className="max-w-3xl mx-auto bg-white/10 border border-white/10 backdrop-blur-xl rounded-2xl p-6 sm:p-8 text-center">
        <h1 className="text-[#3B240F] text-2xl font-semibold">Attendance record not found</h1>
        <p className="text-[#3B240F]/70 mt-3">The attendance record may have been deleted or the link is invalid.</p>
        <div className="mt-5">
          <Button type="button" onClick={onBack} className="bg-white/20 hover:bg-white/30 text-[#3B240F] border border-white/20 rounded-2xl">
            Back
          </Button>
        </div>
      </div>
    </div>
  );
}

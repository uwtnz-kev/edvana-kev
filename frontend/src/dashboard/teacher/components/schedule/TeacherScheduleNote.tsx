import { AlertCircle } from "lucide-react";

export function TeacherScheduleNote() {
  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4">
      <div className="flex items-start space-x-3">
        <AlertCircle className="h-5 w-5 text-[#FF715B] mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-white/90 text-sm">
            <strong>Note:</strong> This schedule is based on the school timetable. If you need changes, contact the school admin.
          </p>
        </div>
      </div>
    </div>
  );
}

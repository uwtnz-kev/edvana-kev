import { AlertCircle } from "lucide-react";

export function ScheduleNote() {
  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4">
      <div className="flex items-start space-x-3">
        <AlertCircle className="h-5 w-5 text-[#FF715B] mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-white/90 text-sm">
            <strong>Important:</strong> Schedules are managed by the school administration. 
            For any schedule updates or changes, please contact the school support office.
          </p>
        </div>
      </div>
    </div>
  );
}
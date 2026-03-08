// Schedule grid wrapper for the teacher timetable view.
import type { ScheduleData } from "./scheduleViewHelpers";
import { ScheduleTableHeader } from "./cards/ScheduleTableHeader";
import { ScheduleTableRow } from "./cards/ScheduleTableRow";

type Props = { schedule: ScheduleData };

export function ScheduleCardsList({ schedule }: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/10 shadow-sm backdrop-blur-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <ScheduleTableHeader days={schedule.days} />
          <tbody>
            {schedule.timeSlots.map((timeSlot, index) => (
              <ScheduleTableRow
                key={timeSlot}
                dayOrder={schedule.days}
                index={index}
                timeSlot={timeSlot}
                timetable={schedule.timetable}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Renders one timeslot row across the visible schedule days.
import { Clock } from "lucide-react";
import { TeacherScheduleCard } from "../../../components/schedule";
import type { ScheduleData } from "../scheduleViewHelpers";

type Props = { dayOrder: string[]; index: number; timeSlot: string; timetable: ScheduleData["timetable"] };

export function ScheduleTableRow({ dayOrder, index, timeSlot, timetable }: Props) {
  return (
    <tr className={index % 2 === 0 ? "bg-white/5" : "bg-transparent"}>
      <td className="border-r border-white/10 px-3 py-3 font-medium text-white">
        <div className="flex items-center gap-2">
          <Clock className="h-3.5 w-3.5 text-[#1EA896]" />
          <span className="text-xs leading-tight">{timeSlot}</span>
        </div>
      </td>
      {dayOrder.map((day) => {
        const classInfo = timetable[day]?.[timeSlot] ?? null;
        return (
          <td key={`${day}-${timeSlot}`} className="p-2 align-top">
            {classInfo ? (
              <TeacherScheduleCard
                subject={classInfo.subject}
                classNameLabel={classInfo.className}
                room={classInfo.room}
                variant="desktop"
              />
            ) : null}
          </td>
        );
      })}
    </tr>
  );
}


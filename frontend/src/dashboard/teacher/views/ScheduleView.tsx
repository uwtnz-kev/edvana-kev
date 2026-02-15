import { useState } from "react";
import { Calendar, Clock } from "lucide-react";
import { TeacherScheduleNote, TeacherScheduleFilters, TeacherScheduleCard } from "../components/schedule";

// Sample timetable data for teacher
const scheduleData = {
  timeSlots: [
    "8:00 - 8:45",
    "8:45 - 9:30",
    "9:30 - 10:15",
    "10:15 - 10:30",
    "10:30 - 11:15",
    "11:15 - 12:00",
    "12:00 - 12:45",
    "12:45 - 13:30",
    "13:30 - 14:15",
    "14:15 - 15:00",
    "15:00 - 15:45",
  ],
  days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  timetable: {
    Monday: {
      "8:00 - 8:45": { subject: "Mathematics", className: "S3A", room: "A101" },
      "8:45 - 9:30": { subject: "Mathematics", className: "S3B", room: "A101" },
      "9:30 - 10:15": { subject: "Free Period", className: "", room: "" },
      "10:15 - 10:30": { subject: "Break", className: "", room: "" },
      "10:30 - 11:15": { subject: "Mathematics", className: "S2A", room: "A102" },
      "11:15 - 12:00": { subject: "Office Hours", className: "", room: "Staff Room" },
      "12:00 - 12:45": { subject: "Mathematics", className: "S4A", room: "A101" },
      "12:45 - 13:30": { subject: "Lunch Break", className: "", room: "" },
      "13:30 - 14:15": { subject: "Planning", className: "", room: "Staff Room" },
      "14:15 - 15:00": { subject: "Mathematics", className: "S1B", room: "A103" },
      "15:00 - 15:45": { subject: "Free Period", className: "", room: "" },
    },
    Tuesday: {},
    Wednesday: {},
    Thursday: {},
    Friday: {},
  } as Record<string, Record<string, { subject: string; className: string; room: string }>>,
};

export default function ScheduleView() {
  const [selectedDay, setSelectedDay] = useState("All Days");
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");

  const subjects = Array.from(
    new Set(
      Object.values(scheduleData.timetable).flatMap((daySchedule) =>
        Object.values(daySchedule).map((info) => info.subject)
      )
    )
  ).filter((s) => s !== "Break" && s !== "Lunch Break");

  const getFilteredTimetable = () => {
    if (selectedDay === "All Days" && selectedSubject === "All Subjects") return scheduleData;

    const filteredTimetable: typeof scheduleData.timetable = {};
    const filteredDays = selectedDay === "All Days" ? scheduleData.days : [selectedDay];

    filteredDays.forEach((day) => {
      const daySchedule = scheduleData.timetable[day];
      if (!daySchedule) return;

      const filteredDaySchedule: Record<string, any> = {};

      Object.entries(daySchedule).forEach(([timeSlot, classInfo]) => {
        if (selectedSubject === "All Subjects" || classInfo.subject === selectedSubject) {
          filteredDaySchedule[timeSlot] = classInfo;
        }
      });

      if (Object.keys(filteredDaySchedule).length > 0) {
        filteredTimetable[day] = filteredDaySchedule as any;
      }
    });

    return {
      ...scheduleData,
      days: filteredDays,
      timetable: filteredTimetable,
    };
  };

  const handleResetFilters = () => {
    setSelectedDay("All Days");
    setSelectedSubject("All Subjects");
  };

  const filteredScheduleData = getFilteredTimetable();

  return (
    <div className="p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#1EA896] to-[#1EA896]/80 rounded-lg flex items-center justify-center">
            <Calendar className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Teaching Schedule</h1>
            <p className="text-white/70">Your weekly timetable across classes</p>
          </div>
        </div>

        <TeacherScheduleNote />

        <TeacherScheduleFilters
          selectedDay={selectedDay}
          onDayChange={setSelectedDay}
          selectedSubject={selectedSubject}
          onSubjectChange={setSelectedSubject}
          days={scheduleData.days}
          subjects={subjects}
          onReset={handleResetFilters}
        />

        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="p-4 text-left text-white font-semibold bg-white/5 min-w-[120px]">
                    Time
                  </th>
                  {filteredScheduleData.days.map((day) => (
                    <th key={day} className="p-4 text-center text-white font-semibold bg-white/5 min-w-[180px]">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredScheduleData.timeSlots.map((timeSlot, index) => (
                  <tr key={timeSlot} className={index % 2 === 0 ? "bg-white/5" : ""}>
                    <td className="p-4 text-white/80 font-medium border-r border-white/10">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-[#1EA896]" />
                        <span className="text-sm">{timeSlot}</span>
                      </div>
                    </td>

                    {filteredScheduleData.days.map((day) => {
                      const daySchedule = filteredScheduleData.timetable[day];
                      const classInfo = daySchedule ? (daySchedule as any)[timeSlot] : null;

                      return (
                        <td key={`${day}-${timeSlot}`} className="p-2">
                          {classInfo && (
                            <TeacherScheduleCard
                              subject={classInfo.subject}
                              classNameLabel={classInfo.className}
                              room={classInfo.room}
                              variant="desktop"
                            />
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

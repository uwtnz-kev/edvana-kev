// Helpers and seed data for the teacher schedule workspace.
export type ScheduleEntry = { subject: string; className: string; room: string };
export type ScheduleTimetable = Record<string, Record<string, ScheduleEntry>>;
export type ScheduleData = { timeSlots: string[]; days: string[]; timetable: ScheduleTimetable };

export const scheduleData: ScheduleData = {
  timeSlots: ["8:00 - 8:45", "8:45 - 9:30", "9:30 - 10:15", "10:15 - 10:30", "10:30 - 11:15", "11:15 - 12:00", "12:00 - 12:45", "12:45 - 13:30", "13:30 - 14:15", "14:15 - 15:00", "15:00 - 15:45"],
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
  },
};

export function getScheduleSubjects(data: ScheduleData) {
  return Array.from(new Set(Object.values(data.timetable).flatMap((day) => Object.values(day).map((info) => info.subject)))).filter(
    (subject) => subject !== "Break" && subject !== "Lunch Break"
  );
}

// Filter the timetable while preserving the original timeslot grid.
export function getFilteredSchedule(data: ScheduleData, selectedDay: string, selectedSubject: string) {
  if (selectedDay === "All Days" && selectedSubject === "All Subjects") return data;
  const filteredDays = selectedDay === "All Days" ? data.days : [selectedDay];
  const timetable = filteredDays.reduce<ScheduleTimetable>((acc, day) => {
    const daySchedule = data.timetable[day];
    if (!daySchedule) return acc;
    const entries = Object.entries(daySchedule).filter(([, info]) => {
      return selectedSubject === "All Subjects" || info.subject === selectedSubject;
    });
    if (entries.length > 0) acc[day] = Object.fromEntries(entries);
    return acc;
  }, {});
  return { ...data, days: filteredDays, timetable };
}

import { useState } from "react";
import { Calendar, Clock, MapPin, User } from "lucide-react";
import { ScheduleNote, ScheduleFilters, ScheduleCard } from "../components/schedule";

// Sample timetable data
const scheduleData = {
  timeSlots: [
    "8:00 - 8:45",
    "8:45 - 9:30", 
    "9:30 - 10:15",
    "10:15 - 10:30", // Break
    "10:30 - 11:15",
    "11:15 - 12:00",
    "12:00 - 12:45",
    "12:45 - 13:30", // Lunch
    "13:30 - 14:15",
    "14:15 - 15:00",
    "15:00 - 15:45"
  ],
  days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  timetable: {
    "Monday": {
      "8:00 - 8:45": { subject: "Mathematics", teacher: "Mr. Rwema", room: "A101" },
      "8:45 - 9:30": { subject: "Physics", teacher: "Mrs. Mukamana", room: "B203" },
      "9:30 - 10:15": { subject: "Chemistry", teacher: "Dr. Nzeyimana", room: "C105" },
      "10:15 - 10:30": { subject: "Break", teacher: "", room: "" },
      "10:30 - 11:15": { subject: "English", teacher: "Ms. Uwimana", room: "A102" },
      "11:15 - 12:00": { subject: "History", teacher: "Mr. Habimana", room: "D201" },
      "12:00 - 12:45": { subject: "Biology", teacher: "Mrs. Nyiramana", room: "C106" },
      "12:45 - 13:30": { subject: "Lunch Break", teacher: "", room: "" },
      "13:30 - 14:15": { subject: "French", teacher: "Mme. Mutesi", room: "A103" },
      "14:15 - 15:00": { subject: "Physical Education", teacher: "Coach Bizimana", room: "Gym" },
      "15:00 - 15:45": { subject: "Study Hall", teacher: "", room: "Library" }
    },
    "Tuesday": {
      "8:00 - 8:45": { subject: "Physics", teacher: "Mrs. Mukamana", room: "B203" },
      "8:45 - 9:30": { subject: "Mathematics", teacher: "Mr. Rwema", room: "A101" },
      "9:30 - 10:15": { subject: "English", teacher: "Ms. Uwimana", room: "A102" },
      "10:15 - 10:30": { subject: "Break", teacher: "", room: "" },
      "10:30 - 11:15": { subject: "Chemistry", teacher: "Dr. Nzeyimana", room: "C105" },
      "11:15 - 12:00": { subject: "Biology", teacher: "Mrs. Nyiramana", room: "C106" },
      "12:00 - 12:45": { subject: "Geography", teacher: "Mr. Kayitare", room: "D202" },
      "12:45 - 13:30": { subject: "Lunch Break", teacher: "", room: "" },
      "13:30 - 14:15": { subject: "Kinyarwanda", teacher: "Mrs. Uwamahoro", room: "A104" },
      "14:15 - 15:00": { subject: "Art", teacher: "Ms. Ingabire", room: "Art Studio" },
      "15:00 - 15:45": { subject: "Computer Science", teacher: "Mr. Nkurunziza", room: "IT Lab" }
    },
    "Wednesday": {
      "8:00 - 8:45": { subject: "Chemistry", teacher: "Dr. Nzeyimana", room: "C105" },
      "8:45 - 9:30": { subject: "Biology", teacher: "Mrs. Nyiramana", room: "C106" },
      "9:30 - 10:15": { subject: "Mathematics", teacher: "Mr. Rwema", room: "A101" },
      "10:15 - 10:30": { subject: "Break", teacher: "", room: "" },
      "10:30 - 11:15": { subject: "Physics", teacher: "Mrs. Mukamana", room: "B203" },
      "11:15 - 12:00": { subject: "English", teacher: "Ms. Uwimana", room: "A102" },
      "12:00 - 12:45": { subject: "French", teacher: "Mme. Mutesi", room: "A103" },
      "12:45 - 13:30": { subject: "Lunch Break", teacher: "", room: "" },
      "13:30 - 14:15": { subject: "History", teacher: "Mr. Habimana", room: "D201" },
      "14:15 - 15:00": { subject: "Music", teacher: "Mrs. Uwera", room: "Music Room" },
      "15:00 - 15:45": { subject: "Study Hall", teacher: "", room: "Library" }
    },
    "Thursday": {
      "8:00 - 8:45": { subject: "English", teacher: "Ms. Uwimana", room: "A102" },
      "8:45 - 9:30": { subject: "Chemistry", teacher: "Dr. Nzeyimana", room: "C105" },
      "9:30 - 10:15": { subject: "Physics", teacher: "Mrs. Mukamana", room: "B203" },
      "10:15 - 10:30": { subject: "Break", teacher: "", room: "" },
      "10:30 - 11:15": { subject: "Mathematics", teacher: "Mr. Rwema", room: "A101" },
      "11:15 - 12:00": { subject: "Biology", teacher: "Mrs. Nyiramana", room: "C106" },
      "12:00 - 12:45": { subject: "Kinyarwanda", teacher: "Mrs. Uwamahoro", room: "A104" },
      "12:45 - 13:30": { subject: "Lunch Break", teacher: "", room: "" },
      "13:30 - 14:15": { subject: "Geography", teacher: "Mr. Kayitare", room: "D202" },
      "14:15 - 15:00": { subject: "Physical Education", teacher: "Coach Bizimana", room: "Gym" },
      "15:00 - 15:45": { subject: "Computer Science", teacher: "Mr. Nkurunziza", room: "IT Lab" }
    },
    "Friday": {
      "8:00 - 8:45": { subject: "Mathematics", teacher: "Mr. Rwema", room: "A101" },
      "8:45 - 9:30": { subject: "English", teacher: "Ms. Uwimana", room: "A102" },
      "9:30 - 10:15": { subject: "Biology", teacher: "Mrs. Nyiramana", room: "C106" },
      "10:15 - 10:30": { subject: "Break", teacher: "", room: "" },
      "10:30 - 11:15": { subject: "French", teacher: "Mme. Mutesi", room: "A103" },
      "11:15 - 12:00": { subject: "Physics", teacher: "Mrs. Mukamana", room: "B203" },
      "12:00 - 12:45": { subject: "Chemistry", teacher: "Dr. Nzeyimana", room: "C105" },
      "12:45 - 13:30": { subject: "Lunch Break", teacher: "", room: "" },
      "13:30 - 14:15": { subject: "History", teacher: "Mr. Habimana", room: "D201" },
      "14:15 - 15:00": { subject: "Art", teacher: "Ms. Ingabire", room: "Art Studio" },
      "15:00 - 15:45": { subject: "Assembly", teacher: "", room: "Main Hall" }
    }
  }
};

export default function ScheduleView() {
  const [selectedDay, setSelectedDay] = useState("All Days");
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");

  // Extract unique subjects from timetable data
  const subjects = Array.from(new Set(
    Object.values(scheduleData.timetable).flatMap(daySchedule =>
      Object.values(daySchedule).map(classInfo => classInfo.subject)
    )
  )).filter(subject => subject !== "Break" && subject !== "Lunch Break");

  // Filter timetable data based on selected filters
  const getFilteredTimetable = () => {
    if (selectedDay === "All Days" && selectedSubject === "All Subjects") {
      return scheduleData;
    }

    const filteredTimetable: typeof scheduleData.timetable = {};
    const filteredDays = selectedDay === "All Days" ? scheduleData.days : [selectedDay];

    filteredDays.forEach(day => {
      if (scheduleData.timetable[day as keyof typeof scheduleData.timetable]) {
        const daySchedule = scheduleData.timetable[day as keyof typeof scheduleData.timetable];
        const filteredDaySchedule: Record<string, any> = {};

        Object.entries(daySchedule as Record<string, any>).forEach(([timeSlot, classInfo]) => {
          if (selectedSubject === "All Subjects" || classInfo.subject === selectedSubject) {
            filteredDaySchedule[timeSlot] = classInfo;
          }
        });

        if (Object.keys(filteredDaySchedule).length > 0) {
          filteredTimetable[day as keyof typeof filteredTimetable] = filteredDaySchedule;
        }
      }
    });

    return {
      ...scheduleData,
      days: filteredDays,
      timetable: filteredTimetable
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
        {/* Header */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#1EA896] to-[#1EA896]/80 rounded-lg flex items-center justify-center">
            <Calendar className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Daily Schedule</h1>
            <p className="text-white/70">Your weekly class timetable</p>
          </div>
        </div>

        {/* Notice */}
        <ScheduleNote />

        {/* Filters */}
        <ScheduleFilters
          selectedDay={selectedDay}
          onDayChange={setSelectedDay}
          selectedSubject={selectedSubject}
          onSubjectChange={setSelectedSubject}
          days={scheduleData.days}
          subjects={subjects}
          onReset={handleResetFilters}
        />

        {/* Timetable */}
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
                      const daySchedule = filteredScheduleData.timetable[day as keyof typeof filteredScheduleData.timetable];
                      const classInfo = daySchedule ? (daySchedule as any)[timeSlot] : null;
                      return (
                        <td key={`${day}-${timeSlot}`} className="p-2">
                          {classInfo && (
                            <ScheduleCard
                              subject={classInfo.subject}
                              teacher={classInfo.teacher}
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
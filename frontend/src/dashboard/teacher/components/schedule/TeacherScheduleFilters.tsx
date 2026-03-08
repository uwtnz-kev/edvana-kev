/**
 * TeacherScheduleFilters
 * ----------------------
 * Renders schedule filters using the same structure as the assignments filter bar.
 */
import { SlidersHorizontal } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TeacherScheduleFiltersProps {
  selectedDay: string;
  onDayChange: (day: string) => void;
  selectedSubject: string;
  onSubjectChange: (subject: string) => void;
  days: string[];
  subjects: string[];
}

export function TeacherScheduleFilters({
  selectedDay,
  onDayChange,
  selectedSubject,
  onSubjectChange,
  days,
  subjects,
}: TeacherScheduleFiltersProps) {
  const allDays = ["All Days", ...days];
  const allSubjects = ["All Subjects", ...subjects];

  return (
    <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-2xl p-4 transition-colors duration-200 hover:bg-white/20">
      <div className="flex flex-col lg:flex-row lg:items-center gap-3">
        <div className="flex items-center gap-2 text-white/80">
          <SlidersHorizontal className="h-4 w-4 text-teal-600" />
          <span className="text-sm font-medium">Filters</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <Select value={selectedDay} onValueChange={onDayChange}>
            <SelectTrigger className="sm:w-44 bg-white/10 border-white/10 backdrop-blur-xl rounded-2xl text-white">
              <SelectValue placeholder="All Days" />
            </SelectTrigger>
            <SelectContent className="bg-white/10 border-white/10 backdrop-blur-xl text-white rounded-2xl">
              {allDays.map((day) => (
                <SelectItem key={day} value={day} className="focus:bg-white/10">
                  {day}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedSubject} onValueChange={onSubjectChange}>
            <SelectTrigger className="sm:w-44 bg-white/10 border-white/10 backdrop-blur-xl rounded-2xl text-white">
              <SelectValue placeholder="All Subjects" />
            </SelectTrigger>
            <SelectContent className="bg-white/10 border-white/10 backdrop-blur-xl text-white rounded-2xl">
              {allSubjects.map((subject) => (
                <SelectItem key={subject} value={subject} className="focus:bg-white/10">
                  {subject}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}




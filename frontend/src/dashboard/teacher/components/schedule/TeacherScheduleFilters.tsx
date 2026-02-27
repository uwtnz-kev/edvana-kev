import { Filter, Calendar } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface TeacherScheduleFiltersProps {
  selectedDay: string;
  onDayChange: (day: string) => void;
  selectedSubject: string;
  onSubjectChange: (subject: string) => void;
  days: string[];
  subjects: string[];
  onReset: () => void;
}

export function TeacherScheduleFilters({
  selectedDay,
  onDayChange,
  selectedSubject,
  onSubjectChange,
  days,
  subjects,
  onReset,
}: TeacherScheduleFiltersProps) {
  const allDays = ["All Days", ...days];
  const allSubjects = ["All Subjects", ...subjects];

  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 transition-all duration-300 ease-in-out hover:bg-white/10 hover:border-white/20 hover:shadow-xl">
      <div className="flex items-center space-x-3 mb-4">
        <Filter className="h-5 w-5 text-[#1EA896]" />
        <h3 className="text-lg font-semibold text-white">Filter Schedule</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Day */}
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">Day</label>
          <Select value={selectedDay} onValueChange={onDayChange}>
            <SelectTrigger className="bg-[#D6CBB6] border border-[#8B5E3C]/40 text-[#3B2A1A] focus:border-[#8B5E3C] focus:ring-[#8B5E3C]/20 hover:border-[#8B5E3C]/60 transition-colors duration-200">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-[#1EA896]" />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-[#D6CBB6] border border-[#8B5E3C]/40 text-[#3B2A1A]">
              {allDays.map((day) => (
                <SelectItem
                  key={day}
                  value={day}
                  className="text-[#3B2A1A] hover:bg-[#CBB89D] focus:bg-[#CBB89D]"
                >
                  {day}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Subject */}
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">Subject</label>
          <Select value={selectedSubject} onValueChange={onSubjectChange}>
            <SelectTrigger className="bg-[#D6CBB6] border border-[#8B5E3C]/40 text-[#3B2A1A] focus:border-[#8B5E3C] focus:ring-[#8B5E3C]/20 hover:border-[#8B5E3C]/60 transition-colors duration-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#D6CBB6] border border-[#8B5E3C]/40 text-[#3B2A1A]">
              {allSubjects.map((subject) => (
                <SelectItem
                  key={subject}
                  value={subject}
                  className="text-[#3B2A1A] hover:bg-[#CBB89D] focus:bg-[#CBB89D]"
                >
                  {subject}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Reset */}
        <div className="flex items-end">
          <Button
            onClick={onReset}
            variant="outline"
            className="w-full bg-[#D6CBB6] border border-[#8B5E3C]/40 text-[#3B2A1A] hover:bg-[#CBB89D] hover:border-[#8B5E3C]/60 transition-colors duration-200"
          >
            Reset Filters
          </Button>
        </div>
      </div>
    </div>
  );
}
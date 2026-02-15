import { Filter, Calendar } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface ScheduleFiltersProps {
  selectedDay: string;
  onDayChange: (day: string) => void;
  selectedSubject: string;
  onSubjectChange: (subject: string) => void;
  days: string[];
  subjects: string[];
  onReset: () => void;
}

export function ScheduleFilters({
  selectedDay,
  onDayChange,
  selectedSubject,
  onSubjectChange,
  days,
  subjects,
  onReset
}: ScheduleFiltersProps) {
  const allDays = ["All Days", ...days];
  const allSubjects = ["All Subjects", ...subjects];

  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
      <div className="flex items-center space-x-3 mb-4">
        <Filter className="h-5 w-5 text-[#1EA896]" />
        <h3 className="text-lg font-semibold text-white">Filter Schedule</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Day Filter */}
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            Day
          </label>
          <Select value={selectedDay} onValueChange={onDayChange}>
            <SelectTrigger className="bg-white/5 border-white/20 text-white focus:border-[#1EA896] focus:ring-[#1EA896]/20">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-[#1EA896]" />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-[#4C5454] border-white/20">
              {allDays.map(day => (
                <SelectItem key={day} value={day} className="text-white hover:bg-white/10 focus:bg-white/10">
                  {day}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Subject Filter */}
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            Subject
          </label>
          <Select value={selectedSubject} onValueChange={onSubjectChange}>
            <SelectTrigger className="bg-white/5 border-white/20 text-white focus:border-[#1EA896] focus:ring-[#1EA896]/20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#4C5454] border-white/20">
              {allSubjects.map(subject => (
                <SelectItem key={subject} value={subject} className="text-white hover:bg-white/10 focus:bg-white/10">
                  {subject}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Reset Button */}
        <div className="flex items-end">
          <Button
            onClick={onReset}
            variant="outline"
            className="w-full bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30"
          >
            Reset Filters
          </Button>
        </div>
      </div>

      {/* Active Filters Summary */}
      {(selectedDay !== "All Days" || selectedSubject !== "All Subjects") && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <p className="text-white/70 text-sm">
            Active filters:
            {selectedDay !== "All Days" && ` Day: ${selectedDay}`}
            {selectedSubject !== "All Subjects" && ` Subject: ${selectedSubject}`}
          </p>
        </div>
      )}
    </div>
  );
}
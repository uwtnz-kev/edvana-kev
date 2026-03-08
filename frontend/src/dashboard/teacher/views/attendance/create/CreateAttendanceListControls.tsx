// Renders class, subject, and date controls for the attendance draft.
import { TeacherDatePicker } from "@/dashboard/teacher/components/shared";
import {
  GlassSelect, GlassSelectContent, GlassSelectItem, GlassSelectTrigger, GlassSelectValue,
} from "@/dashboard/schooladmin/components/ui/GlassSelect";

type Props = {
  classOptions: string[];
  classValue: string;
  date: Date | null;
  onClassChange: (value: string) => void;
  onDateChange: (value: Date | null) => void;
  subjectName: string;
};

export function AttendanceListControls({ classOptions, classValue, date, onClassChange, onDateChange, subjectName }: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">Class</label>
        <GlassSelect value={classValue} onValueChange={onClassChange}>
          <GlassSelectTrigger className="w-full bg-white/10 border border-white/10 text-white"><GlassSelectValue placeholder="Choose a class" /></GlassSelectTrigger>
          <GlassSelectContent>{classOptions.map((option) => <GlassSelectItem key={option} value={option}>{option}</GlassSelectItem>)}</GlassSelectContent>
        </GlassSelect>
      </div>
      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">Subject</label>
        <div className="h-10 rounded-xl border border-white/10 bg-white/10 px-3 flex items-center text-white/90">{subjectName}</div>
      </div>
      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">Date</label>
        <TeacherDatePicker value={date} onChange={onDateChange} placeholder="Pick a date" />
      </div>
    </div>
  );
}



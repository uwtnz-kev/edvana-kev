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
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-white/80">Subject</label>
        <div className="flex h-12 items-center rounded-xl border border-white/10 bg-white/10 px-3 text-[var(--text-primary)]">{subjectName}</div>
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-white/80">Class</label>
        <GlassSelect value={classValue} onValueChange={onClassChange}>
          <GlassSelectTrigger className="h-12 w-full justify-start gap-2 bg-white/10 border border-white/10 text-left text-white [&>span]:order-2 [&>span]:text-white [&_svg]:order-1 [&_svg]:text-white [&_svg]:opacity-80">
            <GlassSelectValue placeholder="Choose a class" />
          </GlassSelectTrigger>
          <GlassSelectContent>{classOptions.map((option) => <GlassSelectItem key={option} value={option}>{option}</GlassSelectItem>)}</GlassSelectContent>
        </GlassSelect>
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-white/80">Date</label>
        <div className="w-full [&_button]:h-12 [&_button]:w-full [&_button]:rounded-2xl">
          <TeacherDatePicker value={date} onChange={onDateChange} placeholder="Pick a date" />
        </div>
      </div>
    </div>
  );
}




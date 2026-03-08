/**
 * TeacherExamDueDatePicker
 * ------------------------
 * Provides supporting UI for the teacher dashboard e xa ms c re at e feature.
 */
import { TeacherDateTimePicker } from "@/dashboard/teacher/components/shared";

type Props = {
  value: string;
  onChange: (nextValue: string) => void;
  onBlur?: () => void;
};

function parseISODate(value: string): Date | null {
  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }
  const parsed = new Date(trimmed);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function TeacherExamDueDatePicker({ value, onChange, onBlur }: Props) {
  const parsedValue = parseISODate(value);

  return (
    <TeacherDateTimePicker
      value={parsedValue}
      onChange={(nextDate) => {
        onChange(nextDate ? nextDate.toISOString() : "");
        onBlur?.();
      }}
      placeholder="Pick scheduled date and time"
    />
  );
}




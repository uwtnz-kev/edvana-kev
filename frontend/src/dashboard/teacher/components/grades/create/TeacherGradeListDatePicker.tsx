/**
 * TeacherGradeListDatePicker
 * --------------------------
 * Provides supporting UI for the teacher dashboard g ra de s c re at e feature.
 */
import { TeacherDatePicker } from "@/dashboard/teacher/components/shared";

type Props = {
  value: string;
  onChange: (nextValue: string) => void;
  onBlur?: () => void;
};

function parseDate(value: string): Date | null {
  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  const ymdMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(trimmed);
  if (ymdMatch) {
    const year = Number(ymdMatch[1]);
    const month = Number(ymdMatch[2]) - 1;
    const day = Number(ymdMatch[3]);
    const parsed = new Date(year, month, day);
    if (!Number.isNaN(parsed.getTime())) {
      return parsed;
    }
  }

  const parsed = new Date(trimmed);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }
  return parsed;
}

function toDateValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function TeacherGradeListDatePicker({ value, onChange, onBlur }: Props) {
  const parsedValue = parseDate(value);

  return (
    <TeacherDatePicker
      value={parsedValue}
      onChange={(nextDate) => {
        onChange(nextDate ? toDateValue(nextDate) : "");
        onBlur?.();
      }}
      placeholder="Pick date"
    />
  );
}


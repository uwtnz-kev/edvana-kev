// Shared constants and types for the teacher date-time picker.
export type Meridiem = "AM" | "PM";

export const HOURS = Array.from({ length: 12 }, (_, index) => String(index + 1));

export type TeacherDateTimePickerProps = {
  value: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  timeStepMinutes?: number;
};

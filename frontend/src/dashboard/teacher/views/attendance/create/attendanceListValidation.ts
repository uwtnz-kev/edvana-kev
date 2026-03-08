// Keeps create-attendance validation rules in one place.
type Args = {
  classValue: string;
  date: Date | null;
  rowCount: number;
};

export function canSaveAttendanceList({ classValue, date, rowCount }: Args) {
  return Boolean(classValue && date && rowCount > 0);
}

// Filter controls wrapper for the teacher schedule workspace.
import { TeacherScheduleFilters } from "../../components/schedule";

type Props = {
  days: string[];
  onDayChange: (day: string) => void;
  onSubjectChange: (subject: string) => void;
  selectedDay: string;
  selectedSubject: string;
  subjects: string[];
};

export function ScheduleFilters(props: Props) {
  return <TeacherScheduleFilters {...props} />;
}

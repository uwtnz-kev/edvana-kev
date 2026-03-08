// Renders the teacher subject card stats row.
import { ClipboardList, Users } from "lucide-react";
import type { TeacherSubjectNavData } from "../TeacherSubjectCard";
import { getStudentsLabel, getToGradeLabel } from "./subjectCardHelpers";

type Props = {
  subject: TeacherSubjectNavData;
};

export function SubjectCardMeta({ subject }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-4 mb-4">
      <div className="flex items-center gap-2">
        <Users className="h-4 w-4 text-white/60" />
        <span className="text-white/80 text-sm">{getStudentsLabel(subject)}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-white/60 text-sm">Classes</span>
        <span className="text-white/80 text-sm">{subject.classesCount}</span>
      </div>
      <div className="flex items-center gap-2">
        <ClipboardList className="h-4 w-4 text-white/60" />
        <span className="text-white/80 text-sm">{getToGradeLabel(subject)}</span>
      </div>
    </div>
  );
}

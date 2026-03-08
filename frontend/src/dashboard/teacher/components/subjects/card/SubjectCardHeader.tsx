// Renders the teacher subject card icon, title block, and pending summary.
import { BookOpen } from "lucide-react";
import type { SubjectTheme } from "@/dashboard/teacher/components/shared";
import type { TeacherSubjectNavData } from "../TeacherSubjectCard";
import { getPendingLabel, getPendingProgressWidth } from "./subjectCardHelpers";

type Props = {
  subject: TeacherSubjectNavData;
  theme: SubjectTheme;
};

export function SubjectCardHeader({ subject, theme }: Props) {
  return (
    <>
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-12 h-12 ${theme.bgClass} rounded-xl flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110`}
        >
          <BookOpen className={`h-6 w-6 ${theme.iconClass}`} />
        </div>
        <div className="text-right">
          <span className={`text-sm font-medium ${subject.color}`}>{getPendingLabel(subject)}</span>
          <div className="w-20 bg-white/20 rounded-full h-2 mt-1">
            <div
              className={`h-2 rounded-full ${subject.bgGradient} transition-all duration-300`}
              style={{ width: getPendingProgressWidth(subject.pendingToGrade) }}
            />
          </div>
        </div>
      </div>

      <h3 className="text-xl font-bold text-white mb-2 transition-colors duration-200 group-hover:text-white/90">
        {subject.title}
      </h3>
      <p className="text-white/70 text-sm mb-4 line-clamp-2">{subject.description}</p>
    </>
  );
}

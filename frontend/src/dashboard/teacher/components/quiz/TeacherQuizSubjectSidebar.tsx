/**
 * TeacherQuizSubjectSidebar
 * -------------------------
 * Renders the sidebar content for the teacher dashboard q ui z feature.
 */
import { BookOpen } from "lucide-react";
import type { TeacherSubject2 } from "./QuizTypes";
import { DEFAULT_SUBJECT_ICON_THEME, SUBJECT_ICON_THEME } from "./QuizTheme";

type Props = {
  subjects: TeacherSubject2[];
  selectedSubjectId: string | null;
  onSelectSubject: (subjectId: string | null) => void;
};

export function TeacherQuizSubjectSidebar({
  subjects,
  selectedSubjectId,
  onSelectSubject,
}: Props) {
  return (
    <aside className="teacher-panel-surface rounded-2xl p-3">
      <div className="px-2 pt-1 pb-3">
        <h2 className="text-white text-sm font-semibold">Subjects</h2>
      </div>

      <div className="space-y-2">
        {subjects.map((subject) => {
          const isActive = selectedSubjectId === subject.id;
          const theme = SUBJECT_ICON_THEME[subject.name] ?? DEFAULT_SUBJECT_ICON_THEME;

          return (
            <button
              key={subject.id}
              type="button"
              onClick={() => onSelectSubject(isActive ? null : subject.id)}
              className={[
                "group w-full text-left rounded-2xl border px-4 py-3",
                "flex items-center gap-3",
                "transition-all duration-200 hover:shadow-sm hover:-translate-y-[1px]",
                isActive
                  ? "bg-white/25 border-white/30 text-white"
                  : "bg-white/5 border-white/10 text-white/90 hover:bg-white/25 hover:border-white/20",
              ].join(" ")}
            >
              <div
                className={`h-9 w-9 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-105 ${theme.bg}`}
              >
                <BookOpen className={`h-4 w-4 ${theme.text}`} />
              </div>
              <span className="text-sm font-medium truncate">{subject.name}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}




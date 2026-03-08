/**
 * TeacherAssignmentsSubjectSidebar
 * --------------------------------
 * Renders the sidebar content for the teacher dashboard a ss ig nm en ts feature.
 */
import { BookOpen } from "lucide-react";
import type { TeacherSubject2 } from "./AssignmentsTypes";
import { getSubjectThemeById } from "../shared";

type ChildOption = {
  value: string;
  label: string;
};

type Props = {
  subjects: TeacherSubject2[];
  selectedSubjectId: string | null;
  onSelectSubject: (subjectId: string | null) => void;
  childOptions?: ChildOption[];
  activeChildValue?: string | null;
  onSelectChild?: (value: string) => void;
};

export function TeacherAssignmentsSubjectSidebar({
  subjects,
  selectedSubjectId,
  onSelectSubject,
  childOptions = [],
  activeChildValue = null,
  onSelectChild,
}: Props) {
  return (
    <aside className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-2xl p-3">
      <div className="px-2 pt-1 pb-3">
        <h2 className="text-white text-sm font-semibold">Subjects</h2>
      </div>

      <div className="space-y-2">
        {subjects.map((subject) => {
          const isActive = selectedSubjectId === subject.id;
          const theme = getSubjectThemeById(subject.id);

          return (
            <div key={subject.id} className="space-y-2">
              {!isActive ? (
                <button
                  type="button"
                  onClick={() => onSelectSubject(subject.id)}
                  className={[
                    "group w-full text-left rounded-2xl border px-4 py-3",
                    "flex items-center gap-3",
                    "bg-white/5 border-white/10 text-white/90",
                    "transition-all duration-200 hover:bg-white/25 hover:border-white/20 hover:shadow-sm hover:-translate-y-[1px]",
                  ].join(" ")}
                >
                  <div
                    className={`h-9 w-9 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-105 ${theme.bgClass}`}
                  >
                    <BookOpen className={`h-4 w-4 ${theme.iconClass}`} />
                  </div>
                  <span className="text-sm font-medium truncate">{subject.name}</span>
                </button>
              ) : null}

              {isActive && childOptions.length > 0 ? (
                <div className="space-y-2">
                  {childOptions.map((option) => {
                    const isChildActive = activeChildValue === option.value;

                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => onSelectChild?.(option.value)}
                        className={[
                          "w-full rounded-xl px-3 py-2 text-left text-sm font-medium transition-all duration-200",
                          isChildActive
                            ? "border border-white/25 bg-white/20 text-white shadow-sm"
                            : "border border-white/10 bg-white/10 text-white/90 hover:border-white/20 hover:bg-white/16 hover:text-white",
                        ].join(" ")}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </aside>
  );
}



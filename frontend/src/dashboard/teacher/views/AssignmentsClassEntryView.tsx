import { ClipboardList, GraduationCap, LayoutPanelLeft, Sparkles } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { TeacherAssignmentsHeader } from "@/dashboard/teacher/components/assignments";
import { getTeacherSubjectClass, teacherSubjectClasses } from "@/dashboard/teacher/data/teacherSubjectsByClass";
import { buildClassSearch, getClassIdFromSearchParams } from "./subjects/subjectClassRouting";

export default function AssignmentsClassEntryView() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedClassId = getClassIdFromSearchParams(searchParams);
  const selectedClass = getTeacherSubjectClass(selectedClassId);

  const handleSelectClass = (classId: string) => {
    navigate({
      pathname: "/dashboard/teacher/assignments",
      search: buildClassSearch(classId),
    });
  };

  return (
    <div className="w-full overflow-x-hidden p-4 sm:p-6" style={{ overflowX: "hidden" }}>
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex w-full gap-6 overflow-x-hidden">
          <aside className="w-[220px] shrink-0">
            <section className="teacher-panel-surface rounded-2xl p-3">
              <div className="px-2 pb-3 pt-1">
                <h2 className="text-sm font-semibold text-white">Classes</h2>
              </div>

              <div className="space-y-2">
                {teacherSubjectClasses.map((teacherClass) => {
                  const isSelected = selectedClass?.classId === teacherClass.classId;
                  return (
                    <button
                      key={teacherClass.classId}
                      type="button"
                      onClick={() => handleSelectClass(teacherClass.classId)}
                      className={`group flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-all duration-200 ${
                        isSelected
                          ? "border-white/20 bg-white/20 text-white shadow-sm"
                          : "border-white/10 bg-white/5 text-white/90 hover:-translate-y-[1px] hover:border-white/20 hover:bg-white/20 hover:shadow-sm"
                      }`}
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--sidebar-item-active)] text-[var(--accent-primary)] transition-transform duration-200 group-hover:scale-105">
                        <GraduationCap className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-medium">{teacherClass.classLabel}</span>
                    </button>
                  );
                })}
              </div>
            </section>
          </aside>

          <section className="min-w-0 flex-1 space-y-4">
            <TeacherAssignmentsHeader
              title="Assignments"
              subtitle="Choose a class to open the assignments workspace"
              subjectId={null}
              showBack={false}
              showCreate={false}
              onBack={() => {}}
              canCreate={false}
              onCreate={() => {}}
            />

            <div className="grid gap-4 lg:grid-cols-2">
              <section className="teacher-panel-surface rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-blue-500/20 text-blue-400 backdrop-blur">
                    <LayoutPanelLeft className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1EA896]">Assignments Entry</p>
                    <h2 className="mt-2 text-xl font-semibold text-[var(--text-primary)]">Start with a class</h2>
                    <p className="mt-2 max-w-2xl text-sm text-[var(--text-secondary)]">
                      Select a section from the left panel to open Assignments in that class context.
                    </p>
                  </div>
                </div>
              </section>

              <section className="teacher-panel-surface rounded-2xl p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-purple-500/20 text-purple-400 backdrop-blur">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <h3 className="font-semibold text-white">What happens next</h3>
                </div>
                <p className="mt-3 text-sm text-[var(--text-secondary)]">
                  After you choose a class, this page loads the current Assignments workspace and keeps the class in the URL.
                </p>
              </section>

              <section className="teacher-panel-surface rounded-2xl p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-amber-500/20 text-amber-300 backdrop-blur">
                    <ClipboardList className="h-4 w-4" />
                  </div>
                  <h3 className="font-semibold text-white">Available sections</h3>
                </div>
                <p className="mt-3 text-sm text-[var(--text-secondary)]">
                  S1A, S3A, S5B, S6A, and S6B are available for class-scoped assignment access.
                </p>
              </section>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

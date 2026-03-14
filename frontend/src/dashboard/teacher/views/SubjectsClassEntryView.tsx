import { useMemo } from "react";
import { BookOpenCheck, GraduationCap, LayoutPanelLeft, Sparkles } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { TeacherAssignmentsSubjectSidebar } from "@/dashboard/teacher/components/assignments";
import {
  getSubjectsForClass,
  getTeacherSubjectClass,
  teacherSubjectClasses,
} from "@/dashboard/teacher/data/teacherSubjectsByClass";
import { TeacherSubjectsHeader } from "@/dashboard/teacher/components/subjects";
import {
  appendClassIdToPath,
  buildClassSearch,
  getClassIdFromSearchParams,
} from "./subjects/subjectClassRouting";

export default function SubjectsClassEntryView() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedClassId = getClassIdFromSearchParams(searchParams);
  const selectedClass = getTeacherSubjectClass(selectedClassId);
  const classSubjects = useMemo(() => getSubjectsForClass(selectedClassId), [selectedClassId]);

  const handleSelectClass = (classId: string) => {
    navigate({
      pathname: "/dashboard/teacher/subjects",
      search: buildClassSearch(classId),
    });
  };

  const handleOpenSubject = (subjectId: string, subjectName: (typeof classSubjects)[number]) => {
    if (selectedClassId) {
      navigate(`/dashboard/teacher/subjects/${subjectId}?classId=${selectedClassId}`, {
        state: { restoreSubjectId: subjectId, subject: subjectName },
      });
      return;
    }

    navigate(`/dashboard/teacher/subjects/${subjectId}`, {
      state: { restoreSubjectId: subjectId, subject: subjectName },
    });
  };

  return (
    <div className="w-full overflow-x-hidden p-4 sm:p-6" style={{ overflowX: "hidden" }}>
      <div className="mx-auto w-full max-w-7xl">
        {!selectedClass ? (
          <div className="flex w-full gap-6 overflow-x-hidden">
            <aside className="w-[220px] shrink-0">
              <section className="teacher-panel-surface rounded-2xl p-3">
                <div className="px-2 pb-3 pt-1">
                  <h2 className="text-sm font-semibold text-white">Classes</h2>
                </div>

                <div className="space-y-2">
                  {teacherSubjectClasses.map((teacherClass) => (
                    <button
                      key={teacherClass.classId}
                      type="button"
                      onClick={() => handleSelectClass(teacherClass.classId)}
                      className="group flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-white/90 transition-all duration-200 hover:-translate-y-[1px] hover:border-white/20 hover:bg-white/20 hover:shadow-sm"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--sidebar-item-active)] text-[var(--accent-primary)] transition-transform duration-200 group-hover:scale-105">
                        <GraduationCap className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-medium">{teacherClass.classLabel}</span>
                    </button>
                  ))}
                </div>
              </section>
            </aside>

            <section className="min-w-0 flex-1 space-y-4">
              <TeacherSubjectsHeader
                title="Subjects"
                subtitle="Choose a class to view its subject cards"
              />

              <div className="grid gap-4 lg:grid-cols-2">
                <section className="teacher-panel-surface rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-blue-500/20 text-blue-400 backdrop-blur">
                      <LayoutPanelLeft className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1EA896]">
                        Subject Entry
                      </p>
                      <h2 className="mt-2 text-xl font-semibold text-[var(--text-primary)]">
                        Start with a class
                      </h2>
                      <p className="mt-2 max-w-2xl text-sm text-[var(--text-secondary)]">
                        Select a section from the left panel to open the subjects workspace for that class.
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
                    After you choose a class, this page swaps directly to the current subject card layout.
                  </p>
                </section>

                <section className="teacher-panel-surface rounded-2xl p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-amber-500/20 text-amber-300 backdrop-blur">
                      <GraduationCap className="h-4 w-4" />
                    </div>
                    <h3 className="font-semibold text-white">Available sections</h3>
                  </div>
                  <p className="mt-3 text-sm text-[var(--text-secondary)]">
                    S1A, S1B, S2A, S2B, S3A, S3B, S4A, and S4B are wired with mock subject access for now.
                  </p>
                </section>
              </div>
            </section>
          </div>
        ) : (
          <div className="flex w-full gap-6 overflow-x-hidden">
            <aside className="w-[220px] shrink-0">
              <TeacherAssignmentsSubjectSidebar
                subjects={classSubjects}
                selectedSubjectId={null}
                onSelectSubject={(subjectId) => {
                  const subject = classSubjects.find((item) => item.id === subjectId);
                  if (!subject) return;

                  if (selectedClassId) {
                    navigate(`/dashboard/teacher/subjects/${subject.id}?classId=${selectedClassId}`, {
                      state: { restoreSubjectId: subject.id, subject },
                    });
                  } else {
                    navigate(`/dashboard/teacher/subjects/${subject.id}`, {
                      state: { restoreSubjectId: subject.id, subject },
                    });
                  }
                }}
              />
            </aside>

            <section className="min-w-0 flex-1 space-y-4">
              <TeacherSubjectsHeader
                title="Subjects"
                subtitle={`Class: ${selectedClass.classLabel}`}
                showBack
                onBack={() => navigate("/dashboard/teacher/subjects")}
              />

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <section className="rounded-2xl teacher-panel-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--sidebar-item-active)] p-3 text-[var(--accent-primary)]">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <h3 className="text-white font-semibold">Quick Actions</h3>
                  </div>
                  <p className="mt-2 text-sm text-white/60">
                    Review the subjects assigned to {selectedClass.classLabel}, then open one to continue into Modules or Upload Module.
                  </p>
                </section>

                <section className="rounded-2xl teacher-panel-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/15 p-3 text-blue-300">
                      <BookOpenCheck className="h-4 w-4" />
                    </div>
                    <h3 className="text-white font-semibold">Tip</h3>
                  </div>
                  <p className="mt-2 text-sm text-white/60">
                    The selected class stays in the URL, so refresh keeps the teaching context while you move into subject modules.
                  </p>
                </section>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

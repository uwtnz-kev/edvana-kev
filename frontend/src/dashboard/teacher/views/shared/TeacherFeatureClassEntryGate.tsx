import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { GraduationCap, LayoutPanelLeft, Sparkles } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getSubjectIconTheme, type SubjectIconTheme } from "@/dashboard/teacher/components/shared";
import { getTeacherSubjectClass, teacherSubjectClasses } from "@/dashboard/teacher/data/teacherSubjectsByClass";
import { buildClassSearch, getClassIdFromSearchParams } from "../subjects/subjectClassRouting";

type RenderArgs = {
  classId: string;
  classLabel: string;
  onBackToEntry: () => void;
};

type Props = {
  entryPath: string;
  featureKey: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  infoCardClassName?: string;
  renderHeaderIcon?: (args: { Icon: LucideIcon; theme: SubjectIconTheme }) => ReactNode;
  children: (args: RenderArgs) => ReactNode;
};

export function TeacherFeatureClassEntryGate({
  entryPath,
  featureKey,
  title,
  subtitle,
  icon: Icon,
  infoCardClassName = "",
  renderHeaderIcon,
  children,
}: Props) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedClassId = getClassIdFromSearchParams(searchParams);
  const selectedClass = getTeacherSubjectClass(selectedClassId);
  const theme = getSubjectIconTheme(featureKey);
  const headerIcon = renderHeaderIcon
    ? renderHeaderIcon({ Icon, theme })
    : (
      <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${theme.bgClass}`}>
        <Icon className={`h-6 w-6 ${theme.iconClass}`} />
      </div>
    );

  if (!selectedClass) {
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
                  {teacherSubjectClasses.map((teacherClass) => (
                    <button
                      key={teacherClass.classId}
                      type="button"
                      onClick={() =>
                        navigate({
                          pathname: entryPath,
                          search: buildClassSearch(teacherClass.classId),
                        })
                      }
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
              <header className="teacher-panel-surface rounded-2xl px-6 py-5">
                <div className="flex items-center gap-4">
                  {headerIcon}
                  <div>
                    <h1 className="text-2xl font-semibold text-white">{title}</h1>
                    <p className="mt-1 text-[var(--text-secondary)]">{subtitle}</p>
                  </div>
                </div>
              </header>

              <div className="grid gap-4 lg:grid-cols-2">
                <section className={`teacher-panel-surface rounded-2xl p-6 ${infoCardClassName}`.trim()}>
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-blue-500/20 text-blue-400 backdrop-blur">
                      <LayoutPanelLeft className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1EA896]">{title} Entry</p>
                      <h2 className="mt-2 text-xl font-semibold text-[var(--text-primary)]">Start with a class</h2>
                      <p className="mt-2 max-w-2xl text-sm text-[var(--text-secondary)]">
                        Select a section from the left panel to open the {title.toLowerCase()} workspace for that class.
                      </p>
                    </div>
                  </div>
                </section>

                <section className={`teacher-panel-surface rounded-2xl p-5 ${infoCardClassName}`.trim()}>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-purple-500/20 text-purple-400 backdrop-blur">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <h3 className="font-semibold text-white">What happens next</h3>
                  </div>
                  <p className="mt-3 text-sm text-[var(--text-secondary)]">
                    After you choose a class, this page loads the current {title.toLowerCase()} view and keeps the class in the URL.
                  </p>
                </section>

                <section className={`teacher-panel-surface rounded-2xl p-5 ${infoCardClassName}`.trim()}>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-amber-500/20 text-amber-300 backdrop-blur">
                      <GraduationCap className="h-4 w-4" />
                    </div>
                    <h3 className="font-semibold text-white">Available sections</h3>
                  </div>
                  <p className="mt-3 text-sm text-[var(--text-secondary)]">S1A, S3A, S5B, S6A, and S6B are available in this class-scoped view.</p>
                </section>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }

  return <>{children({ classId: selectedClass.classId, classLabel: selectedClass.classLabel, onBackToEntry: () => navigate(entryPath) })}</>;
}

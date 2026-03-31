import { useMemo, useState, type ReactNode } from "react";
import { ArrowLeft, BookOpen, CalendarClock, GraduationCap, RotateCcw, Users, UserRoundCheck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { TeacherDateTimePicker } from "@/dashboard/teacher/components/shared";
import { getSubjectIconTheme } from "@/dashboard/teacher/components/shared/subjectIconTheme";
import { cn } from "@/utils/cn";
import type { TeacherAssignment } from "../AssignmentsTypes";
import type { RepublishAssignmentPayload, RepublishAudienceSelection, RepublishEligibleStudent } from "./republishTypes";

type SelectionMode = "class" | "students";
type RepublishStep = "audience" | "schedule";

type Props = {
  assignment: TeacherAssignment;
  eligibleStudents: RepublishEligibleStudent[];
  onBackToAssignments: () => void;
  onConfirm: (payload: RepublishAssignmentPayload) => void;
};

function parseISODate(value: string): Date | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = new Date(trimmed);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function RepublishAssignmentPage({ assignment, eligibleStudents, onBackToAssignments, onConfirm }: Props) {
  const theme = getSubjectIconTheme(assignment.subject);
  const [step, setStep] = useState<RepublishStep>("audience");
  const [mode, setMode] = useState<SelectionMode>("class");
  const [studentSearch, setStudentSearch] = useState("");
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);
  const [closeDateTime, setCloseDateTime] = useState("");
  const [pendingSelection, setPendingSelection] = useState<RepublishAudienceSelection | null>(null);

  const confirmDisabled = mode === "students" && selectedStudentIds.length === 0;
  const filteredEligibleStudents = useMemo(() => {
    const normalizedStudentSearch = studentSearch.trim().toLowerCase();
    if (!normalizedStudentSearch) return eligibleStudents;

    return eligibleStudents.filter((student) => student.fullName.toLowerCase().includes(normalizedStudentSearch));
  }, [eligibleStudents, studentSearch]);
  const eligibleCountLabel = useMemo(() => {
    if (eligibleStudents.length === 0) return "No eligible students available";
    return `${eligibleStudents.length} eligible student${eligibleStudents.length === 1 ? "" : "s"} in ${assignment.classLabel}`;
  }, [assignment.classLabel, eligibleStudents.length]);
  const selectedAudienceLabel = pendingSelection?.mode === "class"
    ? "Entire class"
    : `${pendingSelection?.studentIds.length ?? 0} selected student${(pendingSelection?.studentIds.length ?? 0) === 1 ? "" : "s"}`;
  const parsedCloseDateTime = parseISODate(closeDateTime);

  const toggleStudent = (studentId: string, checked: boolean) => {
    setSelectedStudentIds((current) => {
      if (checked) return current.includes(studentId) ? current : [...current, studentId];
      return current.filter((id) => id !== studentId);
    });
  };

  const handleContinueToSchedule = () => {
    const selection: RepublishAudienceSelection = mode === "class" ? { mode: "class" } : { mode: "students", studentIds: selectedStudentIds };
    setPendingSelection(selection);
    setStep("schedule");
  };

  const handleConfirm = () => {
    if (!pendingSelection || !closeDateTime.trim()) return;

    onConfirm(
      pendingSelection.mode === "class"
        ? { mode: "class", closesAt: closeDateTime }
        : { mode: "students", studentIds: pendingSelection.studentIds, closesAt: closeDateTime }
    );
  };

  return (
    <div className="w-full p-4 sm:p-6">
      <div className="mx-auto max-w-5xl space-y-4">
        <header className="teacher-panel-surface rounded-2xl p-4 sm:p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Button
                type="button"
                onClick={onBackToAssignments}
                className="rounded-2xl border border-white/20 bg-white/15 text-white hover:bg-white/20"
              >
                <ArrowLeft className="mr-2 h-4 w-4 text-white" />
                Back
              </Button>

              <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-sky-400/30 bg-sky-500/15 text-sky-300">
                <RotateCcw className="h-7 w-7" />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-300">Republish Assignment</p>
                <h1 className="text-2xl font-bold text-white sm:text-3xl">{step === "audience" ? "Choose audience" : "Choose closing date and time"}</h1>
                <p className="mt-1 text-sm text-white/70">{assignment.title}</p>
              </div>
            </div>
          </div>
        </header>

        <section className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-lg">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <ContextCard label="Subject" value={assignment.subject} icon={<BookOpen className="h-4 w-4" />} iconClassName={theme.bgClass} iconColorClassName={theme.iconClass} />
            <ContextCard label="Class" value={assignment.classLabel} icon={<GraduationCap className="h-4 w-4" />} iconClassName={theme.bgClass} iconColorClassName={theme.iconClass} />
            <ContextCard label="Status" value={step === "audience" ? "Step 1 of 2" : "Step 2 of 2"} icon={<RotateCcw className="h-4 w-4" />} iconClassName="bg-sky-500/15" iconColorClassName="text-sky-300" />
          </div>
        </section>

        {step === "audience" ? (
          <section className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-lg">
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-white">Audience selection</h2>
                <p className="mt-1 text-sm text-[var(--text-secondary)]">
                  Choose whether to reopen <span className="text-white">{assignment.title}</span> for all eligible students in the class or only selected students.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <OptionCard
                  title="Entire class"
                  description={eligibleCountLabel}
                  active={mode === "class"}
                  icon={<Users className="h-4 w-4" />}
                  iconClassName="border-sky-400/30 bg-sky-500/15 text-sky-300"
                  onClick={() => setMode("class")}
                />
                <OptionCard
                  title="Selected students"
                  description={eligibleStudents.length > 0 ? "Choose one or more eligible students" : "No eligible students available"}
                  active={mode === "students"}
                  icon={<UserRoundCheck className="h-4 w-4" />}
                  iconClassName="border-violet-400/30 bg-violet-500/15 text-violet-300"
                  onClick={() => setMode("students")}
                  disabled={eligibleStudents.length === 0}
                />
              </div>

              {mode === "students" ? (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="mb-3">
                    <h3 className="text-sm font-medium text-white">Eligible students</h3>
                    <p className="mt-1 text-xs text-white/55">Only eligible students are shown in this list.</p>
                  </div>

                  <div className="mb-3">
                    <Input
                      type="search"
                      value={studentSearch}
                      onChange={(event) => setStudentSearch(event.target.value)}
                      placeholder="Search student name"
                      aria-label="Search eligible students"
                      className="republish-student-search h-10 min-h-10 rounded-2xl border-white/10 bg-white/10 px-4 text-sm text-white placeholder:text-white/60 backdrop-blur-xl focus-visible:ring-white/20 focus-visible:ring-offset-0"
                    />
                  </div>

                  {eligibleStudents.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 px-4 py-6 text-sm text-white/60">
                      There are no eligible students available for this assignment yet.
                    </div>
                  ) : filteredEligibleStudents.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 px-4 py-6 text-sm text-white/60">
                      No eligible students match "{studentSearch.trim()}".
                    </div>
                  ) : (
                    <div className="max-h-72 space-y-2 overflow-y-auto pr-1">
                      {filteredEligibleStudents.map((student) => {
                        const checked = selectedStudentIds.includes(student.id);

                        return (
                          <label
                            key={student.id}
                            className="flex cursor-pointer items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition-colors hover:bg-white/10"
                          >
                            <Checkbox
                              checked={checked}
                              onCheckedChange={(nextChecked) => toggleStudent(student.id, nextChecked === true)}
                              className="border-white/25 data-[state=checked]:border-emerald-300/50 data-[state=checked]:bg-emerald-400/20 data-[state=checked]:text-emerald-100"
                            />
                            <div className="min-w-0">
                              <div className="truncate text-sm font-medium text-white">{student.fullName}</div>
                              {student.className ? <div className="text-xs text-white/55">{student.className}</div> : null}
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>
              ) : null}

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  onClick={onBackToAssignments}
                  className="rounded-2xl border border-white/15 bg-white/10 px-6 py-3 text-white transition-colors duration-200 hover:bg-white/15"
                >
                  <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-xl border border-slate-400/30 bg-slate-500/15 text-slate-300">
                    <X className="h-4 w-4" />
                  </span>
                  Cancel
                </Button>
                <Button
                  type="button"
                  disabled={confirmDisabled}
                  onClick={handleContinueToSchedule}
                  className="rounded-2xl border border-white/20 bg-white/20 px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-white/30 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-xl border border-sky-400/30 bg-sky-500/15 text-sky-300">
                    <RotateCcw className="h-4 w-4" />
                  </span>
                  Republish
                </Button>
              </div>
            </div>
          </section>
        ) : (
          <section className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-lg">
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-white">Schedule</h2>
                <p className="mt-1 text-sm text-[var(--text-secondary)]">
                  Set when the republished assignment <span className="text-white">{assignment.title}</span> should close for the selected audience.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex flex-wrap gap-3 text-sm text-white/80">
                  <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-xl border border-sky-400/30 bg-sky-500/15 text-sky-300">
                      <RotateCcw className="h-4 w-4" />
                    </span>
                    Audience: {selectedAudienceLabel}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-xl border border-violet-400/30 bg-violet-500/15 text-violet-300">
                      <UserRoundCheck className="h-4 w-4" />
                    </span>
                    Class: {assignment.classLabel}
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="mb-3 flex items-center gap-2 text-sm font-medium text-white">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-sky-400/30 bg-sky-500/15 text-sky-300">
                    <CalendarClock className="h-4 w-4" />
                  </span>
                  Closing schedule
                </div>
                <TeacherDateTimePicker
                  value={parsedCloseDateTime}
                  onChange={(nextDate) => setCloseDateTime(nextDate ? nextDate.toISOString() : "")}
                  placeholder="Pick closing date and time"
                />
              </div>

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  onClick={() => setStep("audience")}
                  className="rounded-2xl border border-white/15 bg-white/10 px-6 py-3 text-white transition-colors duration-200 hover:bg-white/15"
                >
                  <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-xl border border-slate-400/30 bg-slate-500/15 text-slate-300">
                    <ArrowLeft className="h-4 w-4" />
                  </span>
                  Back
                </Button>
                <Button
                  type="button"
                  onClick={onBackToAssignments}
                  className="rounded-2xl border border-white/15 bg-white/10 px-6 py-3 text-white transition-colors duration-200 hover:bg-white/15"
                >
                  <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-xl border border-slate-400/30 bg-slate-500/15 text-slate-300">
                    <X className="h-4 w-4" />
                  </span>
                  Cancel
                </Button>
                <Button
                  type="button"
                  disabled={!closeDateTime.trim()}
                  onClick={handleConfirm}
                  className="rounded-2xl border border-white/20 bg-white/20 px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-white/30 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-xl border border-sky-400/30 bg-sky-500/15 text-sky-300">
                    <RotateCcw className="h-4 w-4" />
                  </span>
                  Confirm Republish
                </Button>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function ContextCard({
  label,
  value,
  icon,
  iconClassName,
  iconColorClassName,
}: {
  label: string;
  value: string;
  icon: ReactNode;
  iconClassName: string;
  iconColorClassName: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
      <div className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-white/50">{label}</div>
      <div className="flex items-center gap-3">
        <span className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ${iconClassName} ${iconColorClassName}`}>
          {icon}
        </span>
        <span className="min-w-0 truncate text-sm font-medium text-white">{value}</span>
      </div>
    </div>
  );
}

function OptionCard({
  title,
  description,
  active,
  disabled = false,
  icon,
  iconClassName,
  onClick,
}: {
  title: string;
  description: string;
  active: boolean;
  disabled?: boolean;
  icon: ReactNode;
  iconClassName: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "rounded-2xl border px-4 py-4 text-left transition-colors",
        "border-white/10 bg-white/5 hover:bg-white/10",
        active && "border-white/30 bg-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]",
        disabled && "cursor-not-allowed opacity-50"
      )}
    >
      <div className="flex items-center gap-2 text-sm font-medium text-white">
        <span className={`inline-flex h-8 w-8 items-center justify-center rounded-xl border ${iconClassName}`}>
          {icon}
        </span>
        {title}
      </div>
      <p className="mt-2 text-xs leading-5 text-white/60">{description}</p>
    </button>
  );
}

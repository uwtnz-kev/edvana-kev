import { useEffect, useMemo, useState, type ReactNode } from "react";
import { RotateCcw, Users, UserRoundCheck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/utils/cn";
import { RepublishScheduleModal } from "./RepublishScheduleModal";
import type { RepublishAssignmentModalProps, RepublishAudienceSelection } from "./republishTypes";

type SelectionMode = "class" | "students";

export function RepublishAssignmentModal({
  open,
  assignmentTitle,
  assessmentLabel = "assignment",
  classLabel,
  eligibleStudents,
  onClose,
  onConfirm,
}: RepublishAssignmentModalProps) {
  const [mode, setMode] = useState<SelectionMode>("class");
  const [studentSearch, setStudentSearch] = useState("");
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [closeDateTime, setCloseDateTime] = useState("");
  const [pendingSelection, setPendingSelection] = useState<RepublishAudienceSelection | null>(null);

  useEffect(() => {
    if (!open) {
      setMode("class");
      setStudentSearch("");
      setSelectedStudentIds([]);
      setScheduleOpen(false);
      setCloseDateTime("");
      setPendingSelection(null);
      return;
    }

    setMode("class");
    setStudentSearch("");
    setSelectedStudentIds([]);
    setScheduleOpen(false);
    setCloseDateTime("");
    setPendingSelection(null);
  }, [open]);

  const confirmDisabled = mode === "students" && selectedStudentIds.length === 0;
  const filteredEligibleStudents = useMemo(() => {
    const normalizedStudentSearch = studentSearch.trim().toLowerCase();
    if (!normalizedStudentSearch) return eligibleStudents;

    return eligibleStudents.filter((student) => student.fullName.toLowerCase().includes(normalizedStudentSearch));
  }, [eligibleStudents, studentSearch]);
  const eligibleCountLabel = useMemo(() => {
    if (eligibleStudents.length === 0) return "No eligible students available";
    if (classLabel?.trim()) return `${eligibleStudents.length} eligible student${eligibleStudents.length === 1 ? "" : "s"} in ${classLabel}`;
    return `${eligibleStudents.length} eligible student${eligibleStudents.length === 1 ? "" : "s"}`;
  }, [classLabel, eligibleStudents.length]);

  const toggleStudent = (studentId: string, checked: boolean) => {
    setSelectedStudentIds((current) => {
      if (checked) return current.includes(studentId) ? current : [...current, studentId];
      return current.filter((id) => id !== studentId);
    });
  };

  const assessmentLabelLower = assessmentLabel.toLowerCase();

  const handleOpenSchedule = () => {
    const selection: RepublishAudienceSelection = mode === "class" ? { mode: "class" } : { mode: "students", studentIds: selectedStudentIds };
    setPendingSelection(selection);
    setScheduleOpen(true);
  };

  const handleCancelSchedule = () => {
    setScheduleOpen(false);
    setCloseDateTime("");
    setPendingSelection(null);
    onClose();
  };

  const handleConfirmSchedule = () => {
    if (!pendingSelection || !closeDateTime.trim()) return;
    onConfirm(
      pendingSelection.mode === "class"
        ? { mode: "class", closesAt: closeDateTime }
        : { mode: "students", studentIds: pendingSelection.studentIds, closesAt: closeDateTime }
    );
    setScheduleOpen(false);
    setCloseDateTime("");
    setPendingSelection(null);
    onClose();
  };

  return (
    <>
      <Dialog open={open && !scheduleOpen} onOpenChange={(nextOpen) => !nextOpen && onClose()}>
        <DialogPortal>
          <DialogOverlay className="bg-slate-950/70 backdrop-blur-sm" />
          <DialogContent className="max-w-2xl rounded-3xl border border-white/10 bg-[#1b2430]/95 p-8 text-white shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl [&>button]:hidden">
            <DialogHeader className="space-y-3 text-left">
              <DialogTitle className="text-2xl font-semibold tracking-tight text-white">Republish {assessmentLabelLower}</DialogTitle>
              <DialogDescription className="text-sm leading-6 text-[var(--text-secondary)]">
                Choose whether to reopen <span className="text-white">{assignmentTitle}</span> for all eligible students in the class or only selected students.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
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
                      className="h-10 min-h-10 rounded-2xl border-white/10 bg-white/10 px-4 text-sm text-white placeholder:text-white/60 backdrop-blur-xl focus-visible:ring-white/20 focus-visible:ring-offset-0"
                    />
                  </div>

                  {eligibleStudents.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 px-4 py-6 text-sm text-white/60">
                      There are no eligible students available for this {assessmentLabelLower} yet.
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
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <Button
                type="button"
                onClick={onClose}
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
                onClick={handleOpenSchedule}
                className="rounded-2xl border border-white/20 bg-white/20 px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-white/30 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-xl border border-sky-400/30 bg-sky-500/15 text-sky-300">
                  <RotateCcw className="h-4 w-4" />
                </span>
                Republish
              </Button>
            </div>
          </DialogContent>
        </DialogPortal>
      </Dialog>

      <RepublishScheduleModal
        open={open && scheduleOpen}
        assessmentLabel={assessmentLabel}
        assignmentTitle={assignmentTitle}
        closeDateTime={closeDateTime}
        onCloseDateTimeChange={setCloseDateTime}
        onCancel={handleCancelSchedule}
        onConfirm={handleConfirmSchedule}
      />
    </>
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

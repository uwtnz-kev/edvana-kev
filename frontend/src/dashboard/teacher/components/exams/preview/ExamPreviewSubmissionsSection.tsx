import SegmentedTabs from "@/dashboard/teacher/components/shared/SegmentedTabs";
import type { ExamPreviewStudentRecord } from "./examPreviewStudentData";

type Props = {
  value: "submitted" | "not_submitted";
  submittedStudents: ExamPreviewStudentRecord[];
  notSubmittedStudents: ExamPreviewStudentRecord[];
  onChange: (value: "submitted" | "not_submitted") => void;
};

export function ExamPreviewSubmissionsSection({ value, submittedStudents, notSubmittedStudents, onChange }: Props) {
  const visibleStudents = value === "submitted" ? submittedStudents : notSubmittedStudents;

  return (
    <section className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-lg">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Submission visibility</h2>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            Switch between students who have submitted and students who have not submitted this exam.
          </p>
        </div>

        <div className="w-full md:w-auto">
          <SegmentedTabs
            value={value}
            onChange={(nextValue) => onChange(nextValue as "submitted" | "not_submitted")}
            options={[
              { value: "submitted", label: `Submitted (${submittedStudents.length})` },
              { value: "not_submitted", label: `Not Submitted (${notSubmittedStudents.length})` },
            ]}
          />
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {visibleStudents.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 px-4 py-6 text-center text-sm text-white/60">
            {value === "submitted" ? "No submitted students in the current exam preview dataset." : "No students are currently marked as not submitted in the current exam preview dataset."}
          </div>
        ) : (
          visibleStudents.map((student) => (
            <article key={student.id} className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <div className="truncate text-sm font-medium text-white">{student.fullName}</div>
                <div className="mt-1 text-xs text-white/55">{student.classLabel}</div>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className={student.submitted ? "rounded-full border border-emerald-400/30 bg-emerald-500/15 px-3 py-1 font-medium text-emerald-200" : "rounded-full border border-slate-400/30 bg-slate-500/15 px-3 py-1 font-medium text-slate-200"}>
                  {student.submitted ? "Submitted" : "Not submitted"}
                </span>
                {student.submittedAt ? <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/70">{new Date(student.submittedAt).toLocaleDateString()}</span> : null}
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}


import { useMemo, useState } from "react";
import { ArrowLeft, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { TeacherQuiz } from "../QuizTypes";
import { getQuizDerivedStatus } from "../quizStatus";
import { useTeacherQuizSubmissionTotal } from "../store/quizSubmissionRecords";
import { QuizPreviewBody } from "./QuizPreviewBody";
import { QuizPreviewSubmissionsSection } from "./QuizPreviewSubmissionsSection";
import { getBaseQuizSubmissionCount, getQuizPreviewRoster, getQuizPreviewStudentRecords } from "./quizPreviewStudentData";

type Props = {
  quiz: TeacherQuiz;
  onBack: () => void;
};

export function QuizPreviewPage({ quiz, onBack }: Props) {
  const [submissionView, setSubmissionView] = useState<"submitted" | "not_submitted">("submitted");
  const roster = useMemo(() => getQuizPreviewRoster(quiz), [quiz]);
  const baseSubmissionCount = useMemo(() => getBaseQuizSubmissionCount(quiz, roster.length), [quiz, roster.length]);
  const totalSubmissions = useTeacherQuizSubmissionTotal(quiz.id, baseSubmissionCount);
  const students = useMemo(() => getQuizPreviewStudentRecords(quiz, totalSubmissions), [quiz, totalSubmissions]);
  const submittedStudents = useMemo(() => students.filter((student) => student.submitted), [students]);
  const notSubmittedStudents = useMemo(() => students.filter((student) => !student.submitted), [students]);
  const derivedStatus = getQuizDerivedStatus(quiz);

  return (
    <div className="w-full p-4 sm:p-6">
      <div className="mx-auto max-w-5xl space-y-4">
        <header className="teacher-panel-surface rounded-2xl p-4 sm:p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Button type="button" onClick={onBack} className="rounded-2xl border border-white/20 bg-white/15 text-white hover:bg-white/20">
                <ArrowLeft className="mr-2 h-4 w-4 text-white" />
                Back
              </Button>

              <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-sky-400/30 bg-sky-500/15 text-sky-300">
                <Eye className="h-7 w-7" />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-300">Quiz Preview</p>
                <h1 className="text-2xl font-bold text-white sm:text-3xl">{quiz.title}</h1>
                <p className="mt-1 text-sm text-white/70">Review the key quiz details and current submission visibility.</p>
              </div>
            </div>
          </div>
        </header>

        <section className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-lg">
          <QuizPreviewBody quiz={quiz} totalSubmissions={totalSubmissions} rosterCount={roster.length} />
        </section>

        {derivedStatus !== "draft" ? (
          <QuizPreviewSubmissionsSection
            value={submissionView}
            submittedStudents={submittedStudents}
            notSubmittedStudents={notSubmittedStudents}
            onChange={setSubmissionView}
          />
        ) : null}
      </div>
    </div>
  );
}

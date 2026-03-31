import { useMemo, useState, type ChangeEvent } from "react";
import { Calendar, Clock, BookOpen, FileText, AlertCircle, KeyRound, RefreshCcw, Link2, Unlock, Lock } from "lucide-react";
import { resolveAssignmentRules } from "@/dashboard/teacher/components/shared";
import type { SubmissionMethod } from "@/dashboard/teacher/components/shared/assessment/submissionMethods";
import { recordStudentAssignmentSubmission, useStudentAssignmentSubmissionState } from "@/dashboard/teacher/components/assignments";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "../shared/StatusBadge";

interface AssignmentCardProps {
  title: string;
  courseName: string;
  dueDate: string;
  status: "pending" | "completed" | "overdue" | "draft";
  description: string;
  points: number;
  submittedDate?: string;
  grade?: number;
  type: "essay" | "quiz" | "project" | "homework";
  accessCode?: string;
  totalAttempts?: number;
  attemptCount?: number;
  submissionMethods?: SubmissionMethod[];
  classId?: string;
  classLabel?: string;
  teacherAssignmentId?: string;
}

export function AssignmentCard({
  title,
  courseName,
  dueDate,
  status,
  description,
  points,
  submittedDate,
  grade,
  type,
  accessCode,
  totalAttempts,
  attemptCount,
  submissionMethods = [],
  teacherAssignmentId,
}: AssignmentCardProps) {
  const rules = resolveAssignmentRules(
    {
      accessCode,
      dueAt: dueDate,
      status: status === "draft" ? "draft" : "published",
      submissionMethods,
      totalAttempts: totalAttempts ?? 0,
    },
    Date.now(),
    typeof attemptCount === "number" ? { attemptCount } : undefined,
  );
  const [isOpen, setIsOpen] = useState(false);
  const [accessCodeValue, setAccessCodeValue] = useState("");
  const [accessCodeError, setAccessCodeError] = useState<string | null>(null);
  const [isAccessUnlocked, setIsAccessUnlocked] = useState(!rules.requiresAccessCode);
  const [textEntryValue, setTextEntryValue] = useState("");
  const [linkValue, setLinkValue] = useState("");
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const hasSubmittedAssignment = useStudentAssignmentSubmissionState(teacherAssignmentId);

  const isOverdue = status === "pending" && new Date(dueDate) < new Date();
  const actualStatus = rules.derivedStatus === "closed"
    ? "overdue"
    : isOverdue
      ? "overdue"
      : status;
  const statusLabel = rules.derivedStatus === "closed"
    ? "Closed"
    : actualStatus.charAt(0).toUpperCase() + actualStatus.slice(1);
  const canOpen = rules.canStart && (!rules.requiresAccessCode || isAccessUnlocked);
  const canSubmit = rules.canSubmit && (!rules.requiresAccessCode || isAccessUnlocked);
  const interactionMessage = useMemo(() => {
    if (rules.derivedStatus === "closed") return "This assignment is closed.";
    if (rules.hasAttemptsLimit && !rules.hasAttemptsRemaining) return "No attempts remaining.";
    if (rules.requiresAccessCode && !isAccessUnlocked) return "Enter the access code to open this assignment.";
    return null;
  }, [isAccessUnlocked, rules]);

  const getTypeIcon = () => {
    switch (type) {
      case "essay":
        return <FileText className="h-5 w-5 text-white" />;
      case "quiz":
        return <Clock className="h-5 w-5 text-white" />;
      case "project":
        return <BookOpen className="h-5 w-5 text-white" />;
      case "homework":
        return <FileText className="h-5 w-5 text-white" />;
    }
  };

  const getTypeColor = () => {
    switch (type) {
      case "essay":
        return "from-[#FF715B] to-[#FF715B]/80";
      case "quiz":
        return "from-[#1EA896] to-[#1EA896]/80";
      case "project":
        return "from-[#4C5454] to-[#523F38]";
      case "homework":
        return "from-[#523F38] to-[#4C5454]";
    }
  };

  const handleUnlock = () => {
    if ((accessCode ?? "").trim() === accessCodeValue.trim()) {
      setIsAccessUnlocked(true);
      setAccessCodeError(null);
      return;
    }
    setIsAccessUnlocked(false);
    setAccessCodeError("Incorrect access code.");
  };

  const handleOpenAssignment = () => {
    if (!canOpen) return;
    setIsOpen(true);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedFileName(event.target.files?.[0]?.name ?? null);
  };

  const handleSubmitAssignment = () => {
    if (!canSubmit || hasSubmittedAssignment) return;
    if (teacherAssignmentId) recordStudentAssignmentSubmission(teacherAssignmentId);
  };

  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl p-6 hover:bg-white/10 hover:shadow-2xl transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 bg-gradient-to-br ${getTypeColor()} rounded-xl flex items-center justify-center shadow-lg`}>
          {getTypeIcon()}
        </div>
        <StatusBadge status={actualStatus} customLabel={statusLabel} />
      </div>

      <div className="space-y-3 mb-4">
        <div>
          <h3 className="text-xl font-bold text-white mb-1 group-hover:text-white/90 transition-colors">
            {title}
          </h3>
          <p className="text-[#1EA896] text-sm font-medium">{courseName}</p>
        </div>
        <p className="text-white/70 text-sm line-clamp-2">
          {description}
        </p>
        {(rules.requiresAccessCode || rules.hasAttemptsLimit) ? (
          <div className="flex flex-wrap gap-2 pt-1">
            {rules.requiresAccessCode ? (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-500/15 px-3 py-1 text-xs font-medium text-amber-100 backdrop-blur-sm">
                <KeyRound className="h-3.5 w-3.5" />
                Locked
              </span>
            ) : null}
            {rules.hasAttemptsLimit ? (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-500/15 px-3 py-1 text-xs font-medium text-cyan-100 backdrop-blur-sm">
                <RefreshCcw className="h-3.5 w-3.5" />
                {rules.attemptsRemaining !== null ? `${rules.attemptsRemaining} attempts left` : `${totalAttempts} attempts allowed`}
              </span>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-white/60" />
          <span className="text-white/80 text-sm">
            Due {new Date(dueDate).toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-white/60 text-sm font-medium">Points:</span>
          <span className="text-white/80 text-sm">{points}</span>
        </div>
      </div>

      {rules.requiresAccessCode && !isAccessUnlocked ? (
        <div className="mb-4 rounded-2xl border border-amber-400/20 bg-amber-500/10 p-4">
          <div className="flex items-center gap-2 text-sm font-medium text-amber-100">
            <Lock className="h-4 w-4" />
            Access code required
          </div>
          <p className="mt-2 text-sm text-white/70">Enter the access code before opening this assignment.</p>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              value={accessCodeValue}
              onChange={(event) => {
                setAccessCodeValue(event.target.value);
                setAccessCodeError(null);
              }}
              placeholder="Enter access code"
              className="h-11 w-full rounded-2xl border border-white/15 bg-white/10 px-4 text-sm text-white placeholder:text-white/45 focus:outline-none focus:ring-2 focus:ring-amber-400/40"
            />
            <Button
              type="button"
              onClick={handleUnlock}
              className="rounded-2xl border border-amber-400/30 bg-amber-500/15 px-5 text-amber-100 hover:bg-amber-500/25"
            >
              <Unlock className="mr-2 h-4 w-4" />
              Unlock
            </Button>
          </div>
          {accessCodeError ? <p className="mt-2 text-sm text-red-300">{accessCodeError}</p> : null}
        </div>
      ) : null}

      {interactionMessage ? (
        <div className="mb-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/75">
          {interactionMessage}
        </div>
      ) : null}

      {isOpen ? (
        <div className="mb-4 space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-sm font-medium text-white">Submission</p>

          {rules.isQuizForm ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">
              Quiz form is the allowed submission method for this assignment.
            </div>
          ) : null}

          {rules.allowsTextEntry ? (
            <div className="space-y-2">
              <label className="text-sm text-white/80">Text Entry</label>
              <textarea
                value={textEntryValue}
                onChange={(event) => setTextEntryValue(event.target.value)}
                placeholder="Write your response here"
                className="min-h-[110px] w-full resize-none rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/45 focus:outline-none focus:ring-2 focus:ring-white/20"
              />
            </div>
          ) : null}

          {rules.allowsLinkSubmission ? (
            <div className="space-y-2">
              <label className="text-sm text-white/80">Link Submission</label>
              <div className="relative">
                <Link2 className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/45" />
                <input
                  type="url"
                  value={linkValue}
                  onChange={(event) => setLinkValue(event.target.value)}
                  placeholder="https://example.com/your-work"
                  className="h-11 w-full rounded-2xl border border-white/15 bg-white/10 pl-11 pr-4 text-sm text-white placeholder:text-white/45 focus:outline-none focus:ring-2 focus:ring-white/20"
                />
              </div>
            </div>
          ) : null}

          {rules.allowsFileUpload ? (
            <div className="space-y-2">
              <label className="text-sm text-white/80">File Upload</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="block w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white file:mr-4 file:rounded-xl file:border-0 file:bg-white/15 file:px-3 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-white/25"
              />
              {selectedFileName ? <p className="text-xs text-white/55">Selected file: {selectedFileName}</p> : null}
            </div>
          ) : null}

          <Button
            type="button"
            disabled={!canSubmit || hasSubmittedAssignment}
            onClick={handleSubmitAssignment}
            className="rounded-2xl border border-white/20 bg-white/15 px-5 text-white hover:bg-white/25 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {hasSubmittedAssignment ? "Submitted" : "Submit Assignment"}
          </Button>
        </div>
      ) : null}

      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <div className="text-xs text-white/60">
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </div>
        <div className="flex items-center gap-2">
          {status === "completed" && grade !== undefined ? (
            <span className="text-sm font-medium text-[#1EA896]">
              {grade}/{points}
            </span>
          ) : null}
          {status === "completed" && submittedDate ? (
            <span className="text-xs text-white/60">
              Submitted {new Date(submittedDate).toLocaleDateString()}
            </span>
          ) : null}
          {rules.derivedStatus === "closed" ? (
            <div className="flex items-center space-x-1 text-red-400">
              <AlertCircle className="h-3 w-3" />
              <span className="text-xs">Closed</span>
            </div>
          ) : null}
          <Button
            type="button"
            onClick={handleOpenAssignment}
            disabled={!canOpen || isOpen}
            className="rounded-2xl border border-white/20 bg-white/10 px-4 py-2 text-white hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isOpen ? "Opened" : "Open Assignment"}
          </Button>
        </div>
      </div>
    </div>
  );
}

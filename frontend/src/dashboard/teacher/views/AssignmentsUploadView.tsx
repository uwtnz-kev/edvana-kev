import { useRef, useState } from "react";
import { ArrowLeft, BookOpen, ChevronDown, ClipboardList, FileText, GraduationCap, Upload, X } from "lucide-react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createAssignment, loadAssignments, type TeacherAssignment } from "@/dashboard/teacher/components/assignments";
import { TeacherAssignmentDueDatePicker } from "@/dashboard/teacher/components/assignments/create/TeacherAssignmentDueDatePicker";
import { buildSubjectFileContentKey, storeSubjectFileContent } from "@/dashboard/teacher/components/subjects/files/subjectFilesBinaryStorage";
import { SubjectFileDuplicateDialog } from "@/dashboard/teacher/components/subjects/upload/SubjectFileDuplicateDialog";
import {
  findDuplicateAssignmentFile,
  findDuplicateAssignmentTitle,
  getSubjectIconTheme,
  validateUploadFile,
  type DuplicateAssignmentFileMatch,
  type DuplicateAssignmentTitleMatch,
} from "@/dashboard/teacher/components/shared";
import { buildAssessmentAttachmentId, formatAssessmentFileSize } from "@/dashboard/teacher/components/shared/assessment/assessmentAttachmentHelpers";
import {
  SUBMISSION_METHOD_OPTIONS,
  toggleSubmissionMethod,
  type SubmissionMethod,
  validateSubmissionMethods,
} from "@/dashboard/teacher/components/shared/assessment/submissionMethods";
import { getTeacherSubjectClass } from "@/dashboard/teacher/data/teacherSubjectsByClass";
import { cn } from "@/utils/cn";
import { getClassIdFromSearchParams } from "./subjects/subjectClassRouting";

type AssignmentsUploadState = {
  subjectId: string;
  subjectName: string;
};

const FIXED_UPLOAD_SUBMISSION_METHOD: SubmissionMethod = "file_upload";
const ALLOWED_UPLOAD_SUBMISSION_METHODS = SUBMISSION_METHOD_OPTIONS.filter((option) => option.value !== "quiz_form");

function getUploadState(state: unknown): AssignmentsUploadState | null {
  if (!state || typeof state !== "object") {
    return null;
  }

  const candidate = state as Partial<AssignmentsUploadState>;
  if (typeof candidate.subjectId !== "string" || typeof candidate.subjectName !== "string") {
    return null;
  }

  return {
    subjectId: candidate.subjectId,
    subjectName: candidate.subjectName,
  };
}

function getFileTypeLabel(file: File): string {
  const name = file.name.toLowerCase();

  if (name.endsWith(".pdf")) return "PDF";
  if (name.endsWith(".doc") || name.endsWith(".docx")) return "DOC";
  if (name.endsWith(".ppt") || name.endsWith(".pptx")) return "PPT";
  if (name.endsWith(".xls") || name.endsWith(".xlsx")) return "XLS";
  if (name.endsWith(".png") || name.endsWith(".jpg") || name.endsWith(".jpeg")) return "IMAGE";

  return "FILE";
}

function getSubmissionMethodTriggerLabel(selected: SubmissionMethod[]) {
  if (selected.length === 0) return "Select submission method";
  if (selected.length === 1) return getSubmissionMethodLabel(selected[0]);
  if (selected.length === 2) return selected.map(getSubmissionMethodLabel).join(", ");
  return `${selected.length} methods selected`;
}

function getSubmissionMethodLabel(value: SubmissionMethod) {
  return ALLOWED_UPLOAD_SUBMISSION_METHODS.find((option) => option.value === value)?.label ?? value;
}

function buildDuplicateAssignmentLocations(match: DuplicateAssignmentFileMatch) {
  return [[match.classLabel, match.subject, `Assignment: ${match.assignmentTitle}`].filter(Boolean).join(" -> ")];
}

function buildDuplicateAssignmentTitleLocations(match: DuplicateAssignmentTitleMatch) {
  return [[match.classLabel, match.subject, `Assignment: ${match.assignmentTitle}`].filter(Boolean).join(" -> ")];
}

export default function AssignmentsUploadView() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const uploadState = getUploadState(location.state);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [dueAt, setDueAt] = useState("");
  const [maxScore, setMaxScore] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [totalAttempts, setTotalAttempts] = useState("");
  const [submissionMethods, setSubmissionMethods] = useState<SubmissionMethod[]>([FIXED_UPLOAD_SUBMISSION_METHOD]);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle");
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);
  const [titleError, setTitleError] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [submissionMethodsError, setSubmissionMethodsError] = useState<string | null>(null);
  const [dueAtError, setDueAtError] = useState<string | null>(null);
  const [maxScoreError, setMaxScoreError] = useState<string | null>(null);
  const [totalAttemptsError, setTotalAttemptsError] = useState<string | null>(null);
  const [duplicateDialogOpen, setDuplicateDialogOpen] = useState(false);
  const [pendingDuplicateMatch, setPendingDuplicateMatch] = useState<DuplicateAssignmentFileMatch | null>(null);
  const [duplicateDecisionBusy, setDuplicateDecisionBusy] = useState(false);
  const [titleDuplicateDialogOpen, setTitleDuplicateDialogOpen] = useState(false);
  const [pendingTitleDuplicateMatch, setPendingTitleDuplicateMatch] = useState<DuplicateAssignmentTitleMatch | null>(null);
  const [titleDuplicateDecisionBusy, setTitleDuplicateDecisionBusy] = useState(false);
  const titleInputRef = useRef<HTMLInputElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const classId = getClassIdFromSearchParams(searchParams);
  const selectedClass = getTeacherSubjectClass(classId);
  const fileUploadSelected = submissionMethods.includes("file_upload");

  const goToAssignmentsWorkspace = (restoreSubjectId?: string) =>
    navigate(
      { pathname: "/dashboard/teacher/assignments", search: location.search },
      restoreSubjectId ? { state: { restoreSubjectId, viewMode: "workspace" as const } } : undefined,
    );

  const resetForm = () => {
    setTitle("");
    setFile(null);
    setDescription("");
    setDueAt("");
    setMaxScore("");
    setAccessCode("");
    setTotalAttempts("");
    
    setUploadStatus("idle");
    setUploadMessage(null);
    setTitleError(null);
    setFileError(null);
    setSubmissionMethodsError(null);
    setDueAtError(null);
    setMaxScoreError(null);
    setTotalAttemptsError(null);
    setDuplicateDialogOpen(false);
    setPendingDuplicateMatch(null);
    setDuplicateDecisionBusy(false);
    setTitleDuplicateDialogOpen(false);
    setPendingTitleDuplicateMatch(null);
    setTitleDuplicateDecisionBusy(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const validateForm = () => {
    let isValid = true;

    if (title.trim().length === 0) {
      setTitleError("Assignment title is required");
      setFileError(null);
      titleInputRef.current?.focus();
      return false;
    }
    setTitleError(null);

    const submissionMethodError = validateSubmissionMethods(submissionMethods);
    if (submissionMethodError) {
      setSubmissionMethodsError(submissionMethodError);
      isValid = false;
    } else {
      setSubmissionMethodsError(null);
    }

    if (fileUploadSelected && !file) {
      setFileError("Please select a file");
      fileInputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      fileInputRef.current?.focus();
      return false;
    }

    if (fileUploadSelected && file) {
      const fileValidation = validateUploadFile(file);
      if (!fileValidation.isValid) {
        setFileError(fileValidation.error);
        fileInputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        fileInputRef.current?.focus();
        return false;
      }
    }
    setFileError(null);

    if (dueAt.trim().length === 0) {
      setDueAtError("Due date is required.");
      isValid = false;
    } else {
      setDueAtError(null);
    }

    if (maxScore.trim().length === 0) {
      setMaxScoreError("Max score is required.");
      isValid = false;
    } else {
      const parsed = Number(maxScore.trim());
      if (!Number.isFinite(parsed) || parsed <= 0) {
        setMaxScoreError("Max score must be a positive number.");
        isValid = false;
      } else {
        setMaxScoreError(null);
      }
    }

    if (totalAttempts.trim().length === 0) {
      setTotalAttemptsError("Total attempts is required");
      isValid = false;
    } else {
      const parsed = Number(totalAttempts.trim());
      if (!Number.isInteger(parsed)) {
        setTotalAttemptsError("Total attempts must be a whole number");
        isValid = false;
      } else if (parsed < 1) {
        setTotalAttemptsError("Total attempts must be at least 1");
        isValid = false;
      } else {
        setTotalAttemptsError(null);
      }
    }

    return isValid;
  };

  const performUpload = async (skipFileDuplicateCheck = false, skipTitleDuplicateCheck = false) => {
    const isValid = validateForm();

    if (!isValid) {
      setUploadStatus("error");
      setUploadMessage(null);
      return;
    }

    if (!uploadState || !classId || !selectedClass) {
      setUploadStatus("error");
      setUploadMessage("Missing class or subject context. Please go back and try again.");
      return;
    }

    if (!skipTitleDuplicateCheck) {
      const duplicateTitleResult = findDuplicateAssignmentTitle(
        { title: title.trim() },
        loadAssignments(),
        { classId, subject: uploadState.subjectName },
      );

      if (duplicateTitleResult.isDuplicate && duplicateTitleResult.match) {
        setPendingTitleDuplicateMatch(duplicateTitleResult.match);
        setTitleDuplicateDialogOpen(true);
        setUploadStatus("idle");
        setUploadMessage(null);
        return;
      }
    }

    if (!skipFileDuplicateCheck && fileUploadSelected && file) {
      const duplicateResult = findDuplicateAssignmentFile(
        { name: file.name, size: file.size, lastModified: file.lastModified },
        loadAssignments(),
        { classId, subject: uploadState.subjectName },
      );

      if (duplicateResult.isDuplicate && duplicateResult.match) {
        setPendingDuplicateMatch(duplicateResult.match);
        setDuplicateDialogOpen(true);
        setUploadStatus("idle");
        setUploadMessage(null);
        return;
      }
    }

    setUploadStatus("idle");
    setUploadMessage(null);

    const attachmentId = fileUploadSelected && file ? buildAssessmentAttachmentId() : null;
    const contentKey = attachmentId ? buildSubjectFileContentKey(attachmentId) : null;

    if (fileUploadSelected && file && contentKey) {
      try {
        await storeSubjectFileContent(contentKey, file);
      } catch {
        setUploadStatus("error");
        setUploadMessage("Failed to store assignment file. Please try again.");
        return;
      }
    }

    const attachments = fileUploadSelected && file && attachmentId && contentKey
      ? [
          {
            id: attachmentId,
            name: file.name,
            size: file.size,
            type: file.type,
            lastModified: file.lastModified,
            blobKey: contentKey,
          },
        ]
      : undefined;

    try {
      const dueDate = new Date(dueAt);
      const numericMaxScore = Number(maxScore.trim());
      createAssignment({
        title: title.trim(),
        subject: uploadState.subjectName,
        classId,
        classLabel: selectedClass.classLabel,
        dueAt: Number.isNaN(dueDate.getTime()) ? new Date().toISOString() : dueDate.toISOString(),
        status: "draft",
        totalAttempts: Number(totalAttempts.trim()),
        totalQuestions: 0,
        totalSubmissions: 0,
        pendingToGrade: 0,
        submissionMethods,
        instructions: description.trim() || undefined,
        accessCode: accessCode.trim() || undefined,
        maxScore: Number.isFinite(numericMaxScore) ? numericMaxScore : undefined,
        attachments: attachments as TeacherAssignment["attachments"],
      });
    } catch {
      setUploadStatus("error");
      setUploadMessage("Failed to save assignment. Please try again.");
      return;
    }

    setUploadStatus("success");
    setUploadMessage("Assignment uploaded successfully.");

    resetForm();
    navigate(
      { pathname: "/dashboard/teacher/assignments", search: location.search },
      { state: { restoreSubjectId: uploadState.subjectId, viewMode: "list" as const } },
    );
  };

  const handleUpload = async () => {
    await performUpload(false, false);
  };

  const handleDuplicateDecision = async (decision: "proceed" | "cancel") => {
    if (decision === "cancel") {
      setDuplicateDialogOpen(false);
      setPendingDuplicateMatch(null);
      return;
    }

    setDuplicateDecisionBusy(true);
    setDuplicateDialogOpen(false);

    try {
      await performUpload(true, true);
    } finally {
      setDuplicateDecisionBusy(false);
      setPendingDuplicateMatch(null);
    }
  };

  const handleTitleDuplicateDecision = async (decision: "proceed" | "cancel") => {
    if (decision === "cancel") {
      setTitleDuplicateDialogOpen(false);
      setPendingTitleDuplicateMatch(null);
      return;
    }

    setTitleDuplicateDecisionBusy(true);
    setTitleDuplicateDialogOpen(false);

    try {
      await performUpload(false, true);
    } finally {
      setTitleDuplicateDecisionBusy(false);
      setPendingTitleDuplicateMatch(null);
    }
  };

  const handleCancel = () => {
    resetForm();
    goToAssignmentsWorkspace(uploadState?.subjectId);
  };

  const handleSubmissionMethodToggle = (method: SubmissionMethod) => {
    const nextMethods = toggleSubmissionMethod(submissionMethods, method);
    setSubmissionMethods(nextMethods);
    setSubmissionMethodsError(null);
    if (!nextMethods.includes("file_upload")) {
      setFileError(null);
      setPendingDuplicateMatch(null);
      setDuplicateDialogOpen(false);
    }
    setUploadStatus("idle");
    setUploadMessage(null);
  };

  if (!uploadState) {
    return (
      <div className="w-full p-4 sm:p-6">
        <div className="mx-auto max-w-3xl rounded-2xl teacher-panel-surface p-6 text-center sm:p-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-teal-500/20">
            <ClipboardList className="h-6 w-6 text-teal-700" />
          </div>
          <h1 className="mt-4 text-2xl font-semibold text-white">Upload Assignment</h1>
          <p className="mt-3 text-[var(--text-secondary)]">
            Missing subject context. Go back and choose a subject first.
          </p>
          <div className="mt-5">
            <Button
              type="button"
              onClick={() => goToAssignmentsWorkspace()}
              className="rounded-2xl border border-white/20 bg-white/20 text-white hover:bg-white/30"
            >
              Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const theme = getSubjectIconTheme(uploadState.subjectName);

  return (
    <div className="w-full overflow-x-hidden p-4 sm:p-6" style={{ overflowX: "hidden" }}>
      <div className="mx-auto w-full max-w-5xl space-y-4">
        <header className="rounded-2xl border border-white/10 bg-white/10 px-6 py-5 backdrop-blur-xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button
              type="button"
              onClick={() => goToAssignmentsWorkspace(uploadState.subjectId)}
              className="w-fit rounded-2xl border border-white/20 bg-white/10 text-white transition-all duration-200 hover:bg-white/30 hover:shadow-sm"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>

            <div className="flex min-w-0 items-center gap-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${theme.bgClass}`}>
                <Upload className={`h-6 w-6 ${theme.iconClass}`} />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-2xl font-semibold text-white">Upload Assignment</h1>
                <p className="mt-1 truncate text-[var(--text-secondary)]" title={`Subject: ${uploadState.subjectName}`}>Subject: {uploadState.subjectName}</p>
              </div>
            </div>
          </div>
        </header>

        <section className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-lg">
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div className="w-full">
                <label className="mb-2 block text-sm text-white">Subject</label>
                <div className="inline-flex h-12 w-full items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-3">
                  <span className={`inline-flex h-7 w-7 items-center justify-center rounded-xl ${theme.bgClass} ${theme.iconClass}`}>
                    <BookOpen className="h-4 w-4" />
                  </span>
                  <span className="truncate text-sm font-medium text-white">{uploadState.subjectName}</span>
                </div>
              </div>

              <div className="w-full">
                <label className="mb-2 block text-sm text-white">Class</label>
                <div className="inline-flex h-12 w-full items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-3">
                  <span className={`inline-flex h-7 w-7 items-center justify-center rounded-xl ${theme.bgClass} ${theme.iconClass}`}>
                    <GraduationCap className="h-4 w-4" />
                  </span>
                  <span className="truncate text-sm font-medium text-white">{selectedClass?.classLabel ?? ""}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="assignment-title" className="text-white">
                Assignment Title
              </Label>
              <Input
                ref={titleInputRef}
                id="assignment-title"
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                  if (titleError && event.target.value.trim().length > 0) {
                    setTitleError(null);
                  }
                  setUploadStatus("idle");
                  setUploadMessage(null);
                }}
                placeholder="Enter assignment title"
                className="h-12 rounded-2xl border-white/20 bg-white/20 text-white placeholder:text-white/70"
              />
              {titleError ? <p className="text-sm text-red-400">{titleError}</p> : null}
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

              <div className="w-full">
                <label htmlFor="assignment-due-picker" className="mb-2 block text-sm text-white">Due At</label>
                <div id="assignment-due-picker" className="w-full [&_button]:h-12 [&_button]:w-full [&_button]:rounded-2xl">
                  <TeacherAssignmentDueDatePicker
                    value={dueAt}
                    onChange={(nextValue) => {
                      setDueAt(nextValue);
                      setDueAtError(null);
                      setUploadStatus("idle");
                      setUploadMessage(null);
                    }}
                  />
                </div>
                {dueAtError ? <p className="mt-1 text-sm font-medium text-red-600">{dueAtError}</p> : null}
              </div>

              <div className="w-full">
                <label htmlFor="assignment-max-score" className="mb-2 block text-sm text-white">Max Score</label>
                <Input
                  id="assignment-max-score"
                  type="number"
                  min={1}
                  value={maxScore}
                  onChange={(event) => {
                    setMaxScore(event.target.value);
                    setMaxScoreError(null);
                    setUploadStatus("idle");
                    setUploadMessage(null);
                  }}
                  placeholder="100"
                  className="h-12 w-full rounded-2xl border border-white/25 bg-white/20 text-white placeholder:text-white/70"
                />
                {maxScoreError ? <p className="mt-1 text-sm font-medium text-red-600">{maxScoreError}</p> : null}
              </div>

              <div className="w-full">
                <label htmlFor="assignment-access-code" className="mb-2 block text-sm text-white">Access Code (Optional)</label>
                <Input
                  id="assignment-access-code"
                  type="text"
                  value={accessCode}
                  onChange={(event) => {
                    setAccessCode(event.target.value);
                    setUploadStatus("idle");
                    setUploadMessage(null);
                  }}
                  placeholder="Optional access code"
                  className="h-12 w-full rounded-2xl border border-white/25 bg-white/20 text-white placeholder:text-white/70"
                />
              </div>

              <div className="w-full">
                <label htmlFor="assignment-total-attempts" className="mb-2 block text-sm text-white">Total Attempts</label>
                <Input
                  id="assignment-total-attempts"
                  type="number"
                  min={1}
                  step={1}
                  value={totalAttempts}
                  onChange={(event) => {
                    setTotalAttempts(event.target.value);
                    setTotalAttemptsError(null);
                    setUploadStatus("idle");
                    setUploadMessage(null);
                  }}
                  placeholder="Enter total attempts"
                  className="h-12 w-full rounded-2xl border border-white/25 bg-white/20 text-white placeholder:text-white/70"
                />
                {totalAttemptsError ? <p className="mt-1 text-sm font-medium text-red-600">{totalAttemptsError}</p> : null}
              </div>

              <div className="w-full">
                <label htmlFor="assignment-submission-methods" className="mb-2 block text-sm text-white">Submission Method</label>
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                    <button
                      id="assignment-submission-methods"
                      type="button"
                      className={cn(
                        "flex h-12 w-full items-center justify-between gap-3 rounded-2xl border px-4 text-left transition",
                        "border-white/20 bg-white/20 text-white hover:bg-white/25",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-0",
                        submissionMethodsError && "border-red-500/70"
                      )}
                    >
                      <span className={cn("min-w-0 truncate text-sm", submissionMethods.length === 0 && "text-white/60")}>
                        {getSubmissionMethodTriggerLabel(submissionMethods)}
                      </span>
                      <ChevronDown className="h-4 w-4 shrink-0 text-white/70" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    sideOffset={8}
                    className="w-[min(22rem,var(--radix-dropdown-menu-trigger-width))] rounded-2xl border border-white/20 bg-[#1b2430]/95 p-1 text-white shadow-2xl backdrop-blur-xl"
                  >
                    <DropdownMenuLabel className="px-3 py-2 text-xs font-medium uppercase tracking-[0.18em] text-white/50">
                      Submission Method
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="mx-2 bg-white/10" />
                    {ALLOWED_UPLOAD_SUBMISSION_METHODS.map((option) => {
                      const checked = submissionMethods.includes(option.value);

                      return (
                        <DropdownMenuCheckboxItem
                          key={option.value}
                          checked={checked}
                          onCheckedChange={() => handleSubmissionMethodToggle(option.value)}
                          className="rounded-xl px-3 py-3 pl-9 text-white focus:bg-white/10 focus:text-white data-[disabled]:opacity-50"
                        >
                          <div className="min-w-0">
                            <div className="truncate text-sm font-medium text-white">{option.label}</div>
                            <div className="whitespace-normal text-xs leading-5 text-white/60">{option.description}</div>
                          </div>
                        </DropdownMenuCheckboxItem>
                      );
                    })}
                    <DropdownMenuSeparator className="mx-2 bg-white/10" />
                    <div className="px-3 py-2 text-xs leading-5 text-white/55">
                      File Upload, Text Entry, and Link Submission can be combined together.
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
                {submissionMethodsError ? <p className="mt-1 text-sm font-medium text-red-600">{submissionMethodsError}</p> : null}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="assignment-instructions" className="text-white">
                Description or Instructions (Optional)
              </Label>
              <textarea
                id="assignment-instructions"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Add directions or notes for this assignment..."
                className="min-h-[120px] w-full resize-none rounded-2xl border border-white/20 bg-white/20 px-4 py-3 text-sm text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>

            {fileUploadSelected ? (
              <div className="space-y-2">
                <Label htmlFor="assignment-file" className="text-white">
                  Choose File
                </Label>
                <div className="rounded-2xl border border-dashed border-white/20 bg-white/5 px-5 py-5">
                  {!file ? (
                    <>
                      <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-2xl ${theme.bgClass}`}>
                        <Upload className={`h-5 w-5 ${theme.iconClass}`} />
                      </div>
                      <p className="mt-3 text-center text-sm font-medium text-white">Select an assignment file to upload</p>
                      <p className="mt-0.5 text-center text-sm text-[var(--text-secondary)]">
                        File selection UI shell only for this step.
                      </p>
                    </>
                  ) : null}
                  <input
                    ref={fileInputRef}
                    id="assignment-file"
                    type="file"
                    className="sr-only"
                    onChange={(event) => {
                      const nextFile = event.target.files?.[0] ?? null;
                      setPendingDuplicateMatch(null);
                      setDuplicateDialogOpen(false);
                      setPendingTitleDuplicateMatch(null);
                      setTitleDuplicateDialogOpen(false);
                      setUploadStatus("idle");
                      setUploadMessage(null);

                      if (!nextFile) {
                        setFile(null);
                        setFileError(null);
                        return;
                      }

                      const validation = validateUploadFile(nextFile);
                      if (!validation.isValid) {
                        setFile(null);
                        setFileError(validation.error);
                        event.target.value = "";
                        return;
                      }

                      setFile(nextFile);
                      setFileError(null);
                    }}
                  />
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:border-white/30 hover:bg-white/20 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent active:scale-[0.97] active:bg-white/25"
                    >
                      <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-xl border border-amber-400/30 bg-amber-500/15 text-amber-300">
                        <Upload className="h-4 w-4" />
                      </span>
                      Choose File
                    </button>
                    {file ? <span className="text-sm text-white/70">1 selected</span> : null}
                  </div>

                  {file ? (
                    <div className="mt-4 space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white">Selected file</p>
                        <p className="truncate text-xs text-[var(--text-secondary)]" title="Review the file before uploading this assignment.">Review the file before uploading this assignment.</p>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                        <article className="overflow-hidden rounded-2xl border border-white/10 bg-white/10">
                          <div className="relative h-32 w-full overflow-hidden bg-white/5">
                            <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-red-500/15 text-red-300">
                              <FileText className="h-8 w-8" />
                            <span className="text-xs font-semibold tracking-[0.18em]">{getFileTypeLabel(file)}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                setFile(null);
                                setPendingDuplicateMatch(null);
                                setDuplicateDialogOpen(false);
                                setPendingTitleDuplicateMatch(null);
                                setTitleDuplicateDialogOpen(false);
                                setFileError(null);
                                setUploadStatus("idle");
                                setUploadMessage(null);
                                if (fileInputRef.current) {
                                  fileInputRef.current.value = "";
                                }
                              }}
                              className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-400/30 bg-slate-500/15 text-slate-300 transition hover:bg-slate-500/25"
                              aria-label={`Remove ${file.name}`}
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="space-y-1 p-3">
                            <p className="truncate text-sm font-medium text-white" title={file.name}>{file.name}</p>
                            <p className="truncate text-xs text-[var(--text-secondary)]" title={file.name}>{file.name}</p>
                            <div className="flex items-center gap-2 text-xs text-white/55">
                              <FileText className="h-3.5 w-3.5" />
                              <span>{formatAssessmentFileSize(file.size)}</span>
                            </div>
                          </div>
                        </article>
                      </div>
                    </div>
                  ) : null}
                </div>
                {fileError ? <p className="text-sm text-red-400">{fileError}</p> : null}
              </div>
            ) : (
              <div className="space-y-2">
                <Label className="text-white/80">Choose File</Label>
                <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 px-5 py-4 text-sm text-white/55">
                  File upload is optional for the selected submission method.
                </div>
              </div>
            )}

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button
                type="button"
                onClick={handleCancel}
                className="rounded-2xl border border-white/15 bg-white/10 px-6 py-3 text-white transition-colors duration-200 hover:bg-white/15"
              >
                <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-xl border border-slate-400/30 bg-slate-500/15 text-slate-300">
                  <X className="h-4 w-4" />
                </span>
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleUpload}
                className="rounded-2xl border border-white/25 bg-white/20 px-6 py-3 font-semibold text-white ring-1 ring-[#3B240F]/20 transition-colors duration-200 hover:bg-white/30"
              >
                <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-xl border border-amber-400/30 bg-amber-500/15 text-amber-300">
                  <Upload className="h-4 w-4" />
                </span>
                Upload Assignment
              </Button>
            </div>
            {uploadMessage ? (
              <p className={`text-sm font-medium ${uploadStatus === "success" ? "text-emerald-300" : "text-red-300"}`}>
                {uploadMessage}
              </p>
            ) : null}
          </div>
        </section>
      </div>

      <SubjectFileDuplicateDialog
        open={duplicateDialogOpen}
        duplicateFileName={pendingDuplicateMatch?.attachmentName ?? null}
        existingLocations={pendingDuplicateMatch ? buildDuplicateAssignmentLocations(pendingDuplicateMatch) : []}
        busy={duplicateDecisionBusy}
        onDecision={handleDuplicateDecision}
        onOpenChange={(open) => {
          if (!open) {
            void handleDuplicateDecision("cancel");
            return;
          }
          setDuplicateDialogOpen(true);
        }}
      />

      <SubjectFileDuplicateDialog
        open={titleDuplicateDialogOpen}
        duplicateFileName={pendingTitleDuplicateMatch?.assignmentTitle ?? null}
        existingLocations={pendingTitleDuplicateMatch ? buildDuplicateAssignmentTitleLocations(pendingTitleDuplicateMatch) : []}
        busy={titleDuplicateDecisionBusy}
        dialogTitle="Duplicate assignment title found"
        description="An assignment with this title already exists in the same class and subject."
        duplicateItemLabel="Existing assignment title"
        onDecision={handleTitleDuplicateDecision}
        onOpenChange={(open) => {
          if (!open) {
            void handleTitleDuplicateDecision("cancel");
            return;
          }
          setTitleDuplicateDialogOpen(true);
        }}
      />
    </div>
  );
}













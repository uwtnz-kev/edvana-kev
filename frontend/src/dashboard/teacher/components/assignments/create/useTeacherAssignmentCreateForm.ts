// Coordinates assignment create state, draft restoration, and save behavior.
import { useEffect, useMemo, useRef, useState, type ChangeEvent, type Dispatch, type SetStateAction } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createAssignment, loadAssignments, seedClasses2, type AssignmentAttachment } from "@/dashboard/teacher/components/assignments";
import { clearCreateDraft as clearQuestionDraft, createQuestionBuilderDraftId } from "@/dashboard/teacher/components/questions/questionsStore";
import {
  findDuplicateAssignmentFile,
  findDuplicateAssignmentTitle,
  validateUploadFile,
  type DuplicateAssignmentFileMatch,
  type DuplicateAssignmentTitleMatch,
} from "@/dashboard/teacher/components/shared";
import { getQuestionBuilderPersistenceValues, requiresQuestionBuilder, type SubmissionMethod } from "@/dashboard/teacher/components/shared/assessment/submissionMethods";
import { FIELD_IDS, allTouched, initialTouched, initialValues } from "./assignmentCreateConstants";
import { buildAttachmentId, buildErrors, canSaveAssignment, resolveFormValues } from "./assignmentCreateUtils";
import type { AssignmentCreateLocationState, FieldName, FormValues, TeacherAssignmentCreateFormProps, TouchedState } from "./assignmentCreateTypes";

export function useTeacherAssignmentCreateForm({ onSaved, subjectId, subjectName, lockedClassId, lockedClassLabel }: Pick<TeacherAssignmentCreateFormProps, "onSaved" | "subjectId" | "subjectName" | "lockedClassId" | "lockedClassLabel">) {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = (location.state as AssignmentCreateLocationState | null) ?? null;
  const [questionDraftId] = useState(() => locationState?.questionDraftId?.trim() ? locationState.questionDraftId : createQuestionBuilderDraftId("assignment"));
  const [values, setValues] = useState<FormValues>(() => applyLockedClass(initialValues, lockedClassId, lockedClassLabel));
  const [touched, setTouched] = useState(initialTouched);
  const [attachments, setAttachments] = useState<AssignmentAttachment[]>([]);
  const [attachmentsError, setAttachmentsError] = useState<string | null>(null);
  const [isQuestionsPreviewOpen, setIsQuestionsPreviewOpen] = useState(false);
  const [duplicateDialogOpen, setDuplicateDialogOpen] = useState(false);
  const [pendingDuplicateMatch, setPendingDuplicateMatch] = useState<DuplicateAssignmentFileMatch | null>(null);
  const [pendingDuplicateFile, setPendingDuplicateFile] = useState<File | null>(null);
  const [pendingRemainingFiles, setPendingRemainingFiles] = useState<File[]>([]);
  const [duplicateDecisionBusy, setDuplicateDecisionBusy] = useState(false);
  const [titleDuplicateDialogOpen, setTitleDuplicateDialogOpen] = useState(false);
  const [pendingTitleDuplicateMatch, setPendingTitleDuplicateMatch] = useState<DuplicateAssignmentTitleMatch | null>(null);
  const [titleDuplicateDecisionBusy, setTitleDuplicateDecisionBusy] = useState(false);
  const attachmentsInputRef = useRef<HTMLInputElement | null>(null);
  const previousQuestionCountRef = useRef(initialValues.totalQuestions);
  const errors = useMemo(() => buildErrors(values), [values]);
  const allowsFileUpload = useMemo(() => values.submissionMethods.includes("file_upload"), [values.submissionMethods]);
  const isClassLocked = Boolean(lockedClassId && lockedClassLabel);

  useEffect(() => {
    if (!locationState?.questionDraftId?.trim()) clearQuestionDraft("assignment");
  }, [locationState?.questionDraftId]);

  useEffect(() => {
    setValues(applyLockedClass(resolveFormValues(locationState), lockedClassId, lockedClassLabel));
  }, [locationState, lockedClassId, lockedClassLabel]);

  useEffect(() => {
    if (!allowsFileUpload) {
      setAttachmentsError(null);
      setDuplicateDialogOpen(false);
      setPendingDuplicateMatch(null);
      setPendingDuplicateFile(null);
      setPendingRemainingFiles([]);
      setDuplicateDecisionBusy(false);
      setTitleDuplicateDialogOpen(false);
      setPendingTitleDuplicateMatch(null);
      setTitleDuplicateDecisionBusy(false);
    }
  }, [allowsFileUpload]);

  const onFieldChange = (name: FieldName, value: string) => setValues((prev) => ({ ...prev, [name]: value }));
  const onFieldBlur = (name: FieldName) => setTouched((prev: TouchedState) => ({ ...prev, [name]: true }));
  const onSubmissionMethodsChange = (nextMethods: SubmissionMethod[]) => {
    const nextRequiresBuilder = requiresQuestionBuilder(nextMethods);
    setValues((prev) => {
      const currentRequiresBuilder = requiresQuestionBuilder(prev.submissionMethods);
      if (currentRequiresBuilder && !nextRequiresBuilder && prev.totalQuestions !== "0") previousQuestionCountRef.current = prev.totalQuestions;
      return {
        ...prev,
        submissionMethods: nextMethods,
        totalQuestions: nextRequiresBuilder ? (prev.totalQuestions === "0" ? previousQuestionCountRef.current : prev.totalQuestions) : "0",
      };
    });
    setTouched((prev) => ({ ...prev, submissionMethods: true }));
  };

  const onClassChange = (classId: string) => {
    if (isClassLocked) return;
    const selectedClass = seedClasses2.find((item) => item.id === classId) ?? null;
    setValues((prev) => ({ ...prev, classId, classLabel: selectedClass?.label ?? "" }));
    setTouched((prev) => ({ ...prev, classId: true }));
  };

  const processPickedAttachments = (files: File[], skipDuplicateCheckForCurrent = false) => {
    const nextAttachments: AssignmentAttachment[] = [];
    let nextError: string | null = null;

    for (const [index, file] of files.entries()) {
      const validation = validateUploadFile(file);
      if (!validation.isValid) {
        if (!nextError) nextError = validation.error;
        continue;
      }

      if (!skipDuplicateCheckForCurrent) {
        const duplicateResult = findDuplicateAssignmentFile(
          { name: file.name, size: file.size, lastModified: file.lastModified },
          loadAssignments(),
          { classId: values.classId || undefined, subject: subjectName },
        );

        if (duplicateResult.isDuplicate && duplicateResult.match) {
          if (nextAttachments.length > 0) {
            setAttachments((prev) => [...prev, ...nextAttachments]);
          }
          setAttachmentsError(nextError);
          setPendingDuplicateMatch(duplicateResult.match);
          setPendingDuplicateFile(file);
          setPendingRemainingFiles(files.slice(index + 1));
          setDuplicateDialogOpen(true);
          return;
        }
      }

      nextAttachments.push({ id: buildAttachmentId(), name: file.name, size: file.size, type: file.type, lastModified: file.lastModified });
      skipDuplicateCheckForCurrent = false;
    }

    if (nextAttachments.length > 0) {
      setAttachments((prev) => [...prev, ...nextAttachments]);
    }
    setAttachmentsError(nextError);
  };

  const onPickAttachments = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (!fileList?.length) return;
    processPickedAttachments(Array.from(fileList));
    event.target.value = "";
  };

  const handleDuplicateDecision = async (decision: "proceed" | "cancel") => {
    if (decision === "cancel") {
      setDuplicateDialogOpen(false);
      setPendingDuplicateMatch(null);
      setPendingDuplicateFile(null);
      const remainingFiles = pendingRemainingFiles;
      setPendingRemainingFiles([]);
      if (remainingFiles.length > 0) processPickedAttachments(remainingFiles);
      return;
    }

    if (!pendingDuplicateFile) {
      setDuplicateDialogOpen(false);
      setPendingDuplicateMatch(null);
      setPendingRemainingFiles([]);
      return;
    }

    setDuplicateDecisionBusy(true);
    setDuplicateDialogOpen(false);

    try {
      setAttachments((prev) => [...prev, { id: buildAttachmentId(), name: pendingDuplicateFile.name, size: pendingDuplicateFile.size, type: pendingDuplicateFile.type, lastModified: pendingDuplicateFile.lastModified }]);
      setAttachmentsError(null);
      const remainingFiles = pendingRemainingFiles;
      setPendingDuplicateMatch(null);
      setPendingDuplicateFile(null);
      setPendingRemainingFiles([]);
      if (remainingFiles.length > 0) processPickedAttachments(remainingFiles);
    } finally {
      setDuplicateDecisionBusy(false);
    }
  };

  const persistAssignment = () => {
    const dueDate = new Date(values.dueAt);
    const accessCode = values.accessCode.trim() || undefined;
    const maxScore = values.maxScore.trim() ? Number(values.maxScore.trim()) : undefined;
    const questionBuilderValues = getQuestionBuilderPersistenceValues(values.submissionMethods, values.questionsText, values.totalQuestions);
    const payload = { title: values.title.trim(), subject: subjectName, classId: values.classLabel.trim().toLowerCase(), classLabel: values.classLabel, dueAt: Number.isNaN(dueDate.getTime()) ? new Date().toISOString() : dueDate.toISOString(), status: "draft" as const, totalAttempts: Number(values.totalAttempts), totalQuestions: questionBuilderValues.totalQuestions, totalSubmissions: 0, pendingToGrade: 0, estimatedMinutes: Number(values.estimatedMinutes), submissionMethods: values.submissionMethods, instructions: values.instructions.trim(), questionsText: questionBuilderValues.questionsText, attachments: allowsFileUpload && attachments.length ? attachments : undefined, maxScore: typeof maxScore === "number" && Number.isFinite(maxScore) ? maxScore : undefined, accessCode };
    console.info("[AssignmentsCreate] onSave", {
      routeSubjectId: subjectId,
      routeSubjectName: subjectName,
      selectedClassId: values.classId,
      selectedClassLabel: values.classLabel,
      payload,
    });
    createAssignment(payload);
    clearQuestionDraft("assignment", questionDraftId);
    onSaved(subjectId, values.classLabel.trim().toLowerCase() || undefined);
  };

  const onSave = () => {
    if (!canSaveAssignment(errors)) return markInvalidFields(errors, setTouched);

    const duplicateResult = findDuplicateAssignmentTitle(
      { title: values.title.trim() },
      loadAssignments(),
      { classId: values.classLabel.trim().toLowerCase() || undefined, subject: subjectName },
    );

    if (duplicateResult.isDuplicate && duplicateResult.match) {
      setPendingTitleDuplicateMatch(duplicateResult.match);
      setTitleDuplicateDialogOpen(true);
      return;
    }

    persistAssignment();
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
      persistAssignment();
    } finally {
      setTitleDuplicateDecisionBusy(false);
      setPendingTitleDuplicateMatch(null);
    }
  };

  return {
    allowsFileUpload,
    attachments,
    attachmentsError,
    attachmentsInputRef,
    duplicateDecisionBusy,
    duplicateDialogOpen,
    errors,
    handleDuplicateDecision,
    handleTitleDuplicateDecision,
    isClassLocked,
    isQuestionsPreviewOpen,
    onClassChange,
    onFieldBlur,
    onFieldChange,
    onPickAttachments,
    onRemoveAttachment: (id: string) => { setAttachments((prev) => prev.filter((item) => item.id !== id)); setAttachmentsError(null); },
    onClearAttachments: () => { setAttachments([]); setAttachmentsError(null); },
    onOpenQuestionBuilder: () => { if (!requiresQuestionBuilder(values.submissionMethods)) return; navigate("/dashboard/teacher/questions/create?type=assignment", { state: { formDraft: values, originPath: `${location.pathname}${location.search}`, originState: location.state, parentType: "assignment", mode: "create", questionDraftId, subjectId } }); },
    onSave,
    onSubmissionMethodsChange,
    pendingDuplicateMatch,
    pendingTitleDuplicateMatch,
    requiresQuestionBuilder: requiresQuestionBuilder(values.submissionMethods),
    setDuplicateDialogOpen,
    setIsQuestionsPreviewOpen,
    setTitleDuplicateDialogOpen,
    titleDuplicateDecisionBusy,
    titleDuplicateDialogOpen,
    touched,
    values,
  };
}

function applyLockedClass(values: FormValues, lockedClassId?: string, lockedClassLabel?: string) {
  if (!lockedClassId || !lockedClassLabel) return values;
  return { ...values, classId: lockedClassId, classLabel: lockedClassLabel };
}

// Marks all invalid fields as touched and scrolls the earliest invalid input into view.
function markInvalidFields(errors: ReturnType<typeof buildErrors>, setTouched: Dispatch<SetStateAction<TouchedState>>) {
  setTouched(allTouched);
  const firstInvalid = (Object.keys(FIELD_IDS) as FieldName[]).find((field) => Boolean(errors[field]));
  document.getElementById(firstInvalid ? FIELD_IDS[firstInvalid] : "")?.scrollIntoView({ behavior: "smooth", block: "center" });
}

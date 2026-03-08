// Owns builder field state, roster generation, and draft persistence.
import { useEffect, useMemo, useState } from "react";
import { USER_ROLES } from "@/constants/roles";
import { mockStudentUsers } from "@/shared/mocks/users/students";
import { AssessmentType, BuilderRow, createGradeListDraftPayload } from "./gradeListBuilderHelpers";

export function useGradeListBuilderState(listName: string) {
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");
  const [semester, setSemester] = useState("");
  const [assessmentType, setAssessmentType] = useState<AssessmentType>("");
  const [maxScore, setMaxScore] = useState("");
  const [rows, setRows] = useState<BuilderRow[]>([]);

  const students = useMemo(() => mockStudentUsers
    .filter((user) => user.role === USER_ROLES.STUDENT)
    .filter((user) => (grade ? user.grade === grade : true))
    .map((user) => ({ id: user.id, name: `${user.firstName} ${user.lastName}` })), [grade]);

  const ready = Boolean(grade && subject && semester && assessmentType);

  useEffect(() => {
    if (!ready) {
      setRows([]);
      return;
    }

    setRows(students.map((student) => ({
      studentId: student.id,
      studentName: student.name,
      score: "",
    })));
  }, [ready, students]);

  function setScore(studentId: string, value: string) {
    setRows((previousRows) => previousRows.map((row) => (
      row.studentId === studentId ? { ...row, score: value } : row
    )));
  }

  function saveDraft() {
    const payload = createGradeListDraftPayload({
      assessmentType,
      grade,
      listName,
      maxScore,
      rows,
      semester,
      subject,
    });
    localStorage.setItem(`teacher.gradeListDraft.${listName}`, JSON.stringify(payload));
  }

  return {
    assessmentType, grade, maxScore, ready, rows, semester, setAssessmentType,
    setGrade, setMaxScore, setScore, setSemester, setSubject, subject, saveDraft,
  };
}

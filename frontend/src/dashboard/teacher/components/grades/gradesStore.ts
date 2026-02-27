import { GradeItem, StudentGrade } from "./gradesTypes";

const STORAGE_KEY = "teacher.grades.v1";

interface GradesState {
  gradeItems: GradeItem[];
  studentGrades: StudentGrade[];
}

function getInitialState(): GradesState {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) return JSON.parse(raw);

  const initial: GradesState = {
    gradeItems: [
      {
        id: "g1",
        title: "Algebra Test 1",
        type: "exam",
        maxScore: 100,
        subjectId: "math",
      },
      {
        id: "g3",
        title: "Algebra Quick Quiz 1",                                                                                                                                                                                              
        type: "quiz",
        maxScore: 10,
        subjectId: "math",
      },
      {     
        id: "g2",
        title: "Homework 3",
        type: "assignment",
        maxScore: 20,
        subjectId: "math",
      },
    ],
    studentGrades: [],
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
  return initial;
}

function saveState(state: GradesState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function getGradesState(): GradesState {
  return getInitialState();
}

export function updateStudentGrade(updated: StudentGrade) {
  const state = getInitialState();
  const idx = state.studentGrades.findIndex(g => g.id === updated.id);

  if (idx >= 0) {
    state.studentGrades[idx] = updated;
  } else {
    state.studentGrades.push(updated);
  }

  saveState(state);
}

// shared/mocks/students.ts

import { USER_ROLES } from "@/constants/roles";
import { LoginUser } from "@/types/user";

export const mockStudentUsers: LoginUser[] = [
  {
    id: "student-uuid-1",
    email: "alice@student.com",
    password: "password123",
    firstName: "Alice",
    lastName: "Umutoni",
    role: USER_ROLES.STUDENT,
    grade: "S3",
    gradeCombination: "Science",
    subGrade: "A",
    schoolId: "school-uuid-1",
    parentId: "parent-uuid-1",
  },
  {
    id: "student-uuid-2",
    email: "eric@student.com",
    password: "ericpass456",
    firstName: "Eric",
    lastName: "Niyonzima",
    role: USER_ROLES.STUDENT,
    grade: "S2",
    gradeCombination: "Literature",
    subGrade: "B",
    schoolId: "school-uuid-2",
    parentId: "parent-uuid-2",
  },
];
import type { Student } from "./types";

export const mockStudents: Student[] = [
  {
    id: "std-001",
    firstName: "Alice",
    lastName: "Uwimana",
    email: "alice.uwimana@student.edu",
    phone: "+250788111222",
    class: "S3A",
    status: "Active",
    enrollmentDate: "2024-09-01",
    parentEmail: "parent1@email.com",
  },
  {
    id: "std-002",
    firstName: "David",
    lastName: "Mugisha",
    email: "david.mugisha@student.edu",
    phone: "+250788222333",
    class: "S3A",
    status: "Active",
    enrollmentDate: "2024-09-01",
    parentEmail: "parent2@email.com",
  },
  {
    id: "std-003",
    firstName: "Grace",
    lastName: "Kamikazi",
    email: "grace.kamikazi@student.edu",
    phone: "+250788333444",
    class: "S2B",
    status: "Inactive",
    enrollmentDate: "2023-09-01",
    parentEmail: "parent3@email.com",
  },
];

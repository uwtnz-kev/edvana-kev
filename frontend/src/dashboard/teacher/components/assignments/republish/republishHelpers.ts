import { mockStudents } from "@/dashboard/teacher/components/students/mock";
import type { RepublishEligibleStudent } from "./republishTypes";

type RepublishableAssessment = {
  classLabel: string;
  subject?: string;
  includeAssignmentRepublishDecoys?: boolean;
};

const s3aMathematicsRepublishDecoyStudents = [
  { id: "republish-s3a-math-001", firstName: "Naomi", lastName: "Iradukunda", class: "S3A" },
  { id: "republish-s3a-math-002", firstName: "Ethan", lastName: "Mukasa", class: "S3A" },
  { id: "republish-s3a-math-003", firstName: "Sandrine", lastName: "Uwera", class: "S3A" },
  { id: "republish-s3a-math-004", firstName: "Joel", lastName: "Habimana", class: "S3A" },
  { id: "republish-s3a-math-005", firstName: "Clarisse", lastName: "Niyigena", class: "S3A" },
  { id: "republish-s3a-math-006", firstName: "Samuel", lastName: "Tuyishime", class: "S3A" },
  { id: "republish-s3a-math-007", firstName: "Aline", lastName: "Mukantwari", class: "S3A" },
  { id: "republish-s3a-math-008", firstName: "Bryan", lastName: "Nshimiyimana", class: "S3A" },
  { id: "republish-s3a-math-009", firstName: "Diane", lastName: "Ingabire", class: "S3A" },
  { id: "republish-s3a-math-010", firstName: "Kevin", lastName: "Munyaneza", class: "S3A" },
  { id: "republish-s3a-math-011", firstName: "Fiona", lastName: "Nkurunziza", class: "S3A" },
  { id: "republish-s3a-math-012", firstName: "Patrick", lastName: "Ndayisaba", class: "S3A" },
  { id: "republish-s3a-math-013", firstName: "Lilian", lastName: "Uwitonze", class: "S3A" },
  { id: "republish-s3a-math-014", firstName: "Arnold", lastName: "Nsengiyumva", class: "S3A" },
  { id: "republish-s3a-math-015", firstName: "Belise", lastName: "Mukamugema", class: "S3A" },
  { id: "republish-s3a-math-016", firstName: "Christian", lastName: "Rukundo", class: "S3A" },
  { id: "republish-s3a-math-017", firstName: "Esther", lastName: "Nyirahabimana", class: "S3A" },
  { id: "republish-s3a-math-018", firstName: "Thierry", lastName: "Sibomana", class: "S3A" },
  { id: "republish-s3a-math-019", firstName: "Joy", lastName: "Umutoni", class: "S3A" },
  { id: "republish-s3a-math-020", firstName: "Yvan", lastName: "Mugiraneza", class: "S3A" },
] as const;

export function getRepublishEligibleStudents(assessment: RepublishableAssessment): RepublishEligibleStudent[] {
  const republishSource =
    assessment.includeAssignmentRepublishDecoys && assessment.classLabel === "S3A" && assessment.subject === "Mathematics"
      ? [
          ...mockStudents,
          ...s3aMathematicsRepublishDecoyStudents.map((student) => ({
            ...student,
            email: `${student.firstName.toLowerCase()}.${student.lastName.toLowerCase()}@student.edu`,
            phone: "",
            status: "Active" as const,
            enrollmentDate: "2024-09-01",
            parentEmail: undefined,
          })),
        ]
      : mockStudents;

  return republishSource
    .filter((student) => student.class === assessment.classLabel && student.status === "Active")
    .map((student) => ({
      id: student.id,
      fullName: `${student.firstName} ${student.lastName}`,
      className: student.class,
    }));
}

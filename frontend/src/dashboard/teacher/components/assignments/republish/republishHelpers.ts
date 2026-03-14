import { mockStudents } from "@/dashboard/teacher/components/students/mock";
import type { RepublishEligibleStudent } from "./republishTypes";

type RepublishableAssessment = {
  classLabel: string;
};

export function getRepublishEligibleStudents(assessment: RepublishableAssessment): RepublishEligibleStudent[] {
  return mockStudents
    .filter((student) => student.class === assessment.classLabel && student.status === "Active")
    .map((student) => ({
      id: student.id,
      fullName: `${student.firstName} ${student.lastName}`,
      className: student.class,
    }));
}

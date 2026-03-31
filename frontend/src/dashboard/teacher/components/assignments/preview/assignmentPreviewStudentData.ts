import { mockStudents } from "@/dashboard/teacher/components/students/mock";
import type { TeacherAssignment } from "../AssignmentsTypes";

export type AssignmentPreviewStudentRecord = {
  id: string;
  fullName: string;
  classLabel: string;
  submitted: boolean;
  submittedAt?: string;
};

type PreviewRosterEntry = {
  id: string;
  fullName: string;
  classLabel: string;
};

const previewRosterByClass: Record<string, PreviewRosterEntry[]> = {
  S3A: [
    { id: "preview-s3a-001", fullName: "Naomi Iradukunda", classLabel: "S3A" },
    { id: "preview-s3a-002", fullName: "Ethan Mukasa", classLabel: "S3A" },
    { id: "preview-s3a-003", fullName: "Sandrine Uwera", classLabel: "S3A" },
    { id: "preview-s3a-004", fullName: "Joel Habimana", classLabel: "S3A" },
    { id: "preview-s3a-005", fullName: "Clarisse Niyigena", classLabel: "S3A" },
    { id: "preview-s3a-006", fullName: "Samuel Tuyishime", classLabel: "S3A" },
  ],
  S3B: [
    { id: "preview-s3b-001", fullName: "Lilian Uwase", classLabel: "S3B" },
    { id: "preview-s3b-002", fullName: "Cedric Ntirenganya", classLabel: "S3B" },
    { id: "preview-s3b-003", fullName: "Diane Mukamana", classLabel: "S3B" },
    { id: "preview-s3b-004", fullName: "Patrick Mbarushimana", classLabel: "S3B" },
  ],
  S2A: [
    { id: "preview-s2a-001", fullName: "Aline Nyirahabimana", classLabel: "S2A" },
    { id: "preview-s2a-002", fullName: "Kevin Habineza", classLabel: "S2A" },
    { id: "preview-s2a-003", fullName: "Belise Uwamahoro", classLabel: "S2A" },
    { id: "preview-s2a-004", fullName: "Yvan Ndayishimiye", classLabel: "S2A" },
  ],
  S2B: [
    { id: "preview-s2b-001", fullName: "Fiona Mukarugwiza", classLabel: "S2B" },
    { id: "preview-s2b-002", fullName: "Thierry Bizimana", classLabel: "S2B" },
    { id: "preview-s2b-003", fullName: "Joy Uwera", classLabel: "S2B" },
    { id: "preview-s2b-004", fullName: "Arnold Nshimirimana", classLabel: "S2B" },
  ],
  S1A: [
    { id: "preview-s1a-001", fullName: "Mary Ishimwe", classLabel: "S1A" },
    { id: "preview-s1a-002", fullName: "Bryan Ndayambaje", classLabel: "S1A" },
    { id: "preview-s1a-003", fullName: "Esther Umutoni", classLabel: "S1A" },
    { id: "preview-s1a-004", fullName: "Christian Mugabo", classLabel: "S1A" },
  ],
};

function buildClassRoster(classLabel: string): PreviewRosterEntry[] {
  const baseStudents = mockStudents
    .filter((student) => student.class === classLabel && student.status === "Active")
    .map((student) => ({
      id: student.id,
      fullName: `${student.firstName} ${student.lastName}`,
      classLabel: student.class,
    }));

  const roster = [...baseStudents, ...(previewRosterByClass[classLabel] ?? [])];
  const seen = new Set<string>();

  return roster.filter((student) => {
    if (seen.has(student.id)) return false;
    seen.add(student.id);
    return true;
  });
}

function buildSubmittedAt(createdAt: string, position: number) {
  const parsed = new Date(createdAt);
  if (Number.isNaN(parsed.getTime())) return undefined;
  parsed.setHours(parsed.getHours() + 12 * (position + 1));
  return parsed.toISOString();
}

function getSubmittedCount(assignment: TeacherAssignment, rosterLength: number) {
  if (rosterLength === 0) return 0;
  if (assignment.totalSubmissions <= 0) return 0;
  if (rosterLength === 1) return 1;
  return Math.min(assignment.totalSubmissions, rosterLength - 1);
}

function getRotationOffset(seed: string, length: number) {
  if (length === 0) return 0;
  const hash = Array.from(seed).reduce((sum, character) => sum + character.charCodeAt(0), 0);
  return hash % length;
}

export function getAssignmentPreviewStudentRecords(assignment: TeacherAssignment): AssignmentPreviewStudentRecord[] {
  const roster = buildClassRoster(assignment.classLabel);
  const submittedCount = getSubmittedCount(assignment, roster.length);
  const rotationOffset = getRotationOffset(assignment.id, roster.length);
  const rotatedRoster = roster.length === 0
    ? []
    : roster.map((_, index) => roster[(index + rotationOffset) % roster.length]);
  const submittedIds = new Set(rotatedRoster.slice(0, submittedCount).map((student) => student.id));

  return roster.map((student, index) => ({
    id: student.id,
    fullName: student.fullName,
    classLabel: student.classLabel,
    submitted: submittedIds.has(student.id),
    submittedAt: submittedIds.has(student.id) ? buildSubmittedAt(assignment.createdAt, index) : undefined,
  }));
}

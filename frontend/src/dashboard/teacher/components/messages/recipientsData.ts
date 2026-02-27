// src/dashboard/teacher/components/messages/recipientsData.ts
export type Option = { value: string; label: string };

export const MESSAGE_MAX = 170;

export const RECIPIENT_ROLE_OPTIONS: Option[] = [
  { value: "administrator", label: "Administrator" },
  { value: "teacher", label: "Teacher" },
  { value: "parents", label: "Parents" },
  { value: "student", label: "Student" },
];

export const RECIPIENT_LABEL_MAP: Record<string, string> = {
  administrator: "Search administrators",
  teacher: "Search teachers",
  parents: "Search parents",
  student: "Search students",
};

export const RECIPIENTS_BY_ROLE: Record<string, Option[]> = {
  administrator: [
    { value: "admin.rose.mugisha", label: "Rose Mugisha" },
    { value: "admin.patrick.gatarayiha", label: "Patrick Gatarayiha" },
    { value: "admin.jedidah", label: "Jedidah" },
  ],
  teacher: [
    { value: "teacher.alice", label: "Alice Teacher" },
    { value: "teacher.brian", label: "Brian Teacher" },
    { value: "teacher.claire", label: "Claire Teacher" },
  ],
  parents: [
    { value: "parent.rose.mugisha", label: "Rose Mugisha" },
    { value: "parent.john.doe", label: "John Doe" },
    { value: "parent.jane.doe", label: "Jane Doe" },
  ],
  student: [
    { value: "student.anna", label: "Anna Student" },
    { value: "student.peter", label: "Peter Student" },
    { value: "student.mary", label: "Mary Student" },
  ],
};
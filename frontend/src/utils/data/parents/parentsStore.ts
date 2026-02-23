export type ParentStatus = "active" | "inactive";

export type ParentStudentLink = {
  id: string;
  fullName: string;
  studentCode?: string;
  grade?: string;
  className?: string;
};

export type ParentRecord = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address?: string;
  nationalIdOrPassport?: string;
  status: ParentStatus;
  students: ParentStudentLink[];
  createdAtLabel?: string;
  updatedAtLabel?: string;
};

const STORAGE_KEY = "edvana_parents_store_v1";

const seedParents: ParentRecord[] = [
  {
    id: "parent-1",
    fullName: "John Uwimana",
    email: "john.uwimana@email.com",
    phone: "+250788123456",
    address: "Kigali, Rwanda",
    nationalIdOrPassport: "1198712345678901",
    status: "active",
    students: [
      {
        id: "student-1",
        fullName: "Alice Uwimana",
        studentCode: "STD001",
        grade: "P6",
        className: "P6A",
      },
    ],
    createdAtLabel: "about 1 hour ago",
    updatedAtLabel: "about 1 hour ago",
  },
  {
    id: "parent-2",
    fullName: "Marie Uwimana",
    email: "marie.uwimana@example.com",
    phone: "+250 788 123 456",
    address: "Kigali, Rwanda",
    nationalIdOrPassport: "RW9988776655",
    status: "active",
    students: [
      {
        id: "student-2",
        fullName: "Eric Uwimana",
        studentCode: "STD002",
        grade: "S3",
        className: "S3A",
      },
      {
        id: "student-3",
        fullName: "Diane Uwimana",
        studentCode: "STD003",
        grade: "S1",
        className: "S1C",
      },
    ],
    createdAtLabel: "yesterday",
    updatedAtLabel: "today",
  },
];

function safeParse(json: string | null): ParentRecord[] | null {
  if (!json) return null;
  try {
    const parsed = JSON.parse(json);
    if (!Array.isArray(parsed)) return null;
    return parsed as ParentRecord[];
  } catch {
    return null;
  }
}

export function getParentsStore(): ParentRecord[] {
  const fromStorage = safeParse(localStorage.getItem(STORAGE_KEY));
  if (fromStorage && fromStorage.length > 0) return fromStorage;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(seedParents));
  return seedParents;
}

export function saveParentsStore(parents: ParentRecord[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(parents));
}

export function getParentById(parentId: string): ParentRecord | null {
  const parents = getParentsStore();
  return parents.find((p) => p.id === parentId) ?? null;
}
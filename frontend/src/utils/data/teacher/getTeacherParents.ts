import { getParentsStore, getParentById } from "@/utils/data/parents/parentsStore";

export type LinkedStudent = {
  id: string;
  fullName: string;
  className?: string;
};

export type TeacherParentRow = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  students: LinkedStudent[];
};

export async function getTeacherParents(): Promise<TeacherParentRow[]> {
  const parents = getParentsStore();

  return parents.map(p => ({
    id: p.id,
    fullName: p.fullName,
    email: p.email,
    phone: p.phone,
    students: p.students.map(s => ({
      id: s.id,
      fullName: s.fullName,
      className: s.className,
    })),
  }));
}

export async function getTeacherParentDetails(parentId: string) {
  return getParentById(parentId);
}
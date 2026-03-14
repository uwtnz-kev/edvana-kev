// Builds class options and table rows from the student roster.
import type { Student } from "@/dashboard/teacher/components/students";
import { classOf, idOf, nameOf, type Status } from "./attendanceListHelpers";

export function uniqueClassOptions(students: Student[]) {
  const values = new Set<string>();
  students.forEach((student) => {
    const className = classOf(student);
    if (className) values.add(className);
  });
  return Array.from(values).sort();
}

// Defaults each visible student to Present unless changed in the local draft.
export function attendanceRowsForClass(args: {
  classValue: string;
  statusById: Record<string, Status>;
  students: Student[];
}) {
  if (!args.classValue) return [];
  return args.students
    .filter((student) => classOf(student) === args.classValue)
    .map((student) => {
      const id = idOf(student);
      return { id, name: nameOf(student), className: args.classValue, status: args.statusById[id] ?? "present" as Status };
    })
    .filter((row) => row.id);
}

// Orchestrates the students table, including empty state and row rendering.
import { Table, TableBody } from "@/components/ui/table";
import EmptyState from "../EmptyState";
import type { Student } from "../types";
import { StudentTableRow } from "./StudentTableRow";
import { StudentsTableHeader } from "./StudentsTableHeader";

type Props = {
  onView: (student: Student) => void;
  students: Student[];
};

export default function StudentsTable({ onView, students }: Props) {
  if (students.length === 0) return <EmptyState />;

  return (
    <div className="teacher-panel-surface rounded-2xl overflow-hidden teacher-panel-hover">
      <Table>
        <StudentsTableHeader />
        <TableBody>
          {students.map((student) => (
            <StudentTableRow key={student.id} student={student} onView={onView} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}


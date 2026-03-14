// Parents table wrapper that handles the empty state and row rendering.
import type { TeacherParentRow } from "@/utils/data/teacher/getTeacherParents";
import { ParentRow } from "./table/ParentRow";
import { ParentsTableHeader } from "./table/ParentsTableHeader";

type Props = {
  onView: (parentId: string) => void;
  rows: TeacherParentRow[];
};

export function ParentsTable({ onView, rows }: Props) {
  return (
    <div className="overflow-hidden rounded-2xl teacher-panel-surface teacher-panel-hover">
      <div className="overflow-x-auto">
        <table className="w-full table-fixed text-left">
          <ParentsTableHeader />
          <tbody>
            {rows.map((row) => <ParentRow key={row.id} row={row} onView={onView} />)}
            {rows.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-[var(--text-secondary)] text-center">No parents found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}



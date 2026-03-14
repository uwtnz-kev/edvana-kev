/**
 * AttendanceTable
 * ---------------
 * Renders student-level attendance rows for a selected attendance session.
 */
import { Pencil } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { AttendanceRecord, AttendanceStatus } from "./attendanceTypes";

interface Props {
  rows: AttendanceRecord[];
  onEdit?: (row: AttendanceRecord) => void;
  onDelete?: (row: AttendanceRecord) => void;
}

function statusClass(status: AttendanceStatus) {
  if (status === "present") return "bg-emerald-500/15 text-emerald-300 border-emerald-500/30";
  if (status === "late") return "bg-amber-500/15 text-amber-300 border-amber-500/30";
  return "bg-red-500/15 text-red-300 border-red-500/30";
}

function statusLabel(status: AttendanceStatus) {
  if (status === "present") return "Present";
  if (status === "late") return "Late";
  return "Absent";
}

export default function AttendanceTable({ rows, onEdit, onDelete }: Props) {
  void onDelete;

  if (rows.length === 0) {
    return (
      <div className="teacher-panel-surface rounded-2xl p-8 text-center">
        <p className="text-white/70 text-lg">No attendance records</p>
        <p className="text-white/50 text-sm mt-2">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="teacher-panel-surface rounded-2xl overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-white/10 hover:bg-white/5">
            <TableHead className="text-white/80 font-semibold">Student</TableHead>
            <TableHead className="text-white/80 font-semibold">Class</TableHead>
            <TableHead className="text-white/80 font-semibold">Status</TableHead>
            <TableHead className="text-white/80 font-semibold text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id} className="border-white/10 hover:bg-white/5">
              <TableCell className="text-white font-medium">{row.studentName}</TableCell>
              <TableCell>
                <span className="text-sm font-medium text-white">{row.className}</span>
              </TableCell>
              <TableCell>
                <Badge className={`${statusClass(row.status)} rounded-full px-2 py-1 text-xs font-medium border`}>
                  {statusLabel(row.status)}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                {onEdit ? (
                  <Button
                    type="button"
                    onClick={() => onEdit(row)}
                    className="bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-2xl h-8 px-3"
                  >
                    <Pencil className="mr-1.5 h-3.5 w-3.5 text-[var(--accent-primary)]" />
                    Edit
                  </Button>
                ) : null}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

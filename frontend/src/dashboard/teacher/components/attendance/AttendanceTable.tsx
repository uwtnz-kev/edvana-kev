/**
 * AttendanceTable
 * ---------------
 * Renders the A tt en da nc eT ab le UI for the teacher dashboard a tt en da nc e feature.
 */
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
  if (status === "present") return "bg-green-500/20 text-green-700 border-green-500/30";
  return "bg-red-500/20 text-red-700 border-red-500/30";
}

function statusLabel(status: AttendanceStatus) {
  return status === "present" ? "Present" : "Absent";
}

export default function AttendanceTable({ rows, onEdit, onDelete }: Props) {
  if (rows.length === 0) {
    return (
      <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-2xl p-8 text-center">
        <p className="text-white/70 text-lg">No attendance records</p>
        <p className="text-white/50 text-sm mt-2">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-2xl overflow-hidden">
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
                <Badge className="bg-blue-500/20 text-blue-700 border-blue-500/30 rounded-full px-2 py-1 text-xs font-medium border">
                  {row.className}
                </Badge>
              </TableCell>

              <TableCell>
                <Badge className={`${statusClass(row.status)} rounded-full px-2 py-1 text-xs font-medium border`}>
                  {statusLabel(row.status)}
                </Badge>
              </TableCell>

              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  {onEdit ? (
                    <Button
                      type="button"
                      onClick={() => onEdit(row)}
                      className="bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-2xl h-8 px-3"
                    >
                      Edit
                    </Button>
                  ) : null}
                  {onDelete ? (
                    <Button
                      type="button"
                      onClick={() => onDelete(row)}
                      className="bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-2xl h-8 px-3"
                    >
                      Delete
                    </Button>
                  ) : null}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}


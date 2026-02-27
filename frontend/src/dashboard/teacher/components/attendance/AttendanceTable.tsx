import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { AttendanceRecord, AttendanceStatus } from "./attendanceTypes";

interface Props {
  rows: AttendanceRecord[];
}

function statusClass(status: AttendanceStatus) {
  if (status === "Present")
    return "bg-green-500/20 text-green-700 border-green-500/30";
  if (status === "Absent")
    return "bg-red-500/20 text-red-700 border-red-500/30";
  if (status === "Late")
    return "bg-yellow-500/20 text-yellow-700 border-yellow-500/30";
  return "bg-blue-500/20 text-blue-700 border-blue-500/30";
}

export default function AttendanceTable({ rows }: Props) {
  if (rows.length === 0) {
    return (
      <div className="bg-white/15 backdrop-blur-xl border border-white/25 shadow-xl rounded-2xl p-8 text-center">
        <p className="text-white/70 text-lg">No attendance records</p>
        <p className="text-white/50 text-sm mt-2">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="bg-white/15 backdrop-blur-xl border border-white/25 shadow-xl rounded-2xl overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-white/20 hover:bg-white/5">
            <TableHead className="text-blue-900 font-semibold">
              Student
            </TableHead>
            <TableHead className="text-blue-900 font-semibold">
              Class
            </TableHead>
            <TableHead className="text-blue-900 font-semibold">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.map((r) => (
            <TableRow key={r.id} className="border-white/10 hover:bg-white/5">
              <TableCell className="text-black font-medium">
                {r.studentName}
              </TableCell>

              <TableCell>
                <Badge className="bg-blue-500/20 text-blue-700 border-blue-500/30 rounded-full px-2 py-1 text-xs font-medium border">
                  {r.className}
                </Badge>
              </TableCell>

              <TableCell>
                <Badge
                  className={`${statusClass(
                    r.status
                  )} rounded-full px-2 py-1 text-xs font-medium border`}
                >
                  {r.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
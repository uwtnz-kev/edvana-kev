/**
 * AttendanceCreateTable
 * ---------------------
 * Renders the A tt en da nc eC re at eT ab le UI for the teacher dashboard a tt en da nc e feature.
 */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  GlassSelect,
  GlassSelectContent,
  GlassSelectItem,
  GlassSelectTrigger,
  GlassSelectValue,
} from "@/dashboard/schooladmin/components/ui/GlassSelect";
import type { AttendanceStatus } from "./attendanceTypes";

type Status = AttendanceStatus;

type Row = {
  id: string;
  name: string;
  className: string;
  status: Status;
};

interface Props {
  rows: Row[];
  onStatusChange: (studentId: string, status: Status) => void;
}

export default function AttendanceCreateTable({ rows, onStatusChange }: Props) {
  return (
    <div className="teacher-panel-surface rounded-2xl overflow-hidden">
      <Table className="table-fixed">
        <colgroup>
          <col className="w-[50%]" />
          <col className="w-[20%]" />
          <col className="w-[30%]" />
        </colgroup>
        <TableHeader>
          <TableRow className="border-white/20 hover:bg-white/5">
            <TableHead className="px-6 text-white font-semibold">Student</TableHead>
            <TableHead className="px-6 text-white font-semibold">Class</TableHead>
            <TableHead className="px-6 text-white font-semibold text-center">Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.map(r => (
            <TableRow key={r.id} className="border-white/10 hover:bg-white/5">
              <TableCell className="px-6 text-white font-medium">{r.name}</TableCell>
              <TableCell className="px-6 text-white">{r.className}</TableCell>
              <TableCell className="px-6 text-white">
                <div className="flex items-center justify-center">
                  <div className="w-full max-w-[220px]">
                    <GlassSelect
                      value={r.status}
                      onValueChange={v => onStatusChange(r.id, v as Status)}
                    >
                      <GlassSelectTrigger className="w-full bg-white/25 border-white/35 text-white [&>span]:text-white [&_svg]:text-white [&_svg]:opacity-80">
                        <GlassSelectValue placeholder="Select status" />
                      </GlassSelectTrigger>
                      <GlassSelectContent className="text-white">
                        <GlassSelectItem value="present" className="text-white focus:bg-white/10 focus:text-white">Present</GlassSelectItem>
                        <GlassSelectItem value="late" className="text-white focus:bg-white/10 focus:text-white">Late</GlassSelectItem>
                        <GlassSelectItem value="absent" className="text-white focus:bg-white/10 focus:text-white">Absent</GlassSelectItem>
                      </GlassSelectContent>
                    </GlassSelect>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}




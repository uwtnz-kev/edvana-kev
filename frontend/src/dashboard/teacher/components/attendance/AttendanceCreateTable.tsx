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

type Status = "Present" | "Absent" | "Late";

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
    <div className="bg-white/15 backdrop-blur-xl border border-white/25 shadow-xl rounded-2xl overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-white/20 hover:bg-white/5">
            <TableHead className="text-blue-900 font-semibold">Student</TableHead>
            <TableHead className="text-blue-900 font-semibold">Class</TableHead>
            <TableHead className="text-blue-900 font-semibold">Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.map(r => (
            <TableRow key={r.id} className="border-white/10 hover:bg-white/5">
              <TableCell className="text-black font-medium">{r.name}</TableCell>
              <TableCell className="text-black">{r.className}</TableCell>
              <TableCell className="w-[220px]">
                <GlassSelect
                  value={r.status}
                  onValueChange={v => onStatusChange(r.id, v as Status)}
                >
                  <GlassSelectTrigger className="w-full bg-white/25 border-white/35">
                    <GlassSelectValue placeholder="Select status" />
                  </GlassSelectTrigger>
                  <GlassSelectContent>
                    <GlassSelectItem value="Present">Present</GlassSelectItem>
                    <GlassSelectItem value="Late">Late</GlassSelectItem>
                    <GlassSelectItem value="Absent">Absent</GlassSelectItem>
                  </GlassSelectContent>
                </GlassSelect>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
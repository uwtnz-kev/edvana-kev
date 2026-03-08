// Renders the attendance status and note controls.
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { AttendanceStatus } from "@/dashboard/teacher/components/attendance";

type Props = {
  note: string;
  setNote: (value: string) => void;
  setStatus: (value: AttendanceStatus) => void;
  status: AttendanceStatus;
};

export function AttendanceEditFields({ note, setNote, setStatus, status }: Props) {
  return (
    <>
      <div className="space-y-2">
        <Label className="text-[#3B240F]">Status</Label>
        <Select value={status} onValueChange={(value) => setStatus(value as AttendanceStatus)}>
          <SelectTrigger className="bg-white/10 border-white/10 rounded-2xl"><SelectValue placeholder="Select status" /></SelectTrigger>
          <SelectContent className="bg-white/10 border-white/10 backdrop-blur-xl rounded-2xl">
            <SelectItem value="Present">Present</SelectItem>
            <SelectItem value="Absent">Absent</SelectItem>
            <SelectItem value="Late">Late</SelectItem>
            <SelectItem value="Excused">Excused</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label className="text-[#3B240F]">Note</Label>
        <Textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Optional note" className="bg-white/10 border-white/10 rounded-2xl" />
      </div>
    </>
  );
}



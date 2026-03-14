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
        <Label className="text-[var(--text-primary)]">Status</Label>
        <Select value={status} onValueChange={(value) => setStatus(value as AttendanceStatus)}>
          <SelectTrigger className="bg-white/10 border-white/10 rounded-2xl text-white [&>span]:text-white [&_svg]:text-white [&_svg]:opacity-80"><SelectValue placeholder="Select status" /></SelectTrigger>
          <SelectContent className="bg-white/10 border-white/10 backdrop-blur-xl rounded-2xl text-white">
            <SelectItem value="present" className="focus:bg-white/10">Present</SelectItem>
            <SelectItem value="absent" className="focus:bg-white/10">Absent</SelectItem>
            <SelectItem value="late" className="focus:bg-white/10">Late</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label className="text-[var(--text-primary)]">Note</Label>
        <Textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Optional note" className="bg-white/10 border-white/10 rounded-2xl text-white placeholder:text-white/60" />
      </div>
    </>
  );
}




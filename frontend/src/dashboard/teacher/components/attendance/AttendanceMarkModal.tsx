import React, { useEffect, useMemo, useState } from "react";
import { ClipboardCheck, StickyNote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import {
  GlassSelect,
  GlassSelectContent,
  GlassSelectItem,
  GlassSelectTrigger,
  GlassSelectValue,
} from "@/dashboard/schooladmin/components/ui/GlassSelect";

import type { AttendanceRecord, AttendanceStatus } from "./attendanceTypes";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  row: AttendanceRecord | null;
  onSave: (next: { status: AttendanceStatus; note?: string }) => void;
};

const statusOptions: AttendanceStatus[] = ["Present", "Absent", "Late", "Excused"];

export default function AttendanceMarkModal({ open, onOpenChange, row, onSave }: Props) {
  const [status, setStatus] = useState<AttendanceStatus>("Present");
  const [note, setNote] = useState("");

  useEffect(() => {
    if (!row) return;
    setStatus(row.status);
    setNote(row.note ?? "");
  }, [row]);

  const title = useMemo(() => {
    if (!row) return "Mark Attendance";
    return `Mark: ${row.studentName}`;
  }, [row]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[520px] bg-white/10 backdrop-blur-xl border border-white/25">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ClipboardCheck className="h-5 w-5" />
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Status</div>
            <GlassSelect value={status} onValueChange={v => setStatus(v as AttendanceStatus)}>
              <GlassSelectTrigger className="w-full">
                <GlassSelectValue placeholder="Select status" />
              </GlassSelectTrigger>
              <GlassSelectContent>
                {statusOptions.map(s => (
                  <GlassSelectItem key={s} value={s}>
                    {s}
                  </GlassSelectItem>
                ))}
              </GlassSelectContent>
            </GlassSelect>
          </div>

          <div className="space-y-2">
            <div className="text-sm text-muted-foreground flex items-center gap-2">
              <StickyNote className="h-4 w-4" />
              Note
            </div>
            <Textarea
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="Optional note (e.g., arrived late due to transport)"
              className="bg-white/5"
              rows={4}
            />
          </div>

          <div className="flex items-center justify-end gap-2">
            <Button variant="ghost" onClick={() => onOpenChange(false)} className="hover:bg-white/10">
              Cancel
            </Button>
            <Button
              onClick={() => onSave({ status, note: note.trim() || undefined })}
              className="hover:scale-[1.02] transition-transform"
              disabled={!row}
            >
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
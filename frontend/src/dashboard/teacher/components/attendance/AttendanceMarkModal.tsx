/**
 * AttendanceMarkModal
 * -------------------
 * Renders the modal UI for the teacher dashboard a tt en da nc e feature.
 */
import { useEffect, useMemo, useState } from "react";
import { ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";

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
  record: AttendanceRecord | null;
  onSave: (id: string, status: AttendanceStatus) => void;
};

const STATUS_OPTIONS: Array<{ label: string; value: AttendanceStatus }> = [
  { label: "Present", value: "present" },
  { label: "Absent", value: "absent" },
];

export default function AttendanceMarkModal({ open, onOpenChange, record, onSave }: Props) {
  const [status, setStatus] = useState<AttendanceStatus>("present");

  useEffect(() => {
    if (!record) return;
    setStatus(record.status);
  }, [record]);

  const title = useMemo(() => {
    if (!record) return "Edit Attendance";
    return `Edit: ${record.studentName}`;
  }, [record]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay className="bg-black/40" />
        <DialogContent className="sm:max-w-[520px] bg-white/20 backdrop-blur-2xl border border-white/30 shadow-2xl">
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
                  {STATUS_OPTIONS.map((option) => (
                    <GlassSelectItem key={option.value} value={option.value}>
                      {option.label}
                    </GlassSelectItem>
                  ))}
                </GlassSelectContent>
              </GlassSelect>
            </div>

            <div className="flex items-center justify-end gap-2">
              <Button variant="ghost" onClick={() => onOpenChange(false)} className="hover:bg-white/10">
                Cancel
              </Button>
              <Button
                onClick={() => {
                  if (!record) return;
                  onSave(record.id, status);
                }}
                className="hover:scale-[1.02] transition-transform"
                disabled={!record}
              >
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}




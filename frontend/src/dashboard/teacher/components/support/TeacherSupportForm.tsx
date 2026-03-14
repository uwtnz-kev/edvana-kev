/**
 * TeacherSupportForm
 * ------------------
 * Renders the form UI for the teacher dashboard s up po rt feature.
 */
import { useMemo, useState } from "react";
import { CheckCircle2, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { TicketType, typeHints } from "./supportData";

type SupportPriority = "low" | "normal" | "high";

type SubmittedRequestSummary = {
  priority: SupportPriority;
  subject: string;
  typeLabel: string;
};

export default function TeacherSupportForm({
  type,
  subjectId,
  subjectName,
}: {
  type: TicketType;
  subjectId?: string;
  subjectName?: string;
}) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState<SupportPriority>("normal");
  const [validationMessage, setValidationMessage] = useState("");
  const [successSummary, setSuccessSummary] = useState<SubmittedRequestSummary | null>(null);

  const cfg = useMemo(() => typeHints[type], [type]);

  const submit = () => {
    if (!subject.trim() || !message.trim()) {
      setValidationMessage("Add subject and message.");
      return;
    }

    setValidationMessage("");
    setSuccessSummary({
      typeLabel: cfg.label,
      priority,
      subject: subject.trim(),
    });
    setSubject("");
    setMessage("");
    setPriority("normal");
  };

  return (
    <>
      <div className="rounded-2xl border border-white/15 bg-white/10 p-6 space-y-4 backdrop-blur-xl shadow-sm">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl p-3 bg-[var(--sidebar-item-active)] text-[var(--accent-primary)]">
            <MessageSquare className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-semibold text-white">Submit a request</h2>
        </div>

        <div className="text-sm text-[var(--text-secondary)]">
          <span className="font-medium text-white">{cfg.label}:</span> {cfg.hint}
        </div>

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as SupportPriority)}
          className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white focus:outline-none"
        >
          <option className="bg-black text-white" value="low">Low</option>
          <option className="bg-black text-white" value="normal">Normal</option>
          <option className="bg-black text-white" value="high">High</option>
        </select>

        <Input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Short summary"
          className="border-white/15 bg-white/10 text-white placeholder:text-white/70"
        />

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Details, class, subject, steps..."
          className="w-full min-h-[160px] rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-white/70 focus:outline-none"
        />

        {validationMessage ? (
          <p className="text-sm font-medium text-rose-200">{validationMessage}</p>
        ) : null}

        <div className="flex justify-end">
          <Button
            onClick={submit}
            className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/15 px-6 py-2 text-white transition-all duration-200 hover:bg-white/25"
          >
            <Send className="h-4 w-4 text-emerald-300" />
            Send
          </Button>
        </div>
      </div>

      <Dialog open={Boolean(successSummary)} onOpenChange={(open) => !open && setSuccessSummary(null)}>
        <DialogPortal>
          <DialogOverlay className="bg-slate-950/75 backdrop-blur-sm" />
          <DialogContent className="max-w-md rounded-3xl border border-white/10 bg-[#1b2430]/95 p-7 text-white shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl [&>button]:hidden">
            <DialogHeader className="space-y-3 text-left">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-400/25 bg-emerald-400/15 text-emerald-300">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <DialogTitle className="text-2xl font-semibold tracking-tight text-white">Request sent</DialogTitle>
              <DialogDescription className="text-sm leading-6 text-[var(--text-secondary)]">
                Your support request has been recorded. A summary is shown below.
              </DialogDescription>
            </DialogHeader>

            {successSummary ? (
              <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-white/60">Type</span>
                  <span className="text-right text-white">{successSummary.typeLabel}</span>
                </div>
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-white/60">Priority</span>
                  <span className="text-right capitalize text-white">{successSummary.priority}</span>
                </div>
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-white/60">Subject</span>
                  <span className="text-right text-white">{successSummary.subject}</span>
                </div>
              </div>
            ) : null}

            <div className="flex justify-end">
              <Button
                type="button"
                onClick={() => setSuccessSummary(null)}
                className="rounded-2xl border border-white/15 bg-white/10 px-6 py-3 text-white transition-colors duration-200 hover:bg-white/15"
              >
                OK
              </Button>
            </div>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </>
  );
}


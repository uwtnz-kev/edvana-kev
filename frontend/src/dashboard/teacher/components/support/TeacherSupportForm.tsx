/**
 * TeacherSupportForm
 * ------------------
 * Renders the form UI for the teacher dashboard s up po rt feature.
 */
import { useMemo, useState } from "react";
import { MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TicketType, typeHints } from "./supportData";

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
  const [priority, setPriority] = useState<"low" | "normal" | "high">("normal");

  const cfg = useMemo(() => typeHints[type], [type]);

  const submit = () => {
    if (!subject.trim() || !message.trim()) return alert("Add subject and message.");
    alert(`Sent.\nType: ${cfg.label}\nPriority: ${priority}\nSubject: ${subject}`);
    setSubject("");
    setMessage("");
    setPriority("normal");
  };

  return (
    <div className="rounded-2xl border border-white/15 bg-white/10 p-6 space-y-4 backdrop-blur-xl shadow-sm">
      <div className="flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#DDF4EE] text-[#15856F]">
          <MessageSquare className="h-5 w-5" />
        </div>
        <h2 className="text-xl font-semibold text-[#3B240F]">Submit a request</h2>
      </div>

      <div className="text-[#3B240F]/70 text-sm">
        <span className="text-[#3B240F] font-medium">{cfg.label}:</span> {cfg.hint}
      </div>

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value as any)}
        className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-[#3B240F] focus:outline-none"
      >
        <option className="bg-black text-white" value="low">Low</option>
        <option className="bg-black text-white" value="normal">Normal</option>
        <option className="bg-black text-white" value="high">High</option>
      </select>

      <Input
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="Short summary"
        className="bg-white/10 border-white/15 text-[#3B240F] placeholder:text-[#3B240F]/50"
      />

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Details, class, subject, steps..."
        className="w-full min-h-[160px] rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-[#3B240F] placeholder:text-[#3B240F]/50 focus:outline-none"
      />

      <div className="flex justify-end">
        <Button
          onClick={submit}
          className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/15 px-6 py-2 text-[#3B240F] transition-all duration-200 hover:bg-white/25"
        >
          <Send className="h-4 w-4" />
          Send
        </Button>
      </div>
    </div>
  );
}


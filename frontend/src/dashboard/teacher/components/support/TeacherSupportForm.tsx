import { useMemo, useState } from "react";
import { MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TicketType, typeHints } from "./supportData";

export default function TeacherSupportForm({ type }: { type: TicketType }) {
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
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl p-6 space-y-4">
      <div className="flex items-center gap-2">
        <MessageSquare className="h-5 w-5 text-[#1EA896]" />
        <h2 className="text-xl font-semibold text-white">Submit a request</h2>
      </div>

      <div className="text-white/70 text-sm">
        <span className="text-white font-medium">{cfg.label}:</span> {cfg.hint}
      </div>

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value as any)}
        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white focus:outline-none"
      >
        <option className="bg-black text-white" value="low">Low</option>
        <option className="bg-black text-white" value="normal">Normal</option>
        <option className="bg-black text-white" value="high">High</option>
      </select>

      <Input
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="Short summary"
        className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
      />

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Details, class, subject, steps..."
        className="w-full min-h-[160px] px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder:text-white/50 focus:outline-none"
      />

      <div className="flex justify-end">
        <Button
          onClick={submit}
          className="bg-gradient-to-r from-[#1EA896] to-[#1EA896]/90 text-white px-6 py-2 rounded-xl flex items-center gap-2"
        >
          <Send className="h-4 w-4" />
          Send
        </Button>
      </div>
    </div>
  );
}

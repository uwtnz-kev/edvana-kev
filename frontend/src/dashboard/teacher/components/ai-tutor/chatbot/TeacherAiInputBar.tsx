import { useState } from "react";
import { Send } from "lucide-react";

export default function TeacherAiInputBar({
  onSend,
  disabled,
}: {
  onSend: (text: string) => void;
  disabled: boolean;
}) {
  const [value, setValue] = useState("");

  const submit = () => {
    if (!value.trim() || disabled) return;
    onSend(value);
    setValue("");
  };

  return (
    <div className="p-4 sm:p-6 border-t border-white/10">
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Ask AI for a lesson plan, quiz, rubric, or explanation..."
          className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#1EA896]/40"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submit();
            }
          }}
          disabled={disabled}
        />

        <button
          onClick={submit}
          disabled={disabled}
          className="px-4 py-3 rounded-xl bg-gradient-to-r from-[#1EA896]/20 to-[#1EA896]/10 border border-[#1EA896]/30 text-white hover:opacity-90 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
          <span className="hidden sm:inline">{disabled ? "Thinking" : "Send"}</span>
        </button>
      </div>
    </div>
  );
}

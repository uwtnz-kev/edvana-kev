import { Bot } from "lucide-react";

export function StatCard({
  icon,
  value,
  label,
  iconBg,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  iconBg: string;
}) {
  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-5 shadow-lg">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBg}`}>
          {icon}
        </div>
        <div>
          <div className="text-3xl font-bold text-white leading-none">{value}</div>
          <div className="text-white/60 text-sm mt-1">{label}</div>
        </div>
      </div>
    </div>
  );
}

export function ChatMessage({
  role,
  content,
}: {
  role: "teacher" | "ai";
  content: string;
}) {
  const isAI = role === "ai";
  return (
    <div className={`flex gap-3 ${isAI ? "" : "flex-row-reverse"}`}>
      <div
        className={`w-9 h-9 rounded-full flex items-center justify-center border border-white/10 ${
          isAI ? "bg-white/10" : "bg-[#FF715B]/20"
        }`}
      >
        <Bot className="h-4 w-4 text-white" />
      </div>

      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 border shadow-lg ${
          isAI
            ? "bg-white/5 border-white/10 text-white"
            : "bg-gradient-to-r from-[#FF715B]/20 to-[#FF715B]/10 border-[#FF715B]/30 text-white"
        }`}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
      </div>
    </div>
  );
}

import TeacherChatMessage from "./TeacherChatMessage";

type Msg = { id: string; role: "teacher" | "ai"; content: string };

export default function TeacherAiChatWindow({
  messages,
  isThinking,
}: {
  messages: Msg[];
  isThinking: boolean;
}) {
  return (
    <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto space-y-3">
      {messages.map((m) => (
        <TeacherChatMessage key={m.id} role={m.role} content={m.content} />
      ))}

      {isThinking && (
        <TeacherChatMessage role="ai" content="Thinking..." isTyping />
      )}
    </div>
  );
}

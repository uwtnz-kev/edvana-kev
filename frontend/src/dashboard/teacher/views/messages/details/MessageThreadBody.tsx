// Scrollable thread body that renders each message bubble in the conversation.
import type { ThreadMessage } from "@/dashboard/teacher/components/messages/messagesTypes";

type Props = {
  messages: ThreadMessage[];
};

export function MessageThreadBody({ messages }: Props) {
  return (
    <div className="max-h-[52vh] space-y-4 overflow-y-auto p-6">
      {messages.map((message) => {
        const mine = message.authorName.toLowerCase() === "you";
        return (
          <article key={message.id} className={`rounded-2xl border p-5 ${mine ? "ml-auto max-w-3xl border-teal-300/40 bg-teal-400/15" : "max-w-3xl border-white/15 bg-white/10"}`}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              {!mine ? <div><p className="font-semibold text-[var(--text-primary)]">{message.authorName}</p>{message.authorMeta ? <p className="text-sm text-[var(--text-secondary)]">{message.authorMeta}</p> : null}</div> : null}
              <p className="text-xs font-medium text-[var(--text-secondary)]">{message.createdAtLabel}</p>
            </div>
            <div className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-[var(--text-primary)]">{message.body}</div>
          </article>
        );
      })}
    </div>
  );
}


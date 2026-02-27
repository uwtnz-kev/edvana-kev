import type { ThreadMessage } from "./messagesTypes";
import EmptyConversation from "./EmptyConversation";

export default function ConversationCard(props: {
  title?: string;
  headerName?: string;
  headerMeta?: string;
  headerTime?: string;
  messages: ThreadMessage[];
  empty: boolean;
}) {
  return (
    <div className="h-full rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md overflow-hidden hover:bg-white/12 transition">
      {props.empty ? (
        <EmptyConversation />
      ) : (
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-white/10">
            <div className="text-2xl font-semibold text-[#3B240F]">
              {props.title}
            </div>
          </div>

          <div className="flex-1 overflow-auto p-6">
            <div className="font-semibold text-[#3B240F]">{props.headerName}</div>
            <div className="mt-1 text-sm text-[#6B4F3A]">{props.headerMeta}</div>
            <div className="mt-1 text-sm text-[#6B4F3A]">{props.headerTime}</div>

            <div className="mt-6 space-y-4">
              {props.messages.map(m => (
                <div
                  key={m.id}
                  className="rounded-2xl border border-white/15 bg-white/10 p-5 hover:bg-white/12 transition"
                >
                  <div className="text-sm text-[#6B4F3A]">{m.createdAtLabel}</div>
                  <div className="mt-3 whitespace-pre-wrap text-[#3B240F] leading-relaxed">
                    {m.body}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
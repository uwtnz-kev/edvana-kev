import { Check, Star } from "lucide-react";
import type { MessageThread } from "./messagesTypes";

type Props = {
  thread: MessageThread;
  selected: boolean;
  active: boolean;
  onOpen: () => void;
  onToggleSelect: () => void;
  onStar: () => void;
};

export default function ThreadRow(props: Props) {
  const t = props.thread;
  const isUnread = t.unreadCount > 0;

  return (
    <button
      type="button"
      onClick={props.onOpen}
      className={`
        w-full text-left px-4 py-4 border-b border-white/10 hover:bg-white/10 transition
        ${props.active ? "bg-white/10 ring-1 ring-white/20" : ""}
      `}
    >
      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={e => {
            e.stopPropagation();
            props.onToggleSelect();
          }}
          className={`
            mt-1 h-5 w-5 rounded border-2 flex items-center justify-center transition
            ${
              props.selected
                ? "bg-[#1EA896] border-[#1EA896]"
                : "bg-transparent border-[#6B4F3A]/50"
            }
          `}
          title="Select"
        >
          {props.selected && <Check className="h-3 w-3 text-white" />}
        </button>

        <div className="mt-2">
          <div
            className={`
              h-3 w-3 rounded-full
              ${isUnread ? "bg-[#C65A5A]/70" : "bg-[#3F7D5C]/70"}
            `}
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div className="text-xs font-semibold text-[#1EA896]">
              {t.dateLabel}
            </div>

            {t.unreadCount > 0 && (
              <div className="h-6 w-6 rounded-full bg-[#1EA896] text-white text-xs font-semibold flex items-center justify-center shadow-md">
                {t.unreadCount}
              </div>
            )}
          </div>

          <div className="mt-2 font-semibold text-sm text-[#3B240F] truncate">
            {t.fromName}
          </div>

          <div className="mt-2 text-sm text-[#3B240F] truncate">
            {t.subject}
          </div>

          <div className="mt-1 text-sm text-[#6B4F3A] truncate">
            {t.preview}
          </div>
        </div>

        <button
          type="button"
          onClick={e => {
            e.stopPropagation();
            props.onStar();
          }}
          className="mt-10 p-2 rounded-lg hover:bg-white/10 transition"
          title="Star"
        >
          <Star
            className={`h-4 w-4 ${
              t.starred ? "text-[#FF715B]" : "text-[#6B4F3A]"
            }`}
          />
        </button>
      </div>
    </button>
  );
}
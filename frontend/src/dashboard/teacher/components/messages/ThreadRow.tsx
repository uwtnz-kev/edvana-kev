/**
 * ThreadRow
 * ---------
 * Implements the T hr ea dR ow module for the teacher dashboard m es sa ge s feature.
 */
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
      className={`w-full cursor-pointer border-b border-white/10 px-4 py-4 text-left transition hover:bg-white/10 ${
        props.active ? "bg-white/10 ring-1 ring-white/20" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            props.onToggleSelect();
          }}
          className={`flex h-5 w-5 items-center justify-center rounded border-2 transition ${
            props.selected
              ? "border-[#1EA896] bg-[#1EA896]"
              : "border-[#6B4F3A]/50 bg-transparent"
          }`}
          title="Select"
        >
          {props.selected && <Check className="h-3 w-3 text-white" />}
        </button>

        <div className="flex w-4 justify-center">
          <div className={`h-2.5 w-2.5 rounded-full ${isUnread ? "bg-[#1EA896]" : "bg-transparent"}`} />
        </div>

        <div className="min-w-0 w-[220px] shrink-0">
          <div className={`truncate text-sm ${isUnread ? "font-semibold text-white" : "font-medium text-white"}`}>
            {t.fromName}
          </div>
          <div className="mt-1 truncate text-xs text-[var(--text-muted)]">{t.courseName}</div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="truncate text-sm text-white">
            <span className={isUnread ? "font-semibold" : "font-medium"}>{t.subject}</span>
            <span className="mx-2 text-[var(--text-muted)]">-</span>
            <span className="text-[var(--text-secondary)]">{t.preview}</span>
          </div>
        </div>

        {t.unreadCount > 0 ? (
          <div className="hidden shrink-0 rounded-full bg-[#1EA896] px-2 py-1 text-xs font-semibold text-white sm:flex">
            {t.unreadCount}
          </div>
        ) : null}

        <div className="w-[104px] shrink-0 text-right text-xs font-semibold text-[var(--text-muted)]">
          {t.dateLabel}
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            props.onStar();
          }}
          className="rounded-lg p-2 transition hover:bg-white/10"
          title="Star"
        >
          <Star className={`h-4 w-4 ${t.starred ? "text-[#FF715B]" : "text-[var(--text-muted)]"}`} />
        </button>
      </div>
    </button>
  );
}


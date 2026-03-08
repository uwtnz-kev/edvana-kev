// Provides shared toolbar options and styling helpers.
import type { MessageFolder } from "../messagesTypes";

export type ToolbarOption = { value: string; label: string };

export const iconButtonClass =
  "h-12 w-12 rounded-xl border border-white/15 bg-white/10 backdrop-blur-md hover:bg-white/15 transition disabled:opacity-40 disabled:hover:bg-white/10";

export const folderItems: ToolbarOption[] = [
  { value: "inbox", label: "Inbox" },
  { value: "read", label: "Read" },
  { value: "unread", label: "Unread" },
  { value: "sent", label: "Sent" },
  { value: "archived", label: "Archived" },
];

// Narrows the select value back to the message folder union used by the store.
export function toMessageFolder(value: string) {
  return value as MessageFolder;
}

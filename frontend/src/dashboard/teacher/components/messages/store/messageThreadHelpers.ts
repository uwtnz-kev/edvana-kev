// Thread helper functions for previews, timestamps, and reply message creation.
import type { MessageThread, ThreadMessage } from "../messagesTypes";

// Replies use the current locale string to match the existing message UI.
export function buildReplyMessage(threadId: string, body: string): ThreadMessage {
  return {
    id: `m-${Date.now()}`,
    threadId,
    authorName: "You",
    authorMeta: "Teacher",
    createdAtLabel: new Date().toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" }),
    body: body.trim(),
  };
}

export function updateThreadPreview(thread: MessageThread, preview: string): MessageThread {
  return { ...thread, preview, body: preview, dateLabel: "Just now", timestamp: "Just now", unreadCount: 0, isRead: true, folder: thread.folder === "archived" ? "inbox" : thread.folder };
}

// New outbound messages become teacher-sent threads with a realistic summary in the list.
export function buildSentThread(to: string, message: string): MessageThread {
  const id = `t-${Date.now()}`;
  const preview = message.trim().replace(/\s+/g, " ").slice(0, 72);
  return {
    id,
    courseId: "all",
    courseName: to,
    fromName: "You",
    fromRole: "Teacher",
    senderName: "You",
    senderRole: "Teacher",
    recipientName: to,
    participants: ["You", to],
    subject: `Message to ${to}`,
    preview: `${preview}${message.trim().length > 72 ? "..." : ""}`,
    body: message.trim(),
    dateLabel: "Just now",
    timestamp: "Just now",
    unreadCount: 0,
    isRead: true,
    starred: false,
    folder: "sent",
  };
}

export function buildSentMessage(threadId: string, body: string): ThreadMessage {
  return {
    id: `m-${Date.now()}`,
    threadId,
    authorName: "You",
    authorMeta: "Teacher",
    createdAtLabel: new Date().toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" }),
    body: body.trim(),
  };
}

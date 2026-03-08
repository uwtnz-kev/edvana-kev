// Selectors for courses, threads, and messages in the teacher messages store.
import type { MessageFolder, MessageThread, ThreadMessage } from "../messagesTypes";
import { seedCourses, seedMessages, seedThreads } from "./messageSeedData";
import { MSG_KEY, readJson, THREADS_KEY } from "./messagePersistence";

export function getCourses() {
  return seedCourses;
}

export function listThreads(args: { courseId: string; folder: MessageFolder; query: string }): MessageThread[] {
  const all = readJson<MessageThread[]>(THREADS_KEY, seedThreads);
  return all
    .filter((thread) => (args.courseId === "all" ? true : thread.courseId === args.courseId))
    .filter((thread) => {
      if (args.folder === "inbox") return thread.folder === "inbox";
      if (args.folder === "archived") return thread.folder === "archived";
      if (args.folder === "unread") return thread.folder === "inbox" && thread.unreadCount > 0;
      if (args.folder === "read") return thread.folder === "inbox" && thread.unreadCount === 0;
      return args.folder === "sent" ? thread.folder === "sent" : true;
    })
    .filter((thread) => !args.query.trim() || `${thread.fromName} ${thread.recipientName ?? ""} ${thread.subject} ${thread.preview}`.toLowerCase().includes(args.query.trim().toLowerCase()));
}

export function getThreadMessages(threadId: string): ThreadMessage[] {
  return readJson<ThreadMessage[]>(MSG_KEY, seedMessages).filter((message) => message.threadId === threadId);
}

export function getThreadById(threadId: string): MessageThread | null {
  return readJson<MessageThread[]>(THREADS_KEY, seedThreads).find((thread) => thread.id === threadId) ?? null;
}

// Sum unread inbox threads for the sidebar badge so it reflects actual pending messages.
export function getUnreadMessagesCount() {
  return readJson<MessageThread[]>(THREADS_KEY, seedThreads)
    .filter((thread) => thread.folder === "inbox")
    .reduce((total, thread) => total + Math.max(0, thread.unreadCount), 0);
}

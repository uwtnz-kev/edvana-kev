// Mutation functions for teacher message thread actions and replies.
import type { MessageThread, ThreadMessage } from "../messagesTypes";
import { seedMessages, seedThreads } from "./messageSeedData";
import { buildReplyMessage, buildSentMessage, buildSentThread, updateThreadPreview } from "./messageThreadHelpers";
import { MSG_KEY, readJson, THREADS_KEY, writeJson } from "./messagePersistence";

function updateThreads(updater: (threads: MessageThread[]) => MessageThread[]) {
  writeJson(THREADS_KEY, updater(readJson<MessageThread[]>(THREADS_KEY, seedThreads)));
}

export function createSentThread(to: string, body: string) {
  const thread = buildSentThread(to, body);
  updateThreads((threads) => [thread, ...threads]);
  const allMessages = readJson<ThreadMessage[]>(MSG_KEY, seedMessages);
  writeJson(MSG_KEY, [buildSentMessage(thread.id, body), ...allMessages]);
}

export function appendThreadReply(threadId: string, body: string) {
  const nextBody = body.trim();
  if (!nextBody) return;
  const allMessages = readJson<ThreadMessage[]>(MSG_KEY, seedMessages);
  writeJson(MSG_KEY, [...allMessages, buildReplyMessage(threadId, nextBody)]);
  updateThreads((threads) => threads.map((thread) => (thread.id === threadId ? updateThreadPreview(thread, nextBody) : thread)));
}

export function toggleStar(threadId: string) {
  updateThreads((threads) => threads.map((thread) => (thread.id === threadId ? { ...thread, starred: !thread.starred } : thread)));
}

export function deleteThread(threadId: string) {
  updateThreads((threads) => threads.filter((thread) => thread.id !== threadId));
  writeJson(MSG_KEY, readJson<ThreadMessage[]>(MSG_KEY, seedMessages).filter((message) => message.threadId !== threadId));
}

export function archiveThread(threadId: string) {
  updateThreads((threads) => threads.map((thread) => (thread.id === threadId ? { ...thread, folder: "archived", unreadCount: 0, isRead: true } : thread)));
}

export function markAsRead(threadId: string) {
  updateThreads((threads) => threads.map((thread) => (thread.id === threadId ? { ...thread, unreadCount: 0, isRead: true } : thread)));
}

export function markUnread(threadId: string) {
  updateThreads((threads) => threads.map((thread) => (thread.id === threadId ? { ...thread, unreadCount: Math.max(1, thread.unreadCount), isRead: false } : thread)));
}

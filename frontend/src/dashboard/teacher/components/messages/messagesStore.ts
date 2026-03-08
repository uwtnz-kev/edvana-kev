// Re-exports the modular teacher messages store while preserving the public API.
export {
  appendThreadReply,
  archiveThread,
  createSentThread,
  deleteThread,
  ensureMessagesSeeded,
  getCourses,
  getUnreadMessagesCount,
  getThreadById,
  getThreadMessages,
  listThreads,
  markAsRead,
  markUnread,
  subscribeMessagesChanged,
  toggleStar,
} from "./store";

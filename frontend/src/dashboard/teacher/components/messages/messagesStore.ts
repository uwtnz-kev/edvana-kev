import type {
  CourseOption,
  MessageFolder,
  MessageThread,
  ThreadMessage,
} from "./messagesTypes";

const THREADS_KEY = "teacher.messages.threads.v1";
const MSG_KEY = "teacher.messages.items.v1";

const seedCourses: CourseOption[] = [
  { id: "all", name: "All Courses" },
  { id: "c1", name: "Mathematics S3A" },
  { id: "c2", name: "Biology S2B" },
];

const seedThreads: MessageThread[] = [
  {
    id: "t1",
    courseId: "c1",
    courseName: "Mathematics S3A",
    fromName: "Marvin I. Mallari",
    subject: "3 Things to Remember with 2 John 1:6 as a student",
    preview: "Here are 3 things to remember and do based on 2 John 1:6...",
    dateLabel: "Feb 16, 2026",
    unreadCount: 1,
    starred: false,
    folder: "unread",
  },
  {
    id: "t2",
    courseId: "c2",
    courseName: "Biology S2B",
    fromName: "Marvin I. Mallari",
    subject: "You Are Significant",
    preview: "You are significant. Psalms 8:3-4 When...",
    dateLabel: "Jan 26, 2026",
    unreadCount: 0,
    starred: false,
    folder: "inbox",
  },
];

const seedMessages: ThreadMessage[] = [
  {
    id: "m1",
    threadId: "t1",
    authorName: "Marvin I. Mallari",
    authorMeta: "Guidance and Counselling Services",
    createdAtLabel: "Feb 16, 2026 at 4:49pm",
    body: "Here are 3 things to remember and do based on 2 John 1:6...",
  },
];

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function ensureMessagesSeeded() {
  const existing = localStorage.getItem(THREADS_KEY);
  if (existing) return;
  writeJson(THREADS_KEY, seedThreads);
  writeJson(MSG_KEY, seedMessages);
}

export function getCourses(): CourseOption[] {
  return seedCourses;
}

function isSentThread(threadId: string) {
  const msgs = readJson<ThreadMessage[]>(MSG_KEY, seedMessages).filter(
    (m) => m.threadId === threadId
  );
  const last = msgs[msgs.length - 1];
  if (!last) return false;
  return (last.authorName ?? "").toLowerCase() === "you";
}

export function listThreads(args: {
  courseId: string;
  folder: MessageFolder;
  query: string;
}): MessageThread[] {
  const all = readJson<MessageThread[]>(THREADS_KEY, seedThreads);

  return all
    .filter((t) => (args.courseId === "all" ? true : t.courseId === args.courseId))
    .filter((t) => {
      if (args.folder === "inbox") return true;
      if (args.folder === "archived") return t.folder === "archived";
      if (args.folder === "unread") return t.unreadCount > 0;
      if (args.folder === "read") return t.unreadCount === 0;
      if (args.folder === "sent") return isSentThread(t.id);
      return true;
    })
    .filter((t) => {
      const q = args.query.trim().toLowerCase();
      if (!q) return true;
      return (t.fromName + " " + t.subject + " " + t.preview).toLowerCase().includes(q);
    });
}

export function getThreadMessages(threadId: string): ThreadMessage[] {
  const all = readJson<ThreadMessage[]>(MSG_KEY, seedMessages);
  return all.filter((m) => m.threadId === threadId);
}

export function toggleStar(threadId: string) {
  const all = readJson<MessageThread[]>(THREADS_KEY, seedThreads);
  writeJson(
    THREADS_KEY,
    all.map((t) => (t.id === threadId ? { ...t, starred: !t.starred } : t))
  );
}

export function deleteThread(threadId: string) {
  const threads = readJson<MessageThread[]>(THREADS_KEY, seedThreads).filter(
    (t) => t.id !== threadId
  );
  writeJson(THREADS_KEY, threads);

  const msgs = readJson<ThreadMessage[]>(MSG_KEY, seedMessages).filter(
    (m) => m.threadId !== threadId
  );
  writeJson(MSG_KEY, msgs);
}

export function archiveThread(threadId: string) {
  const all = readJson<MessageThread[]>(THREADS_KEY, seedThreads);
  writeJson(
    THREADS_KEY,
    all.map((t) =>
      t.id === threadId ? { ...t, folder: "archived", unreadCount: 0 } : t
    )
  );
}

export function markAsRead(threadId: string) {
  const all = readJson<MessageThread[]>(THREADS_KEY, seedThreads);
  writeJson(
    THREADS_KEY,
    all.map((t) => (t.id === threadId ? { ...t, unreadCount: 0 } : t))
  );
}

export function markUnread(threadId: string) {
  const all = readJson<MessageThread[]>(THREADS_KEY, seedThreads);
  writeJson(
    THREADS_KEY,
    all.map((t) =>
      t.id === threadId ? { ...t, unreadCount: Math.max(1, t.unreadCount) } : t
    )
  );
}
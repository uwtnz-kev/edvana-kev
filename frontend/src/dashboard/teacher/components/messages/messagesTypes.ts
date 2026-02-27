export type MessageFolder = "inbox" | "read" | "unread" | "archived" | "sent";
export type CourseOption = { id: string; name: string };

export type MessageThread = {
  id: string;
  courseId: string;
  courseName: string;
  fromName: string;
  subject: string;
  preview: string;
  dateLabel: string;
  unreadCount: number;
  starred: boolean;
  folder: MessageFolder;
};

export type ThreadMessage = {
  id: string;
  threadId: string;
  authorName: string;
  authorMeta?: string;
  createdAtLabel: string;
  body: string;
};

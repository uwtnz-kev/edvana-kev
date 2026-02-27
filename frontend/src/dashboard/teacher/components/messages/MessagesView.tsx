import { useEffect, useMemo, useState } from "react";
import MessagesToolbar from "@/dashboard/teacher/components/messages/MessagesToolbar";
import ThreadsListCard from "@/dashboard/teacher/components/messages/ThreadsListCard";
import ConversationCard from "@/dashboard/teacher/components/messages/ConversationCard";
import type { MessageFolder } from "@/dashboard/teacher/components/messages/messagesTypes";
import {
  ensureMessagesSeeded,
  getCourses,
  getThreadMessages,
  listThreads,
  toggleStar,
} from "@/dashboard/teacher/components/messages/messagesStore";

export default function MessagesView() {
  const [courseId, setCourseId] = useState("all");
  const [folder, setFolder] = useState<MessageFolder>("unread");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [version, setVersion] = useState(0);

  useEffect(() => ensureMessagesSeeded(), []);

  const courseOptions = useMemo(
    () => getCourses().map(c => ({ value: c.id, label: c.name })),
    [],
  );

  const threads = useMemo(
    () => listThreads({ courseId, folder, query }),
    [courseId, folder, query, version],
  );

  const selectedThread = useMemo(
    () => threads.find(t => t.id === selectedId) ?? null,
    [threads, selectedId],
  );

  const messages = useMemo(
    () => (selectedThread ? getThreadMessages(selectedThread.id) : []),
    [selectedThread, version],
  );

  return (
    <div className="space-y-5">
      <MessagesToolbar
        courseId={courseId}
        onCourseChange={setCourseId}
        folder={folder}
        onFolderChange={setFolder}
        query={query}
        onQueryChange={setQuery}
        onPickRecipients={() => {}}
        onCompose={() => {}}
        onReply={() => {}}
        onArchive={() => {}}
        onDownload={() => {}}
        onDelete={() => {}}
        onMore={() => {}}
        courseOptions={courseOptions}
      />

      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 lg:col-span-4">
          <ThreadsListCard
            threads={threads}
            selectedId={selectedId}
            onSelect={setSelectedId}
            onStar={id => {
              toggleStar(id);
              setVersion(v => v + 1);
            }}
          />
        </div>

        <div className="col-span-12 lg:col-span-8">
          <ConversationCard
            empty={!selectedThread}
            title={selectedThread?.subject}
            headerName={messages[0]?.authorName}
            headerMeta={messages[0]?.authorMeta}
            headerTime={messages[0]?.createdAtLabel}
            messages={messages}
          />
        </div>
      </div>
    </div>
  );
}
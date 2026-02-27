import { useEffect, useMemo, useState } from "react";
import MessagesToolbar from "@/dashboard/teacher/components/messages/MessagesToolbar";
import MessagesHeader from "@/dashboard/teacher/components/messages/MessagesHeader";
import ThreadsListCard from "@/dashboard/teacher/components/messages/ThreadsListCard";
import ConversationCard from "@/dashboard/teacher/components/messages/ConversationCard";
import ComposeMessageModal from "@/dashboard/teacher/components/messages/ComposeMessageModal";
import ReplyMessageModal from "@/dashboard/teacher/components/messages/ReplyMessageModal";
import type { MessageFolder } from "@/dashboard/teacher/components/messages/messagesTypes";
import {
  ensureMessagesSeeded,
  getCourses,
  getThreadMessages,
  listThreads,
  toggleStar,
  deleteThread,
  archiveThread,
  markAsRead,
  markUnread,
} from "@/dashboard/teacher/components/messages/messagesStore";

export default function MessagesView() {
  const [courseId, setCourseId] = useState("all");
  const [folder, setFolder] = useState<MessageFolder>("inbox");
  const [query, setQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [version, setVersion] = useState(0);

  const [composeOpen, setComposeOpen] = useState(false);
  const [replyOpen, setReplyOpen] = useState(false);

  useEffect(() => {
    ensureMessagesSeeded();
  }, []);

  const courseOptions = useMemo(
    () => getCourses().map((c) => ({ value: c.id, label: c.name })),
    []
  );

  const threads = useMemo(
    () => listThreads({ courseId, folder, query }),
    [courseId, folder, query, version]
  );

  const activeThread = useMemo(
    () => threads.find((t) => t.id === activeId) ?? null,
    [threads, activeId]
  );

  const messages = useMemo(
    () => (activeThread ? getThreadMessages(activeThread.id) : []),
    [activeThread, version]
  );

  const actionsDisabled = selectedIds.length === 0;

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const openThread = (id: string) => {
    setActiveId(id);
    if (folder === "unread") {
      markAsRead(id);
      setVersion((v) => v + 1);
    }
  };

  const bulkDelete = () => {
    if (!selectedIds.length) return;
    selectedIds.forEach((id) => deleteThread(id));
    if (activeId && selectedIds.includes(activeId)) setActiveId(null);
    setSelectedIds([]);
    setVersion((v) => v + 1);
  };

  const bulkArchive = () => {
    if (!selectedIds.length) return;
    selectedIds.forEach((id) => archiveThread(id));
    if (activeId && selectedIds.includes(activeId)) setActiveId(null);
    setSelectedIds([]);
    setVersion((v) => v + 1);
  };

  const bulkMarkRead = () => {
    if (!selectedIds.length) return;
    selectedIds.forEach((id) => markAsRead(id));
    setVersion((v) => v + 1);
  };

  const bulkMarkUnread = () => {
    if (!selectedIds.length) return;
    selectedIds.forEach((id) => markUnread(id));
    setVersion((v) => v + 1);
  };

  const doMore = () => {
    if (!selectedIds.length) return;
    if (folder === "read") bulkMarkUnread();
    else bulkMarkRead();
  };

  return (
    <div className="space-y-6  px-8 pt-8">
      <MessagesHeader/>
      <MessagesToolbar
        courseId={courseId}
        onCourseChange={setCourseId}
        folder={folder}
        onFolderChange={(v) => {
          setFolder(v);
          setSelectedIds([]);
          setActiveId(null);
        }}
        query={query}
        onQueryChange={setQuery}
        onCompose={() => setComposeOpen(true)}
        onReply={() => {
          if (!activeThread) return;
          setReplyOpen(true);
        }}
        onReplyAll={() => {
          if (!activeThread) return;
          setReplyOpen(true);
        }}
        onArchive={bulkArchive}
        onDelete={bulkDelete}
        onMore={doMore}
        courseOptions={courseOptions}
        actionsDisabled={actionsDisabled}
      />

      <ComposeMessageModal
        open={composeOpen}
        onOpenChange={setComposeOpen}
        mode="compose"
        onSend={() => {}}
      />

      <ReplyMessageModal
        open={replyOpen}
        onOpenChange={setReplyOpen}
        toName={activeThread?.fromName ?? ""}
        onSend={({ message }) => {
          if (!activeThread) return;

          // When you wire real store support, append message to the thread here.
          // For now, bump version so UI refreshes if you later implement store updates.
          void message;
          setVersion((v) => v + 1);
        }}
      />

      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 lg:col-span-4 h-full">
          <ThreadsListCard
            threads={threads}
            selectedIds={selectedIds}
            activeId={activeId}
            onOpen={openThread}
            onToggleSelect={toggleSelect}
            onStar={(id) => {
              toggleStar(id);
              setVersion((v) => v + 1);
            }}
          />
        </div>

        <div className="col-span-12 lg:col-span-8 h-full">
          <ConversationCard
            empty={!activeThread}
            title={activeThread?.subject}
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
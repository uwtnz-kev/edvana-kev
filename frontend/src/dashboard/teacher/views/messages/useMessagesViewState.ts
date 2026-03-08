// Owns message workspace state, list loading, and message actions for the view.
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { MessageFolder } from "@/dashboard/teacher/components/messages/messagesTypes";
import {
  archiveThread,
  createSentThread,
  deleteThread,
  ensureMessagesSeeded,
  listThreads,
  markAsRead,
  toggleStar,
} from "@/dashboard/teacher/components/messages/messagesStore";
import {
  getMessagesSubjectId,
  getMessageRouteState,
  toggleSelectedId,
} from "./messagesViewHelpers";

export function useMessagesViewState() {
  const navigate = useNavigate();
  const location = useLocation();
  const subjectId = getMessagesSubjectId(location);
  const [folder, setFolder] = useState<MessageFolder>("inbox");
  const [query, setQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [version, setVersion] = useState(0);
  const [composeOpen, setComposeOpen] = useState(false);
  // Controls the existing delete confirmation modal before destructive message removal.
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  useEffect(() => {
    ensureMessagesSeeded();
  }, []);

  const threads = useMemo(() => listThreads({ courseId: "all", folder, query }), [folder, query, version]);

  return {
    actionsDisabled: selectedIds.length === 0,
    composeOpen,
    deleteConfirmOpen,
    folder,
    query,
    selectedIds,
    subjectId,
    threads,
    closeCompose: () => setComposeOpen(false),
    openCompose: () => setComposeOpen(true),
    sendCompose: (payload: { message: string; to: string }) => {
      createSentThread(payload.to, payload.message);
      setVersion((current) => current + 1);
    },
    setComposeOpen,
    openReplyTarget: () => {
      if (selectedIds.length !== 1) return;
      navigate(`/dashboard/teacher/messages/${selectedIds[0]}`, { state: getMessageRouteState(subjectId) });
    },
    openThread: (id: string) => {
      if (folder === "unread") {
        markAsRead(id);
        setVersion((current) => current + 1);
      }
      navigate(`/dashboard/teacher/messages/${id}`, { state: getMessageRouteState(subjectId) });
    },
    setFolder: (nextFolder: MessageFolder) => {
      setFolder(nextFolder);
      setSelectedIds([]);
    },
    setQuery,
    toggleSelect: (id: string) => setSelectedIds((current) => toggleSelectedId(current, id)),
    archiveSelected: () => {
      if (!selectedIds.length) return;
      selectedIds.forEach((id) => archiveThread(id));
      setSelectedIds([]);
      setVersion((current) => current + 1);
    },
    closeDeleteConfirm: () => setDeleteConfirmOpen(false),
    // Delete now opens confirmation first so the existing destructive flow is explicit.
    openDeleteConfirm: () => {
      if (!selectedIds.length) return;
      setDeleteConfirmOpen(true);
    },
    confirmDeleteSelected: () => {
      if (!selectedIds.length) return;
      selectedIds.forEach((id) => deleteThread(id));
      setSelectedIds([]);
      setDeleteConfirmOpen(false);
      setVersion((current) => current + 1);
    },
    starThread: (id: string) => {
      toggleStar(id);
      setVersion((current) => current + 1);
    },
  };
}

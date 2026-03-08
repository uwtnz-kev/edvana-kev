// State hook for message details loading, reply draft state, and refresh actions.
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  appendThreadReply,
  ensureMessagesSeeded,
  getThreadById,
  getThreadMessages,
  markAsRead,
} from "@/dashboard/teacher/components/messages/messagesStore";
import type { MessageDetailsRouteState } from "./messageDetailsHelpers";

export function useMessageDetailsState() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams<{ messageId: string }>();
  const routeState = (location.state as MessageDetailsRouteState | null) ?? null;
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const subjectId = routeState?.subjectId ?? searchParams.get("subjectId") ?? "";
  const messageId = params.messageId ?? "";
  const [version, setVersion] = useState(0);
  const [reply, setReply] = useState("");

  useEffect(() => { ensureMessagesSeeded(); }, []);
  useEffect(() => { if (messageId) markAsRead(messageId); }, [messageId]);

  return {
    messageId,
    messages: useMemo(() => getThreadMessages(messageId), [messageId, version]),
    reply,
    subjectId,
    thread: useMemo(() => getThreadById(messageId), [messageId, version]),
    goBack: () => navigate("/dashboard/teacher/messages", { state: subjectId ? { subjectId } : undefined }),
    sendReply: () => {
      if (!messageId || !reply.trim()) return;
      appendThreadReply(messageId, reply);
      setReply("");
      setVersion((value) => value + 1);
    },
    setReply,
  };
}

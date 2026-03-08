// Helpers for message details route state and thread display labels.
import type { MessageThread } from "@/dashboard/teacher/components/messages/messagesTypes";

export type MessageDetailsRouteState = {
  subjectId?: string;
};

export function getParticipantsLabel(thread: MessageThread) {
  return (thread.participants ?? [thread.fromName, "You"]).join(", ");
}

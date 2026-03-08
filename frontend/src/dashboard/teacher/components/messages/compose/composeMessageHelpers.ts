// Helpers for compose-message recipients, disabled state, and send payloads.
import type { Option } from "../recipientsData";

export type ComposeMessagePayload = {
  courseId: string;
  to: string;
  subject: string;
  message: string;
  individual: boolean;
};

export function getInitialReplyRecipients(mode: "compose" | "reply", replyToName?: string) {
  if (mode !== "reply" || !replyToName?.trim()) return [];
  const name = replyToName.trim();
  return [{ value: name.toLowerCase().replace(/\s+/g, "."), label: name }] satisfies Option[];
}

export function isComposeDisabled(selected: Option[], message: string) {
  return !selected.length || !message.trim();
}

export function buildComposePayload(recipientRole: string, selected: Option[], message: string): ComposeMessagePayload {
  return {
    courseId: recipientRole,
    to: selected.map((item) => item.label).join(", "),
    subject: "",
    message,
    individual: false,
  };
}

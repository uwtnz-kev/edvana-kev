// Provides route-state helpers and shared message selection utilities for the view.
import type { Location } from "react-router-dom";

type MessagesViewRouteState = {
  subjectId?: string;
};

export function getMessagesSubjectId(location: Location) {
  const routeState = (location.state as MessagesViewRouteState | null) ?? null;
  const searchParams = new URLSearchParams(location.search);
  return routeState?.subjectId ?? searchParams.get("subjectId") ?? "";
}

export function toggleSelectedId(selectedIds: string[], id: string) {
  return selectedIds.includes(id)
    ? selectedIds.filter((selectedId) => selectedId !== id)
    : [...selectedIds, id];
}

// Preserve the existing navigation state shape for message detail routes.
export function getMessageRouteState(subjectId: string) {
  return subjectId ? { subjectId } : undefined;
}

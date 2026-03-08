// Renders the messages list section or the empty state when no threads are available.
import ThreadsListCard from "@/dashboard/teacher/components/messages/ThreadsListCard";
import { MessagesEmptyState } from "./MessagesEmptyState";
import type { useMessagesViewState } from "./useMessagesViewState";

type Props = {
  state: ReturnType<typeof useMessagesViewState>;
};

export function MessagesListSection({ state }: Props) {
  if (state.threads.length === 0) {
    return <MessagesEmptyState />;
  }

  return (
    <ThreadsListCard
      threads={state.threads}
      selectedIds={state.selectedIds}
      activeId={null}
      onOpen={state.openThread}
      onToggleSelect={state.toggleSelect}
      onStar={state.starThread}
    />
  );
}

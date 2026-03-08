// Renders the messages toolbar and compose modal for the workspace view.
import { ConfirmDeleteModal } from "@/dashboard/teacher/components/attendance/ConfirmDeleteModal";
import ComposeMessageModal from "@/dashboard/teacher/components/messages/ComposeMessageModal";
import MessagesToolbar from "@/dashboard/teacher/components/messages/MessagesToolbar";
import type { useMessagesViewState } from "./useMessagesViewState";

type Props = {
  state: ReturnType<typeof useMessagesViewState>;
};

export function MessagesToolbarShell({ state }: Props) {
  return (
    <>
      <MessagesToolbar
        folder={state.folder}
        onFolderChange={state.setFolder}
        query={state.query}
        onQueryChange={state.setQuery}
        onCompose={state.openCompose}
        onReply={state.openReplyTarget}
        onReplyAll={state.openReplyTarget}
        onArchive={state.archiveSelected}
        onDelete={state.openDeleteConfirm}
        actionsDisabled={state.actionsDisabled}
      />
      <ConfirmDeleteModal
        open={state.deleteConfirmOpen}
        onOpenChange={(open) => {
          if (!open) state.closeDeleteConfirm();
        }}
        title="Delete message"
        description="Are you sure you want to delete this message This cannot be undone"
        confirmLabel="Yes delete"
        cancelLabel="No"
        onConfirm={state.confirmDeleteSelected}
      />
      <ComposeMessageModal open={state.composeOpen} onOpenChange={state.setComposeOpen} mode="compose" onSend={state.sendCompose} />
    </>
  );
}

// Orchestrates the teacher messages workspace using focused view modules.
import { MessagesHeaderSection } from "./messages/MessagesHeader";
import { MessagesListSection } from "./messages/MessagesListSection";
import { MessagesToolbarShell } from "./messages/MessagesToolbarShell";
import { useMessagesViewState } from "./messages/useMessagesViewState";

export default function MessagesView() {
  const state = useMessagesViewState();

  return (
    <div className="space-y-6 px-8 pt-8">
      <MessagesHeaderSection subjectId={state.subjectId} />
      <MessagesToolbarShell state={state} />
      <MessagesListSection state={state} />
    </div>
  );
}

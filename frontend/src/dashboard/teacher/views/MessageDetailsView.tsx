// Orchestrates the message details page using extracted detail modules.
import { Button } from "@/components/ui/button";
import MessagesHeader from "@/dashboard/teacher/components/messages/MessagesHeader";
import {
  MessageDetailsHeader,
  MessageReplyComposer,
  MessageThreadBody,
  useMessageDetailsState,
} from "./messages/details";

export default function MessageDetailsView() {
  const state = useMessageDetailsState();

  if (!state.thread) {
    return (
      <div className="space-y-6 px-8 pt-8">
        <MessagesHeader subjectId={state.subjectId} />
        <section className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-md">
          <Button
            type="button"
            onClick={state.goBack}
            className="rounded-2xl border border-white/20 bg-white/10 text-white hover:bg-white/20"
          >
            Back to Messages
          </Button>
          <p className="mt-6 text-sm text-[var(--text-secondary)]">Message thread not found.</p>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-6 px-8 pt-8">
      <MessagesHeader subjectId={state.subjectId} />

      <section className="rounded-2xl teacher-panel-surface">
        <MessageDetailsHeader state={state} />
        <MessageThreadBody messages={state.messages} />
        <MessageReplyComposer state={state} />
      </section>
    </div>
  );
}



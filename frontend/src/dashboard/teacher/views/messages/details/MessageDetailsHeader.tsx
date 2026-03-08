// Header for the message details page with back navigation and thread metadata.
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { useMessageDetailsState } from "./useMessageDetailsState";
import { getParticipantsLabel } from "./messageDetailsHelpers";

type Props = { state: ReturnType<typeof useMessageDetailsState> };

export function MessageDetailsHeader({ state }: Props) {
  if (!state.thread) return null;

  return (
    <div className="border-b border-white/10 p-6">
      <Button type="button" onClick={state.goBack} className="rounded-2xl border border-white/20 bg-white/10 text-white hover:bg-white/20">
        <ArrowLeft className="mr-2 h-4 w-4" />Back to Messages
      </Button>
      <div className="mt-5 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1EA896]">{state.thread.courseName}</p>
        <h1 className="text-2xl font-semibold text-[#3B240F]">{state.thread.subject}</h1>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[#6B4F3A]">
          <span>From: {state.thread.fromName}</span>
          <span>Participants: {getParticipantsLabel(state.thread)}</span>
          <span>{state.thread.dateLabel}</span>
        </div>
      </div>
    </div>
  );
}

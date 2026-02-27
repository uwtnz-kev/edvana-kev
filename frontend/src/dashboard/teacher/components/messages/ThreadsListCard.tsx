import ThreadRow from "./ThreadRow";
import type { MessageThread } from "./messagesTypes";

type Props = {
  threads?: MessageThread[];
  selectedIds: string[];
  activeId: string | null;
  onOpen: (id: string) => void;
  onToggleSelect: (id: string) => void;
  onStar: (id: string) => void;
};

export default function ThreadsListCard(props: Props) {
  const threads = props.threads ?? [];

  return (
    <div className="h-full rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md overflow-hidden">
      <div className="h-full overflow-y-auto">
        {threads.map(t => (
          <ThreadRow
            key={t.id}
            thread={t}
            selected={props.selectedIds.includes(t.id)}
            active={props.activeId === t.id}
            onOpen={() => props.onOpen(t.id)}
            onToggleSelect={() => props.onToggleSelect(t.id)}
            onStar={() => props.onStar(t.id)}
          />
        ))}

        {threads.length === 0 && (
          <div className="p-6 text-sm text-[#6B4F3A]">No conversations found.</div>
        )}
      </div>
    </div>
  );
}
// Renders the messages empty state with the existing list-card styling.
export function MessagesEmptyState() {
  return (
    <div className="overflow-hidden rounded-2xl teacher-panel-surface">
      <div className="h-full overflow-y-auto">
        <div className="p-6 text-sm text-[var(--text-secondary)]">No conversations found.</div>
      </div>
    </div>
  );
}



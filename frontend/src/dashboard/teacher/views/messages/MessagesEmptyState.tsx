// Renders the messages empty state with the existing list-card styling.
export function MessagesEmptyState() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md">
      <div className="h-full overflow-y-auto">
        <div className="p-6 text-sm text-[#6B4F3A]">No conversations found.</div>
      </div>
    </div>
  );
}

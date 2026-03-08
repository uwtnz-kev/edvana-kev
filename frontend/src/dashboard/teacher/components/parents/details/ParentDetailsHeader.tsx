// Renders the modal title block and close control.
type Props = {
  fullName: string;
  onClose: () => void;
};

export function ParentDetailsHeader({ fullName, onClose }: Props) {
  return (
    <div className="flex items-start justify-between px-7 py-6">
      <div className="min-w-0">
        <div className="text-white text-2xl font-semibold truncate">{fullName}</div>
        <div className="text-white/70 text-sm mt-1">Parent Details</div>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="h-10 w-10 rounded-xl bg-white/10 hover:bg-white/15 text-white/80 flex items-center justify-center transition"
        aria-label="Close"
      >
        ×
      </button>
    </div>
  );
}

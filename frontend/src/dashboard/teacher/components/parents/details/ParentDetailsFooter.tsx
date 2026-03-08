// Renders the modal footer actions.
type Props = {
  onClose: () => void;
};

export function ParentDetailsFooter({ onClose }: Props) {
  return (
    <div className="flex justify-end pt-2">
      <button
        type="button"
        onClick={onClose}
        className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white/85 transition"
      >
        Close
      </button>
    </div>
  );
}

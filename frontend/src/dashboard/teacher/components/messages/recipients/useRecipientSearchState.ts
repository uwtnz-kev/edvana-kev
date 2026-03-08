// Owns query, open state, and selection handlers for the recipient search select.
import * as React from "react";
import { RECIPIENTS_BY_ROLE, type Option } from "../recipientsData";
import { getFilteredRecipients, isRecipientSelected } from "./recipientSearchHelpers";

type Params = {
  onSelectedChange: (next: Option[]) => void;
  role: string;
  selected: Option[];
};

export function useRecipientSearchState({ onSelectedChange, role, selected }: Params) {
  const [query, setQuery] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const wrapRef = React.useRef<HTMLDivElement | null>(null);
  const options = RECIPIENTS_BY_ROLE[role] ?? [];
  const filtered = React.useMemo(() => getFilteredRecipients(query, options), [query, options]);

  React.useEffect(() => {
    setQuery("");
    setOpen(false);
    onSelectedChange([]);
  }, [onSelectedChange, role]);

  React.useEffect(() => {
    if (!open) return;

    // Close the menu when interaction moves outside the control.
    const onDocDown = (event: MouseEvent) => {
      const element = wrapRef.current;
      if (event.target instanceof Node && element && !element.contains(event.target)) setOpen(false);
    };

    document.addEventListener("mousedown", onDocDown);
    return () => document.removeEventListener("mousedown", onDocDown);
  }, [open]);

  return {
    filtered,
    open,
    query,
    setOpen,
    setQuery,
    wrapRef,
    addRecipient: (option: Option) => {
      if (isRecipientSelected(selected, option.value)) return;
      onSelectedChange([...selected, option]);
      setQuery(option.label);
      setOpen(false);
    },
    removeRecipient: (value: string) => onSelectedChange(selected.filter((option) => option.value !== value)),
  };
}

// Provides filtering and selection helpers for the recipient search select.
import type { Option } from "../recipientsData";

// Limits the visible results to the same capped list used by the original component.
export function getFilteredRecipients(query: string, options: Option[]) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return options.slice(0, 8);
  return options.filter((option) => option.label.toLowerCase().includes(normalizedQuery)).slice(0, 8);
}

export function isRecipientSelected(selected: Option[], value: string) {
  return selected.some((option) => option.value === value);
}

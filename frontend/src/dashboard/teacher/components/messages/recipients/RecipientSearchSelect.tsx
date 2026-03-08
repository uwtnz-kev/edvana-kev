// Orchestrates the recipient search select using focused recipient subcomponents.
import type { Option } from "../recipientsData";
import { RecipientSearchInput } from "./RecipientSearchInput";
import { RecipientSearchResults } from "./RecipientSearchResults";
import { RecipientSelectedChips } from "./RecipientSelectedChips";
import { useRecipientSearchState } from "./useRecipientSearchState";

type Props = {
  onSelectedChange: (next: Option[]) => void;
  placeholder: string;
  role: string;
  selected: Option[];
};

export default function RecipientSearchSelect(props: Props) {
  const state = useRecipientSearchState(props);

  return (
    <div className="space-y-2" ref={state.wrapRef}>
      <div className="text-sm text-white/70">To</div>
      <div className="relative">
        <RecipientSearchInput
          query={state.query}
          placeholder={props.placeholder}
          onChange={(value) => {
            state.setQuery(value);
            state.setOpen(true);
          }}
          onFocus={() => state.setOpen(true)}
          onToggle={() => state.setOpen((current) => !current)}
        />
        <RecipientSearchResults
          open={state.open}
          filtered={state.filtered}
          selected={props.selected}
          onSelect={state.addRecipient}
        />
      </div>
      <RecipientSelectedChips selected={props.selected} onRemove={state.removeRecipient} />
    </div>
  );
}

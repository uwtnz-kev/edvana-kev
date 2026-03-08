// Orchestrates the modular messages toolbar sections.
import type { MessageFolder } from "../messagesTypes";
import { MessagesToolbarActions } from "./MessagesToolbarActions";
import { MessagesToolbarFilters } from "./MessagesToolbarFilters";
import { MessagesToolbarSearch } from "./MessagesToolbarSearch";

type Props = {
  actionsDisabled: boolean;
  folder: MessageFolder;
  onArchive: () => void;
  onCompose: () => void;
  onDelete: () => void;
  onFolderChange: (value: MessageFolder) => void;
  onQueryChange: (value: string) => void;
  onReply: () => void;
  onReplyAll: () => void;
  query: string;
};

export default function MessagesToolbar(props: Props) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
      <MessagesToolbarFilters folder={props.folder} onFolderChange={props.onFolderChange} />
      <MessagesToolbarSearch query={props.query} onQueryChange={props.onQueryChange} />
      <MessagesToolbarActions
        actionsDisabled={props.actionsDisabled}
        onArchive={props.onArchive}
        onCompose={props.onCompose}
        onDelete={props.onDelete}
        onReply={props.onReply}
      />
    </div>
  );
}

// State hook for the compose-message modal fields and send action.
import * as React from "react";
import type { Option } from "../recipientsData";
import { RECIPIENT_LABEL_MAP } from "../recipientsData";
import { buildComposePayload, getInitialReplyRecipients, isComposeDisabled, type ComposeMessagePayload } from "./composeMessageHelpers";

type Params = {
  mode: "compose" | "reply";
  onOpenChange: (open: boolean) => void;
  onSend?: (payload: ComposeMessagePayload) => void;
  open: boolean;
  replyToName?: string;
};

export function useComposeMessageState(props: Params) {
  const [recipientRole, setRecipientRole] = React.useState("administrator");
  const [toSelected, setToSelected] = React.useState<Option[]>([]);
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    if (!props.open) return;
    setRecipientRole("administrator");
    setMessage("");
    setToSelected(getInitialReplyRecipients(props.mode, props.replyToName));
  }, [props.mode, props.open, props.replyToName]);

  return {
    disabled: isComposeDisabled(toSelected, message),
    message,
    placeholder: RECIPIENT_LABEL_MAP[recipientRole] ?? "Search recipients",
    recipientRole,
    send: () => {
      if (isComposeDisabled(toSelected, message)) return;
      props.onSend?.(buildComposePayload(recipientRole, toSelected, message));
      props.onOpenChange(false);
    },
    setMessage,
    setRecipientRole: (value: string) => {
      setRecipientRole(value);
      setToSelected([]);
    },
    setToSelected,
    toSelected,
  };
}

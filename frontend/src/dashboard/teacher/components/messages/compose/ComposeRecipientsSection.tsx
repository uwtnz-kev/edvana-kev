// Recipients section for selecting a recipient group and searching recipients.
import {
  GlassSelect,
  GlassSelectContent,
  GlassSelectItem,
  GlassSelectTrigger,
  GlassSelectValue,
} from "@/dashboard/schooladmin/components/ui/GlassSelect";
import RecipientSearchSelect from "../RecipientSearchSelect";
import { RECIPIENT_ROLE_OPTIONS, type Option } from "../recipientsData";

type Props = {
  placeholder: string;
  recipientRole: string;
  setRecipientRole: (value: string) => void;
  setToSelected: (value: Option[]) => void;
  toSelected: Option[];
};

export function ComposeRecipientsSection(props: Props) {
  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="space-y-2">
        <div className="text-sm text-white">Recipient Group</div>
        <GlassSelect value={props.recipientRole} onValueChange={props.setRecipientRole}>
          <GlassSelectTrigger className="h-12 rounded-xl border border-white/20 bg-white/10 text-white">
            <GlassSelectValue placeholder="Select recipient group" />
          </GlassSelectTrigger>
          <GlassSelectContent>
            {RECIPIENT_ROLE_OPTIONS.map((option) => <GlassSelectItem key={option.value} value={option.value}>{option.label}</GlassSelectItem>)}
          </GlassSelectContent>
        </GlassSelect>
      </div>
      <RecipientSearchSelect role={props.recipientRole} placeholder={props.placeholder} selected={props.toSelected} onSelectedChange={props.setToSelected} />
    </div>
  );
}



// Renders the messages view header using the shared messages header component.
import MessagesHeader from "@/dashboard/teacher/components/messages/MessagesHeader";

type Props = {
  subjectId: string;
};

export function MessagesHeaderSection({ subjectId }: Props) {
  return <MessagesHeader subjectId={subjectId} />;
}

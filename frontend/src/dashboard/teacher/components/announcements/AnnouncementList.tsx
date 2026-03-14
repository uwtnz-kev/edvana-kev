/**
 * AnnouncementList
 * ----------------
 * Renders the A nn ou nc em en tL is t UI for the teacher dashboard a nn ou nc em en ts feature.
 */
import { Button } from "@/components/ui/button";
import { AnnouncementCard } from "./AnnouncementCard";
import type { TeacherAnnouncement } from "@/dashboard/teacher/types/announcementTypes";

type Props = {
  items: TeacherAnnouncement[];
  subjectName: string | null;
  onCreate: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onPublish: (id: string) => void;
};

export function AnnouncementList({ items, subjectName, onCreate, onEdit, onDelete, onPublish }: Props) {
  const message = subjectName
    ? `No announcements in ${subjectName}. Create your first announcement.`
    : "Choose a subject from the sidebar to manage announcements.";

  if (!subjectName || items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/20 bg-white/10 p-8 text-center backdrop-blur-xl">
        <p className="text-white">{message}</p>
        <Button type="button" onClick={onCreate} disabled={!subjectName} className="mt-4 rounded-2xl bg-white/15 text-white hover:bg-white/25 hover:text-white">
          Create Announcement
        </Button>
      </div>
    );
  }

  return <div className="space-y-3">{items.map((item) => <AnnouncementCard key={item.id} item={item} onEdit={onEdit} onDelete={onDelete} onPublish={onPublish} />)}</div>;
}


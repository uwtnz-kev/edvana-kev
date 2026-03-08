/**
 * AnnouncementEditView
 * --------------------
 * Renders the teacher dashboard teacher dashboard page content.
 */
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AnnouncementForm } from "@/dashboard/teacher/components/announcements/AnnouncementForm";
import { AnnouncementHeader } from "@/dashboard/teacher/components/announcements/AnnouncementHeader";
import { getAnnouncementById, updateAnnouncement } from "@/dashboard/teacher/states/announcementsStore";

export default function AnnouncementEditView() {
  const navigate = useNavigate();
  const { announcementId = "" } = useParams<{ announcementId: string }>();
  const item = getAnnouncementById(announcementId);
  const restoreSubjectId = (useLocation().state as { restoreSubjectId?: string } | null)?.restoreSubjectId;
  const goBack = () => navigate("/dashboard/teacher/announcements", { state: { restoreSubjectId } });

  if (!item) {
    return <div className="w-full p-4 sm:p-6"><div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-white/10 p-6 text-center backdrop-blur-xl"><h1 className="text-2xl font-semibold text-[#3B240F]">Announcement not found</h1><p className="mt-3 text-[#3B240F]/70">The announcement may have been deleted or the link is invalid.</p><Button type="button" onClick={() => navigate("/dashboard/teacher/announcements")} className="mt-5 rounded-2xl border border-white/20 bg-white/20 text-[#3B240F]">Back</Button></div></div>;
  }

  return (
    <div className="w-full p-4 sm:p-6">
      <div className="mx-auto max-w-4xl space-y-4">
        <AnnouncementHeader title="Edit Announcement" subtitle={`Subject: ${item.subject}`} subjectName={item.subject} onBack={goBack} />
        <AnnouncementForm subjectName={item.subject} classLabel={item.classLabel} initialValue={{ title: item.title, body: item.body, attachment: item.attachment ?? null }} submitLabel="Save Draft" onCancel={goBack} onSubmit={(values) => { updateAnnouncement(item.id, { title: values.title, body: values.body, attachment: values.attachment }); goBack(); }} />
      </div>
    </div>
  );
}


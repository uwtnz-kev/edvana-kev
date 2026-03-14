/**
 * AnnouncementCreateView
 * ----------------------
 * Renders the teacher dashboard teacher dashboard page content.
 */
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AnnouncementForm } from "@/dashboard/teacher/components/announcements/AnnouncementForm";
import { AnnouncementHeader } from "@/dashboard/teacher/components/announcements/AnnouncementHeader";
import { createAnnouncement } from "@/dashboard/teacher/states/announcementsStore";

type State = { subjectId: string; subjectName: string; classLabel: string };
const parse = (value: unknown) => (value && typeof value === "object" ? (value as Partial<State>) : null);

export default function AnnouncementCreateView() {
  const navigate = useNavigate();
  const state = parse(useLocation().state);

  if (!state?.subjectId || !state.subjectName || !state.classLabel) {
    return <div className="w-full p-4 sm:p-6"><div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-white/10 p-6 text-center backdrop-blur-xl"><h1 className="text-2xl font-semibold text-[var(--text-primary)]">Create Announcement</h1><p className="mt-3 text-[var(--text-secondary)]">Missing subject context. Return to announcements and choose a subject first.</p><Button type="button" onClick={() => navigate("/dashboard/teacher/announcements")} className="mt-5 rounded-2xl border border-white/20 bg-white/20 text-[var(--text-primary)]">Back</Button></div></div>;
  }

  const goBack = () => navigate("/dashboard/teacher/announcements", { state: { restoreSubjectId: state.subjectId } });

  return (
    <div className="w-full p-4 sm:p-6">
      <div className="mx-auto max-w-4xl space-y-4">
        <AnnouncementHeader title="Create Announcement" subtitle={`Subject: ${state.subjectName}`} subjectName={state.subjectName} onBack={goBack} />
        <AnnouncementForm subjectName={state.subjectName} classLabel={state.classLabel} submitLabel="Save Draft" onCancel={goBack} onSubmit={(values) => { createAnnouncement({ title: values.title, body: values.body, subject: state.subjectName, classLabel: state.classLabel, attachment: values.attachment, status: "draft" }); goBack(); }} />
      </div>
    </div>
  );
}



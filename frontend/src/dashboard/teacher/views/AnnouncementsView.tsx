/**
 * AnnouncementsView
 * -----------------
 * Renders the teacher dashboard teacher dashboard page content.
 */
import { Megaphone } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { seedClasses2, seedSubjects2, TeacherAssignmentsSubjectSidebar } from "@/dashboard/teacher/components/assignments";
import { AnnouncementFilters } from "@/dashboard/teacher/components/announcements/AnnouncementFilters";
import { AnnouncementHeader } from "@/dashboard/teacher/components/announcements/AnnouncementHeader";
import { AnnouncementList } from "@/dashboard/teacher/components/announcements/AnnouncementList";
import { AnnouncementStats } from "@/dashboard/teacher/components/announcements/AnnouncementStats";
import { deleteAnnouncement, publishAnnouncement, useAnnouncementsStore } from "@/dashboard/teacher/states/announcementsStore";
import { TeacherFeatureClassEntryGate } from "./shared/TeacherFeatureClassEntryGate";

export default function AnnouncementsView() {
  return (
    <TeacherFeatureClassEntryGate
      entryPath="/dashboard/teacher/announcements"
      featureKey="announcements"
      title="Announcements"
      subtitle="Choose a class to open the announcements workspace"
      icon={Megaphone}
      infoCardClassName="transition-all duration-200 hover:-translate-y-[2px] hover:bg-white/10 hover:shadow-lg"
      renderHeaderIcon={({ Icon }) => (
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/20">
          <Icon className="h-6 w-6 text-amber-700" />
        </div>
      )}
    >
      {({ onBackToEntry }) => <AnnouncementsScopedView onBackToEntry={onBackToEntry} />}
    </TeacherFeatureClassEntryGate>
  );
}

function AnnouncementsScopedView({ onBackToEntry }: { onBackToEntry: () => void }) {
  const location = useLocation();
  const navigate = useNavigate();
  const announcements = useAnnouncementsStore();
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [classValue, setClassValue] = useState("all");
  const [search, setSearch] = useState("");
  const previousSubjectId = useRef<string | null>(null);

  const selectedSubject = useMemo(() => seedSubjects2.find((item) => item.id === selectedSubjectId) ?? null, [selectedSubjectId]);
  const selectedSubjectName = selectedSubject?.name ?? null;
  const classes = seedClasses2.map((item) => item.label);
  const query = search.toLowerCase().trim();
  const items = announcements
    .filter((item) => item.subject === selectedSubjectName)
    .filter((item) => classValue === "all" || item.classLabel === classValue)
    .filter((item) => `${item.title} ${item.body} ${item.classLabel}`.toLowerCase().includes(query));
  const stats = { total: items.length, published: items.filter((item) => item.status === "published").length, drafts: items.filter((item) => item.status === "draft").length };

  useEffect(() => {
    const state = location.state as { restoreSubjectId?: string; resetToHome?: boolean } | null;
    if (state?.resetToHome) {
      setSelectedSubjectId(null);
      setClassValue("all");
      setSearch("");
      navigate(".", { replace: true, state: null });
      return;
    }
    if (!state?.restoreSubjectId) return;
    setSelectedSubjectId(state.restoreSubjectId);
    navigate(".", { replace: true, state: null });
  }, [location.state, navigate]);

  useEffect(() => {
    if (previousSubjectId.current === selectedSubjectId) return;
    setClassValue("all");
    setSearch("");
    previousSubjectId.current = selectedSubjectId;
  }, [selectedSubjectId]);

  const onCreate = () => {
    if (!selectedSubjectName || !selectedSubjectId) return;
    navigate("/dashboard/teacher/announcements/create", { state: { subjectId: selectedSubjectId, subjectName: selectedSubjectName, classLabel: classValue === "all" ? "All Classes" : classValue } });
  };

  return (
    <div className="w-full overflow-x-hidden p-4 sm:p-6">
      <div className="flex w-full gap-6 overflow-x-hidden">
        <aside className="w-[220px] shrink-0">
          <TeacherAssignmentsSubjectSidebar subjects={seedSubjects2} selectedSubjectId={selectedSubjectId} onSelectSubject={setSelectedSubjectId} />
        </aside>
        <section className="min-w-0 flex-1 space-y-4">
          <AnnouncementHeader title="Announcements" subtitle={selectedSubjectName ? `Subject: ${selectedSubjectName}` : "Choose a subject from the sidebar to manage announcements"} subjectName={selectedSubjectName} onBack={!selectedSubjectName ? onBackToEntry : undefined} />
          {selectedSubjectName ? <AnnouncementStats stats={stats} /> : null}
          <AnnouncementFilters classes={classes} classValue={classValue} search={search} onClassChange={setClassValue} onSearchChange={setSearch} onCreate={onCreate} disabled={!selectedSubjectName} />
          <AnnouncementList items={items} subjectName={selectedSubjectName} onCreate={onCreate} onEdit={(id) => navigate(`/dashboard/teacher/announcements/edit/${id}`, { state: { restoreSubjectId: selectedSubjectId } })} onDelete={deleteAnnouncement} onPublish={publishAnnouncement} />
        </section>
      </div>
    </div>
  );
}


// Orchestrates the grades workspace by composing extracted state and content helpers.
import { GradesWorkspaceContent } from "@/dashboard/teacher/views/grades/GradesWorkspaceContent";
import { toPublishedTitle, toWorkspaceTitle } from "@/dashboard/teacher/views/grades/gradesViewHelpers";
import { useGradesWorkspaceState } from "@/dashboard/teacher/views/grades/useGradesWorkspaceState";

export default function GradesView() {
  const workspace = useGradesWorkspaceState();
  const workspaceTitle = toWorkspaceTitle(workspace.selectedGradeType);
  const publishedTitle = toPublishedTitle(workspace.selectedGradeType);

  return (
    <div className="w-full overflow-x-hidden p-4 sm:p-6" style={{ overflowX: "hidden" }}>
      <div className="flex w-full gap-6 overflow-x-hidden">
        <section className="min-w-0 flex-1 space-y-4">
          <GradesWorkspaceContent
            hasInvalidWorkspaceSubject={workspace.hasInvalidWorkspaceSubject}
            hasInvalidWorkspaceType={workspace.hasInvalidWorkspaceType}
            isLanding={workspace.isLanding}
            selectedGradeType={workspace.selectedGradeType ?? ""}
            selectedSubject={workspace.selectedSubject}
            subjects={workspace.subjects}
            selectedSubjectId={workspace.selectedSubjectId}
            onSelectSubject={workspace.setSelectedSubjectId}
            workspaceTitle={workspaceTitle}
            publishedTitle={publishedTitle}
            classOptions={workspace.classOptions}
            classValue={workspace.classValue}
            search={workspace.search}
            stats={workspace.stats}
            publishedItems={workspace.publishedItems}
            deleteConfirmOpen={workspace.deleteConfirmOpen}
            onBack={workspace.onBack}
            onCloseDeleteConfirm={workspace.closeDeleteConfirm}
            onConfirmDeletePublishedItem={workspace.confirmDeletePublishedItem}
            onCreate={workspace.onCreate}
            onDeletePublishedItem={workspace.onDeletePublishedItem}
            onPickType={workspace.onPickType}
            onSearchChange={workspace.setSearch}
            onClassValueChange={workspace.setClassValue}
          />
        </section>
      </div>
    </div>
  );
}

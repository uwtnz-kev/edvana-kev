// Provides the assignments workspace shell for the class-scoped teacher dashboard flow.
import { useEffect, useMemo, useState } from "react";
import { ClipboardList, Plus, Upload } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  seedSubjects2,  TeacherAssignmentsHeader,
  TeacherAssignmentsSubjectSidebar,
  type TeacherSubject2,
} from "@/dashboard/teacher/components/assignments";
import { getSubjectThemeById } from "@/dashboard/teacher/components/shared";
import { AssignmentsWorkspaceContent } from "./assignments/AssignmentsWorkspaceContent";
import { AssignmentsWorkspaceHeader } from "./assignments/AssignmentsWorkspaceHeader";
import { useAssignmentsWorkspaceState } from "./assignments/useAssignmentsWorkspaceState";
import { TeacherFeatureClassEntryGate } from "./shared/TeacherFeatureClassEntryGate";

type AssignmentsRestoreState = {
  restoreSubjectId?: string;
  resetToHome?: boolean;
  viewMode?: "workspace" | "list";
};

function getRestoreState(state: unknown): AssignmentsRestoreState | null {
  if (!state || typeof state !== "object") {
    return null;
  }

  return state as AssignmentsRestoreState;
}

type WorkspaceAction = {
  value: string;
  label: string;
  description: string;
  icon: typeof ClipboardList;
  iconClassName: string;
};

const WORKSPACE_ACTIONS: WorkspaceAction[] = [
  {
    value: "assignments",
    label: "Assignments",
    description: "Open the assignments workspace for this subject.",
    icon: ClipboardList,
    iconClassName: "bg-indigo-500/20 text-indigo-400",
  },
  {
    value: "create-assignment",
    label: "Create Assignment",
    description: "Create assignments for the selected subject.",
    icon: Plus,
    iconClassName: "bg-emerald-500/20 text-emerald-400",
  },
  {
    value: "upload-assignment",
    label: "Upload Assignment",
    description: "Upload assignments for the selected subject.",
    icon: Upload,
    iconClassName: "bg-amber-500/20 text-amber-300",
  },
];

export default function AssignmentsView() {
  const entryTheme = getSubjectThemeById("");

  return (
    <TeacherFeatureClassEntryGate
      entryPath="/dashboard/teacher/assignments"
      featureKey="assignments"
      title="Assignments"
      subtitle="Choose a class to open the assignments workspace"
      icon={ClipboardList}
      infoCardClassName="transition-all duration-200 hover:-translate-y-[2px] hover:bg-white/10 hover:shadow-lg"
      renderHeaderIcon={({ Icon }) => (
        <div className={`h-12 w-12 rounded-xl p-3 flex items-center justify-center ${entryTheme.bgClass}`}>
          <Icon className={`h-6 w-6 ${entryTheme.iconClass}`} />
        </div>
      )}
    >
      {({ classId, onBackToEntry }) => (
        <AssignmentsWorkspaceShell classId={classId} onBackToClassEntry={onBackToEntry} />
      )}
    </TeacherFeatureClassEntryGate>
  );
}

export function AssignmentsListView() {
  const entryTheme = getSubjectThemeById("");

  return (
    <TeacherFeatureClassEntryGate
      entryPath="/dashboard/teacher/assignments"
      featureKey="assignments"
      title="Assignments"
      subtitle="Choose a class to open the assignments workspace"
      icon={ClipboardList}
      infoCardClassName="transition-all duration-200 hover:-translate-y-[2px] hover:bg-white/10 hover:shadow-lg"
      renderHeaderIcon={({ Icon }) => (
        <div className={`h-12 w-12 rounded-xl p-3 flex items-center justify-center ${entryTheme.bgClass}`}>
          <Icon className={`h-6 w-6 ${entryTheme.iconClass}`} />
        </div>
      )}
    >
      {({ classId, onBackToEntry }) => (
        <AssignmentsListWorkspace
          classId={classId}
          onBackToClassEntry={onBackToEntry}
          onBackToWorkspace={onBackToEntry}
        />
      )}
    </TeacherFeatureClassEntryGate>
  );
}

function AssignmentsListWorkspace({
  classId,
  onBackToClassEntry,
  restoreSubjectId,
  onBackToWorkspace,
}: {
  classId: string;
  onBackToClassEntry: () => void;
  restoreSubjectId?: string | null;
  onBackToWorkspace: () => void;
}) {
  const workspace = useAssignmentsWorkspaceState(classId);

  useEffect(() => {
    if (!restoreSubjectId) return;
    if (workspace.selectedSubjectId === restoreSubjectId) return;
    workspace.setSelectedSubjectId(restoreSubjectId);
  }, [restoreSubjectId, workspace]);

  if (restoreSubjectId && workspace.selectedSubjectId !== restoreSubjectId) {
    return <div className="w-full overflow-x-hidden p-4 sm:p-6" style={{ overflowX: "hidden" }} />;
  }

  const workspaceView = {
    ...workspace,
    onBack: onBackToWorkspace,
  };

  return (
    <div className="w-full overflow-x-hidden p-4 sm:p-6" style={{ overflowX: "hidden" }}>
      <AssignmentsWorkspaceHeader workspace={workspaceView} onBackToClassEntry={onBackToClassEntry} />
      <AssignmentsWorkspaceContent workspace={workspaceView} />
    </div>
  );
}

function AssignmentsWorkspaceShell({ classId, onBackToClassEntry }: { classId: string; onBackToClassEntry: () => void }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [subjects] = useState<TeacherSubject2[]>(() => seedSubjects2);
  const restoreState = getRestoreState(location.state);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(() => {
    if (!restoreState?.restoreSubjectId || restoreState.resetToHome) {
      return null;
    }

    return subjects.some((subject) => subject.id === restoreState.restoreSubjectId)
      ? restoreState.restoreSubjectId
      : null;
  });
  const [viewMode, setViewMode] = useState<"workspace" | "list">(() => {
    return restoreState?.viewMode === "list" ? "list" : "workspace";
  });

  useEffect(() => {
    if (restoreState?.resetToHome) {
      setSelectedSubjectId(null);
      setViewMode("workspace");
      return;
    }

    setViewMode(restoreState?.viewMode === "list" ? "list" : "workspace");

    if (!restoreState?.restoreSubjectId) return;
    const exists = subjects.some((subject) => subject.id === restoreState.restoreSubjectId);
    setSelectedSubjectId(exists ? restoreState.restoreSubjectId : null);
  }, [restoreState, subjects]);

  const selectedSubject = useMemo(
    () => subjects.find((subject) => subject.id === selectedSubjectId) ?? null,
    [selectedSubjectId, subjects],
  );
  const selectedSubjectTheme = selectedSubject ? getSubjectThemeById(selectedSubject.id) : null;

  if (viewMode === "list") {
    return (
      <AssignmentsListWorkspace
        classId={classId}
        onBackToClassEntry={onBackToClassEntry}
        restoreSubjectId={selectedSubjectId}
        onBackToWorkspace={() => setViewMode("workspace")}
      />
    );
  }

  return (
    <div className="w-full overflow-x-hidden p-4 sm:p-6" style={{ overflowX: "hidden" }}>
      <div className="flex w-full gap-6">
        <aside className="w-[260px] shrink-0">
          {!selectedSubject ? (
            <TeacherAssignmentsSubjectSidebar
              subjects={subjects}
              selectedSubjectId={selectedSubjectId}
              onSelectSubject={setSelectedSubjectId}
            />
          ) : (
            <AssignmentsActionPanel
              onOpenAssignments={() => setViewMode("list")}
              onOpenCreateAssignment={() =>
                navigate(
                  { pathname: "/dashboard/teacher/assignments/create", search: `?classId=${encodeURIComponent(classId)}` },
                  { state: { subjectId: selectedSubjectId, subjectName: selectedSubject?.name } },
                )
              }
              onOpenUploadAssignment={() =>
                navigate(
                  { pathname: "/dashboard/teacher/assignments/upload", search: `?classId=${encodeURIComponent(classId)}` },
                  { state: { subjectId: selectedSubjectId, subjectName: selectedSubject?.name } },
                )
              }
            />
          )}
        </aside>

        <section className="flex-1 min-w-0 space-y-4">
          <TeacherAssignmentsHeader
            title="Assignments"
            subtitle={selectedSubject ? `Subject: ${selectedSubject.name}` : "Choose a subject from the sidebar to open the assignments workspace"}
            subjectId={selectedSubject?.id ?? null}
            showBack
            showCreate={false}
            onBack={() => (selectedSubject ? setSelectedSubjectId(null) : onBackToClassEntry())}
            canCreate={false}
            onCreate={() => {}}
          />

          {!selectedSubject ? (
            <AssignmentsHomeShell onBackToClassEntry={onBackToClassEntry} />
          ) : (
            <AssignmentsContentShell
              selectedSubjectName={selectedSubject.name}
              selectedSubjectTheme={selectedSubjectTheme}
            />
          )}
        </section>
      </div>
    </div>
  );
}

function AssignmentsActionPanel({
  onOpenAssignments,
  onOpenCreateAssignment,
  onOpenUploadAssignment,
}: {
  onOpenAssignments: () => void;
  onOpenCreateAssignment: () => void;
  onOpenUploadAssignment: () => void;
}) {
  return (
    <aside className="rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur-xl">
      <div className="px-2 pb-3 pt-1">
        <h2 className="text-sm font-semibold text-white">Assignment Actions</h2>
      </div>
      <div className="space-y-2">
        {WORKSPACE_ACTIONS.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.value}
              type="button"
              onClick={
                action.value === "assignments"
                  ? onOpenAssignments
                  : action.value === "create-assignment"
                    ? onOpenCreateAssignment
                    : action.value === "upload-assignment"
                      ? onOpenUploadAssignment
                      : undefined
              }
              className="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-left text-sm font-medium text-[var(--text-primary)] transition-all duration-200 hover:border-white/20 hover:bg-white/15 hover:text-white"
            >
              <span className={`flex h-10 w-10 items-center justify-center rounded-xl p-3 ${action.iconClassName}`}>
                <Icon className="h-4 w-4" />
              </span>
              <span className="min-w-0 truncate">{action.label}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}

function AssignmentsHomeShell({ onBackToClassEntry }: { onBackToClassEntry: () => void }) {
  void onBackToClassEntry;
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <section className="rounded-2xl teacher-panel-surface p-5 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl p-3 flex items-center justify-center bg-[var(--sidebar-item-active)] text-[var(--accent-primary)]">
            <ClipboardList className="h-4 w-4" />
          </div>
          <h3 className="text-white font-semibold">Quick Actions</h3>
        </div>
        <p className="text-white/60 text-sm mt-2">
          Choose a subject, then open Assignments, Create Assignment, or Upload Assignment from the left panel.
        </p>
      </section>

      <section className="rounded-2xl teacher-panel-surface p-5 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl p-3 flex items-center justify-center bg-blue-500/15 text-blue-300">
            <Upload className="h-4 w-4" />
          </div>
          <h3 className="text-white font-semibold">Tip</h3>
        </div>
        <p className="text-white/60 text-sm mt-2">
          The selected class stays in the URL and workspace context so you remain in the correct class-scoped assignments view.
        </p>
      </section>
    </div>
  );
}

function AssignmentsContentShell({
  selectedSubjectName,
  selectedSubjectTheme,
}: {
  selectedSubjectName: string;
  selectedSubjectTheme: { bgClass: string; iconClass: string } | null;
}) {
  return (
    <section className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-lg">
      <div className="flex items-start gap-4">
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${selectedSubjectTheme?.bgClass ?? "bg-white/10"}`}>
          <ClipboardList className={`h-6 w-6 ${selectedSubjectTheme?.iconClass ?? "text-white"}`} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1EA896]">Assignments Workspace</p>
          <h2 className="mt-2 text-lg font-semibold text-[var(--text-primary)]">Assignments</h2>
          <p className="mt-1 truncate text-sm text-[var(--text-primary)]/70" title={`Choose Assignments, Create Assignments, or Upload Assignments from the left to open the dedicated subject page. ${selectedSubjectName}.`}>
            Choose Assignments, Create Assignments, or Upload Assignments from the left to open the dedicated subject page. {selectedSubjectName}.
          </p>
          
        </div>
      </div>
    </section>
  );
}






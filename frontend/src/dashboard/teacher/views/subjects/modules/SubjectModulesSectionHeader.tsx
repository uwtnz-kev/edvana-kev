// Section header introducing the subject modules list area.
type Props = {
  subjectTitle: string;
};

export function SubjectModulesSectionHeader({ subjectTitle }: Props) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1EA896]">Subject Modules</p>
      <h2 className="mt-2 text-lg font-semibold text-[#4B2E1F]">{subjectTitle}</h2>
      <p className="mt-1 text-sm text-[#4B2E1F]/70">Open a module to review its submodules, then select a submodule title to open its content page.</p>
    </div>
  );
}

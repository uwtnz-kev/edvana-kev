// Renders the lesson sections and resource rows for the module content card.
import type { SubjectModuleContentSection } from "./subjectModuleContentHelpers";

type Props = { sections: SubjectModuleContentSection[] };

export function SubjectModuleContentSections({ sections }: Props) {
  return (
    <>
      {sections.map((section, index) => (
        <section key={section.title} className={index === 0 ? undefined : "mt-6"}>
          <h3 className="text-base font-semibold text-[#4B2E1F]">{section.title}</h3>
          {section.body ? (
            <p className="mt-2 text-sm leading-7 text-[#4B2E1F]/75">{section.body}</p>
          ) : null}
          {section.resources ? (
            <div className="mt-3 space-y-3 text-sm text-[#4B2E1F]/75">
              {section.resources.map((resource) => {
                const Icon = resource.icon;
                return (
                  <div key={resource.label} className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    <span>{resource.label}</span>
                  </div>
                );
              })}
            </div>
          ) : null}
        </section>
      ))}
    </>
  );
}

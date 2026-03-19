// Renders the main lesson content card for the selected module or submodule.
import { FileText, Paperclip } from "lucide-react";
import { SubjectRichDescription } from "../modules/cards/SubjectRichDescription";
import type { useSubjectModuleContentState } from "./useSubjectModuleContentState";

type Props = { state: ReturnType<typeof useSubjectModuleContentState> };

const URL_PATTERN = /\b(?:https?:\/\/[^\s<]+|www\.[^\s<]+|(?:[a-z](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}(?::\d+)?(?:\/[^\s<]*)?)/gi;

function normalizeDisplayText(text: string) {
  const protectedUrls: string[] = [];
  const protectedText = text.replace(URL_PATTERN, (match) => {
    const token = `__URL_TOKEN_${protectedUrls.length}__`;
    protectedUrls.push(match);
    return token;
  });

  const normalizedText = protectedText
    .replace(/([.,;:!?\)])([A-Za-z])/g, "$1 $2")
    .replace(/[^\S\r\n]+/g, " ")
    .trim();

  return normalizedText.replace(/__URL_TOKEN_(\d+)__/g, (_, index: string) => protectedUrls[Number(index)] ?? "");
}

function isHtmlLike(value: string) {
  return /<\/?[a-z][^>]*>/i.test(value);
}

export function SubjectModuleLessonCard({ state }: Props) {
  const displayContent = state.contentBody
    ? (isHtmlLike(state.contentBody) ? state.contentBody : normalizeDisplayText(state.contentBody))
    : "";

  return (
    <section className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-lg">
      <div className="flex items-start gap-4">
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${state.theme.bgClass}`}>
          <FileText className={`h-6 w-6 ${state.theme.iconClass}`} />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1EA896]">Module Content</p>
          {state.submodule?.title ? (
            <p className="mt-2 text-base font-semibold text-[var(--text-primary)]/90 break-words [overflow-wrap:anywhere] whitespace-normal">
              {state.submodule.title}
            </p>
          ) : null}
          {state.submodule?.description ? (
            <p className="mt-1 text-sm text-[var(--text-primary)]/70 break-words [overflow-wrap:anywhere] whitespace-normal">
              {state.submodule.description}
            </p>
          ) : null}
        </div>
      </div>

      <article className="mt-6 min-w-0 overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-5">
        {state.contentBody ? (
          <SubjectRichDescription
            content={displayContent}
            className="max-w-3xl text-left text-sm leading-7 text-white/85 whitespace-pre-wrap break-words [overflow-wrap:anywhere] [&_a]:break-all [&_a]:text-[#1EA896] [&_a]:underline [&_p]:mb-4 [&_p:last-child]:mb-0 [&_li]:ml-5 [&_li]:mb-2 [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_pre]:max-w-full [&_pre]:overflow-x-auto [&_pre]:whitespace-pre-wrap [&_pre]:break-words [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_img]:mt-3 [&_img]:max-h-72 [&_img]:w-full [&_img]:rounded-xl [&_img]:object-contain"
          />
        ) : (
          <p className="text-sm text-[var(--text-primary)]/70">No submodule content has been added yet.</p>
        )}

        {state.attachedFiles.length > 0 ? (
          <div className="mt-6 border-t border-white/10 pt-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">Uploads:</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {state.attachedFiles.map((file) => (
                <button
                  key={file.id}
                  type="button"
                  onClick={() => state.openAttachedFile(file.id)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs text-white transition hover:bg-white/20"
                >
                  <Paperclip className="h-3.5 w-3.5 text-cyan-300" />
                  <span className="max-w-[240px] truncate" title={file.name}>{file.name}</span>
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </article>
    </section>
  );
}

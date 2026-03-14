import { useMemo } from "react";
import DOMPurify from "dompurify";

type Props = {
  content: string;
  className?: string;
};

const URL_PATTERN = /https?:\/\/[^\s<]+[^\s<.,:;"')\]\s]/gi;
const IMAGE_URL_PATTERN = /^(https?:\/\/[^\s]+\.(?:png|jpe?g|gif|webp|svg|bmp|avif)(?:\?[^\s]*)?)$/i;
const ALLOWED_TAGS = ["a", "b", "blockquote", "br", "code", "em", "i", "img", "li", "ol", "p", "pre", "strong", "ul"];
const ALLOWED_ATTR = ["alt", "href", "loading", "rel", "src", "target", "title"];

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function linkifyPlainText(value: string) {
  return value.replace(URL_PATTERN, (url) => {
    const escapedUrl = escapeHtml(url);
    return `<a href="${escapedUrl}" target="_blank" rel="noreferrer noopener">${escapedUrl}</a>`;
  });
}

function isHtmlLike(value: string) {
  return /<\/?[a-z][^>]*>/i.test(value);
}

function buildPlainTextHtml(value: string) {
  return value
    .split(/\r?\n/)
    .map((line) => {
      const trimmed = line.trim();
      if (trimmed.length > 0 && IMAGE_URL_PATTERN.test(trimmed)) {
        const escapedUrl = escapeHtml(trimmed);
        return `<img src="${escapedUrl}" alt="Embedded description media" loading="lazy" />`;
      }
      return linkifyPlainText(escapeHtml(line));
    })
    .join("<br />");
}

function enforceSafeAttributes(html: string) {
  if (typeof document === "undefined") return html;
  const template = document.createElement("template");
  template.innerHTML = html;

  template.content.querySelectorAll("a").forEach((anchor) => {
    anchor.setAttribute("target", "_blank");
    anchor.setAttribute("rel", "noreferrer noopener");
  });

  template.content.querySelectorAll("img").forEach((image) => {
    image.setAttribute("loading", "lazy");
    if (!image.getAttribute("alt")) image.setAttribute("alt", "Embedded description media");
  });

  return template.innerHTML;
}

export function SubjectRichDescription({ content, className }: Props) {
  const sanitizedHtml = useMemo(() => {
    const source = isHtmlLike(content) ? content : buildPlainTextHtml(content);
    const sanitized = DOMPurify.sanitize(source, {
      ALLOWED_TAGS,
      ALLOWED_ATTR,
      ADD_DATA_URI_TAGS: ["img"],
    });
    return enforceSafeAttributes(sanitized);
  }, [content]);

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
}

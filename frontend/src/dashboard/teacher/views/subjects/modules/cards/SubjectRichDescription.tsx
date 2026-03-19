import { useMemo } from "react";
import DOMPurify from "dompurify";

type Props = {
  content: string;
  className?: string;
};

const URL_PATTERN = /\b(?:https?:\/\/[^\s<]+|www\.[^\s<]+|(?:[a-z](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}(?::\d+)?(?:\/[^\s<]*)?)/gi;
const TRAILING_PUNCTUATION_PATTERN = /[.,:;"')\]]+$/;
const BARE_DOMAIN_PATTERN = /^(?:[a-z](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}(?::\d+)?(?:\/[^\s]*)?$/i;
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

function splitTrailingPunctuation(value: string) {
  const trailing = value.match(TRAILING_PUNCTUATION_PATTERN)?.[0] ?? "";
  return {
    trailing,
    url: trailing ? value.slice(0, -trailing.length) : value,
  };
}

function normalizeExternalHref(value: string) {
  const normalizedValue = value.trim();
  if (/^https?:\/\//i.test(normalizedValue)) return normalizedValue;
  if (/^www\./i.test(normalizedValue)) return `https://${normalizedValue}`;
  if (BARE_DOMAIN_PATTERN.test(normalizedValue)) return `https://${normalizedValue}`;
  return normalizedValue;
}

function isExternalHref(value: string) {
  return /^https?:\/\//i.test(normalizeExternalHref(value));
}

function linkifyPlainText(value: string) {
  return value.replace(URL_PATTERN, (rawMatch) => {
    const { trailing, url } = splitTrailingPunctuation(rawMatch);
    const normalizedUrl = normalizeExternalHref(url);
    const escapedHref = escapeHtml(normalizedUrl);
    const escapedLabel = escapeHtml(url);
    const escapedTrailing = escapeHtml(trailing);
    return `<a href="${escapedHref}" target="_blank" rel="noopener noreferrer">${escapedLabel}</a>${escapedTrailing}`;
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
    const href = anchor.getAttribute("href") ?? "";
    const normalizedHref = normalizeExternalHref(href);

    if (/^https?:\/\//i.test(href.trim())) {
      anchor.setAttribute("href", href.trim());
    } else if (normalizedHref) {
      anchor.setAttribute("href", normalizedHref);
    }

    if (isExternalHref(normalizedHref || href)) {
      anchor.setAttribute("target", "_blank");
      anchor.setAttribute("rel", "noopener noreferrer");
    }
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

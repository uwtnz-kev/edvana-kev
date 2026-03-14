import { useRef } from "react";
import type { ClipboardEvent } from "react";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  id: string;
  value: string;
  placeholder: string;
  className?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
};

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(typeof reader.result === "string" ? reader.result : "");
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function buildImageMarkup(urls: string[]) {
  return urls
    .filter((url) => url.length > 0)
    .map((url) => `<img src="${url}" alt="Pasted description image" />`)
    .join("\n");
}

function insertAtSelection(currentValue: string, insertion: string, selectionStart: number, selectionEnd: number) {
  const prefix = currentValue.slice(0, selectionStart);
  const suffix = currentValue.slice(selectionEnd);
  const needsLeadingBreak = prefix.length > 0 && !prefix.endsWith("\n");
  const needsTrailingBreak = suffix.length > 0 && !suffix.startsWith("\n");
  return `${prefix}${needsLeadingBreak ? "\n" : ""}${insertion}${needsTrailingBreak ? "\n" : ""}${suffix}`;
}

export function RichDescriptionTextarea({ id, value, placeholder, className, onChange, onBlur }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handlePaste = async (event: ClipboardEvent<HTMLTextAreaElement>) => {
    const imageFiles = Array.from(event.clipboardData.items)
      .filter((item) => item.type.startsWith("image/"))
      .map((item) => item.getAsFile())
      .filter((file): file is File => file !== null);

    if (imageFiles.length === 0) return;

    event.preventDefault();

    try {
      const imageUrls = await Promise.all(imageFiles.map((file) => readFileAsDataUrl(file)));
      const markup = buildImageMarkup(imageUrls);
      if (!markup) return;

      const element = textareaRef.current;
      const selectionStart = element?.selectionStart ?? value.length;
      const selectionEnd = element?.selectionEnd ?? value.length;
      const nextValue = insertAtSelection(value, markup, selectionStart, selectionEnd);
      onChange(nextValue);

      requestAnimationFrame(() => {
        if (!element) return;
        const cursorPosition = selectionStart + markup.length;
        element.focus();
        element.setSelectionRange(cursorPosition, cursorPosition);
      });
    } catch {
      // Ignore clipboard image failures and leave the current text intact.
    }
  };

  return (
    <Textarea
      ref={textareaRef}
      id={id}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      onBlur={onBlur}
      onPaste={handlePaste}
      placeholder={placeholder}
      className={className}
    />
  );
}

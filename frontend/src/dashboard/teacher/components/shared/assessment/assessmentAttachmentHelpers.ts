/** Provides shared attachment formatting and id helpers for assessment forms. */

export function formatAssessmentFileSize(sizeInBytes: number) {
  if (sizeInBytes < 1024) return `${sizeInBytes} B`;
  const kb = sizeInBytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}

// Falls back cleanly when secure UUID generation is unavailable.
export function buildAssessmentAttachmentId() {
  try {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      return `att-${crypto.randomUUID()}`;
    }
  } catch {
    // Fallback below.
  }

  return `att-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

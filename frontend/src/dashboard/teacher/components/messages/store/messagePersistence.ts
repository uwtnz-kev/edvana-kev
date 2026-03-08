/** Provides message-store persistence helpers backed by shared JSON storage utilities. */
import { getBrowserStorage, readStoredJson, writeStoredJson } from "@/dashboard/teacher/components/shared/storage/storageJson";
import { seedMessages, seedThreads } from "./messageSeedData";

export const THREADS_KEY = "teacher.messages.threads.v2";
export const MSG_KEY = "teacher.messages.items.v2";
export const MESSAGES_CHANGED_EVENT = "teacher:messages-changed";

export function readJson<T>(key: string, fallback: T): T {
  return readStoredJson(key, fallback);
}

export function writeJson<T>(key: string, value: T) {
  writeStoredJson(key, value);
  if (typeof window !== "undefined") window.dispatchEvent(new Event(MESSAGES_CHANGED_EVENT));
}

export function subscribeMessagesChanged(listener: () => void) {
  if (typeof window === "undefined") return () => undefined;
  window.addEventListener(MESSAGES_CHANGED_EVENT, listener);
  return () => window.removeEventListener(MESSAGES_CHANGED_EVENT, listener);
}

export function ensureMessagesSeeded() {
  const storage = getBrowserStorage();
  if (!storage || storage.getItem(THREADS_KEY)) return;
  writeJson(THREADS_KEY, seedThreads);
  writeJson(MSG_KEY, seedMessages);
}

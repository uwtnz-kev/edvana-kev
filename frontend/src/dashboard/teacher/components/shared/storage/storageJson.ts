/** Provides safe JSON storage helpers for teacher dashboard persistence modules. */

export function getBrowserStorage(): Storage | null {
  try {
    return typeof localStorage === "undefined" ? null : localStorage;
  } catch {
    return null;
  }
}

export function readStoredJson<T>(key: string, fallback: T): T {
  const storage = getBrowserStorage();
  if (!storage) return fallback;
  try {
    const raw = storage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeStoredJson<T>(key: string, value: T) {
  const storage = getBrowserStorage();
  if (!storage) {
    throw new Error(`Browser storage is unavailable for key "${key}".`);
  }

  storage.setItem(key, JSON.stringify(value));
}

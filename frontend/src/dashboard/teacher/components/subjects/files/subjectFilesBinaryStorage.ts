const DB_NAME = "teacher.subjectFiles.binary";
const DB_VERSION = 1;
const STORE_NAME = "fileContent";

type SubjectFileBinaryRecord = {
  key: string;
  mimeType: string;
  fileName: string;
  blob: Blob;
};

function openSubjectFilesDb() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    if (typeof indexedDB === "undefined") {
      reject(new Error(`[subjectFilesBinaryStorage] IndexedDB unavailable for database "${DB_NAME}".`));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "key" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error(`[subjectFilesBinaryStorage] DB open failed for database "${DB_NAME}".`));
  });
}

function runTransaction<T>(
  mode: IDBTransactionMode,
  executor: (store: IDBObjectStore, resolve: (value: T) => void, reject: (reason?: unknown) => void) => void,
) {
  return new Promise<T>((resolve, reject) => {
    openSubjectFilesDb()
      .then((db) => {
        const transaction = db.transaction(STORE_NAME, mode);
        const store = transaction.objectStore(STORE_NAME);

        transaction.oncomplete = () => db.close();
        transaction.onabort = () => {
          db.close();
          reject(transaction.error ?? new Error(`[subjectFilesBinaryStorage] Transaction aborted for store "${STORE_NAME}".`));
        };
        transaction.onerror = () => {
          db.close();
          reject(transaction.error ?? new Error(`[subjectFilesBinaryStorage] Transaction error for store "${STORE_NAME}".`));
        };

        executor(store, resolve, reject);
      })
      .catch(reject);
  });
}

export function buildSubjectFileContentKey(fileId: string) {
  return `subject-file-content:${fileId}`;
}

export function storeSubjectFileContent(key: string, file: File) {
  return runTransaction<void>("readwrite", (store, resolve, reject) => {
    const record: SubjectFileBinaryRecord = {
      key,
      mimeType: file.type || "application/octet-stream",
      fileName: file.name,
      blob: file,
    };
    const request = store.put(record);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error ?? new Error(`[subjectFilesBinaryStorage] Record put failed for key "${key}".`));
  });
}

export function readSubjectFileContent(key: string) {
  return runTransaction<SubjectFileBinaryRecord | null>("readonly", (store, resolve, reject) => {
    const request = store.get(key);
    request.onsuccess = () => {
      const value = request.result as SubjectFileBinaryRecord | undefined;
      resolve(value ?? null);
    };
    request.onerror = () => reject(request.error ?? new Error(`Failed to read file content for "${key}".`));
  });
}

export type FileValidationResult = {
  isValid: boolean;
  error: string | null;
};

export type UploadFileValidationOptions = {
  maxSizeBytes?: number;
  allowedExtensions?: string[];
  unsupportedFileMessage?: string;
  fileTooLargeMessage?: string;
};

export const DEFAULT_UPLOAD_ALLOWED_EXTENSIONS = ["pdf", "doc", "docx", "ppt", "pptx", "xls", "xlsx", "jpg", "jpeg", "png"];
export const DEFAULT_UPLOAD_MAX_FILE_SIZE_BYTES = 17 * 1024 * 1024;
export const DEFAULT_UNSUPPORTED_FILE_MESSAGE = "Unsupported file type. Please upload PDF, Word, Excel, PowerPoint, JPG, or PNG files.";
export const DEFAULT_FILE_TOO_LARGE_MESSAGE = "File is too large. Maximum allowed size is 17 MB.";

export function validateUploadFile(file: File, options: UploadFileValidationOptions = {}): FileValidationResult {
  const allowedExtensions = options.allowedExtensions ?? DEFAULT_UPLOAD_ALLOWED_EXTENSIONS;
  const maxSizeBytes = options.maxSizeBytes ?? DEFAULT_UPLOAD_MAX_FILE_SIZE_BYTES;
  const unsupportedFileMessage = options.unsupportedFileMessage ?? DEFAULT_UNSUPPORTED_FILE_MESSAGE;
  const fileTooLargeMessage = options.fileTooLargeMessage ?? DEFAULT_FILE_TOO_LARGE_MESSAGE;
  const extension = file.name.split(".").pop()?.toLowerCase() ?? "";

  if (!allowedExtensions.includes(extension)) {
    return { isValid: false, error: unsupportedFileMessage };
  }

  if (file.size > maxSizeBytes) {
    return { isValid: false, error: fileTooLargeMessage };
  }

  return { isValid: true, error: null };
}

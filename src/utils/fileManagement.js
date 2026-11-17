const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/msword",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "text/plain",
];
const ALLOWED_EXTENSIONS = /\.(pdf|doc|docx|ppt|pptx|txt)$/i;
export const MAX_FILE_SIZE = 8 * 1024 * 1024;

export function validateNotesFile(file) {
  if (!file) return "Please choose a file to upload.";
  if (!ALLOWED_MIME_TYPES.includes(file.type) && !ALLOWED_EXTENSIONS.test(file.name)) {
    return "Please upload a PDF, DOC, DOCX, PPT, PPTX or TXT file.";
  }
  if (file.size > MAX_FILE_SIZE) return "File is too large. Please use a file under 8 MB.";
  return null;
}

export function formatFileSize(size) {
  return size < 1024 * 1024
    ? `${Math.max(1, Math.round(size / 1024))} KB`
    : `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Could not read this file. Please try again."));
    reader.readAsDataURL(file);
  });
}

export function downloadNoteFile(note) {
  if (!note?.dataUrl) return false;
  const link = document.createElement("a");
  link.href = note.dataUrl;
  link.download = note.fileName || `${note.title}.${String(note.type || "pdf").toLowerCase()}`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  return true;
}

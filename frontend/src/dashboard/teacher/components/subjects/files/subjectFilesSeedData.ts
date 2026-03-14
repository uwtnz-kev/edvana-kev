import type { SubjectFileItem } from "./subjectFilesTypes";

function encodeSvg(svg: string) {
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function buildPreview(name: string, description: string, accent: string) {
  return encodeSvg(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1600" viewBox="0 0 1200 1600">
    <rect width="1200" height="1600" fill="#07111f" />
    <rect x="70" y="70" width="1060" height="1460" rx="42" fill="#0f1c30" stroke="${accent}" stroke-width="6" />
    <rect x="120" y="140" width="220" height="56" rx="28" fill="${accent}" fill-opacity="0.2" />
    <text x="230" y="177" text-anchor="middle" fill="${accent}" font-family="Arial, sans-serif" font-size="28" font-weight="700">SUBJECT FILE</text>
    <text x="120" y="280" fill="#ffffff" font-family="Arial, sans-serif" font-size="60" font-weight="700">${name}</text>
    <foreignObject x="120" y="340" width="960" height="820">
      <div xmlns="http://www.w3.org/1999/xhtml" style="color:#d7e3f4;font-family:Arial,sans-serif;font-size:34px;line-height:1.45;white-space:pre-wrap;">${description}</div>
    </foreignObject>
    <rect x="120" y="1270" width="960" height="2" fill="#29435c" />
    <text x="120" y="1335" fill="#8ca6c6" font-family="Arial,sans-serif" font-size="28">Teacher dashboard preview for subject files</text>
  </svg>`);
}

export const subjectFilesSeedData: Record<string, SubjectFileItem[]> = {
  "subject-2-math": [
    { id: "math-formulas-sheet", subjectId: "subject-2-math", name: "Quadratic Formula Sheet", description: "Reference sheet for solving quadratic equations.", category: "Reference", originalFileName: "quadratic-formulas.pdf", mimeType: "image/svg+xml", previewUrl: buildPreview("Quadratic Formula Sheet", "Reference sheet for solving quadratic equations.", "#60a5fa"), createdAt: "2026-02-03T08:30:00.000Z", updatedAt: "2026-02-05T09:15:00.000Z", modifiedBy: "Ms. Keza", sizeBytes: 482000, folderId: null },
    { id: "math-graphing-guide", subjectId: "subject-2-math", name: "Graphing Guide", description: "Step-by-step graph sketching examples for class use.", category: "Worksheet", originalFileName: "graphing-guide.docx", mimeType: "image/svg+xml", previewUrl: buildPreview("Graphing Guide", "Step-by-step graph sketching examples for class use.", "#38bdf8"), createdAt: "2026-02-10T10:00:00.000Z", updatedAt: "2026-02-12T11:20:00.000Z", modifiedBy: "Ms. Keza", sizeBytes: 913000, folderId: null },
  ],
  "subject-2-bio": [
    { id: "bio-cell-diagrams", subjectId: "subject-2-bio", name: "Cell Diagrams Pack", description: "Annotated plant and animal cell diagrams.", category: "Lab", originalFileName: "cell-diagrams-pack.pdf", mimeType: "image/svg+xml", previewUrl: buildPreview("Cell Diagrams Pack", "Annotated plant and animal cell diagrams.", "#34d399"), createdAt: "2026-01-28T07:45:00.000Z", updatedAt: "2026-02-02T13:10:00.000Z", modifiedBy: "Mr. Habimana", sizeBytes: 1240000, folderId: null },
  ],
  "subject-2-chem": [
    { id: "chem-safety-rules", subjectId: "subject-2-chem", name: "Lab Safety Rules", description: "Mandatory chemistry safety instructions and reminders.", category: "Policy", originalFileName: "chemistry-lab-safety.pdf", mimeType: "image/svg+xml", previewUrl: buildPreview("Lab Safety Rules", "Mandatory chemistry safety instructions and reminders.", "#c084fc"), createdAt: "2026-02-01T09:00:00.000Z", updatedAt: "2026-02-01T09:00:00.000Z", modifiedBy: "Ms. Uwase", sizeBytes: 366000, folderId: null },
  ],
  "subject-2-physics": [
    { id: "physics-motion-lab", subjectId: "subject-2-physics", name: "Motion Lab Template", description: "Lab worksheet for measuring speed and acceleration.", category: "Lab", originalFileName: "motion-lab-template.xlsx", mimeType: "image/svg+xml", previewUrl: buildPreview("Motion Lab Template", "Lab worksheet for measuring speed and acceleration.", "#fbbf24"), createdAt: "2026-02-08T12:00:00.000Z", updatedAt: "2026-02-09T08:20:00.000Z", modifiedBy: "Mr. Ndayisaba", sizeBytes: 278000, folderId: null },
  ],
  "subject-2-english": [
    { id: "english-reading-log", subjectId: "subject-2-english", name: "Reading Log", description: "Weekly reading tracker for independent reading tasks.", category: "Tracker", originalFileName: "reading-log-template.docx", mimeType: "image/svg+xml", previewUrl: buildPreview("Reading Log", "Weekly reading tracker for independent reading tasks.", "#f472b6"), createdAt: "2026-02-06T15:00:00.000Z", updatedAt: "2026-02-07T10:45:00.000Z", modifiedBy: "Ms. Mukamana", sizeBytes: 198000, folderId: null },
  ],
  "subject-2-geography": [
    { id: "geo-map-key", subjectId: "subject-2-geography", name: "Map Key Reference", description: "Quick symbol guide for map-reading exercises.", category: "Reference", originalFileName: "map-key-reference.pdf", mimeType: "image/svg+xml", previewUrl: buildPreview("Map Key Reference", "Quick symbol guide for map-reading exercises.", "#2dd4bf"), createdAt: "2026-01-30T11:30:00.000Z", updatedAt: "2026-02-03T07:10:00.000Z", modifiedBy: "Mr. Nsengimana", sizeBytes: 441000, folderId: null },
  ],
};

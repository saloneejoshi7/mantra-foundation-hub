// Auto-discover book covers from src/assets/books/covers and match PDFs in /public/books/pdfs
const covers = import.meta.glob("../assets/books/covers/*.{png,jpg,jpeg,webp}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

export type Book = {
  id: string;
  title: string;
  subject: string;
  level: string;
  cover: string;
  pdf: string | null;
};

const SUBJECT_KEYWORDS: Array<{ key: string; subject: string; pdfKey: string }> = [
  { key: "english", subject: "English", pdfKey: "english" },
  { key: "hindi", subject: "Hindi", pdfKey: "hindi" },
  { key: "gujarati", subject: "Gujarati", pdfKey: "gujarati" },
  { key: "maths", subject: "Mathematics", pdfKey: "maths" },
  { key: "math", subject: "Mathematics", pdfKey: "maths" },
  { key: "g.k", subject: "GK", pdfKey: "g.k." },
  { key: "gk", subject: "GK", pdfKey: "g.k." },
  { key: "prevocational", subject: "PreVocational", pdfKey: "pre-vocational" },
  { key: "pre vocational", subject: "PreVocational", pdfKey: "pre-vocational" },
  { key: "art and craft", subject: "Art and Craft", pdfKey: "art-and-craft" },
];

export const SUBJECT_ORDER = [
  "English",
  "Hindi",
  "Gujarati",
  "Mathematics",
  "GK",
  "PreVocational",
  "Art and Craft",
];

function normalize(s: string) {
  return s.toLowerCase().replace(/\s+/g, " ").trim();
}

function deriveSubject(name: string) {
  const n = normalize(name);
  return SUBJECT_KEYWORDS.find((s) => n.includes(s.key)) ?? null;
}

function deriveLevel(name: string) {
  const m = name.toLowerCase().match(/level\s*([0-9]+)/);
  const partM = name.toLowerCase().match(/part\s*([0-9]+)/);
  const level = m ? `Level ${m[1]}` : "";
  const part = partM ? ` (Part ${partM[1]})` : "";
  return level + part;
}

// Build a PDF lookup by normalized filename slug
const PDF_FILES = [
  "index-art-and-craft-level-1.pdf",
  "index-art-and-craft-level-2.pdf",
  "index-art-and-craft-level-3.pdf",
  "index-english-level-1.pdf",
  "index-english-level-2.pdf",
  "index-english-level-3.pdf",
  "index-english-level-4.pdf",
  "index-english-level-5.pdf",
  "index-g.k.-level-1.pdf",
  "index-g.k.-level-2.pdf",
  "index-g.k.-level-3.pdf",
  "index-gujarati-level-3.pdf",
  "index-gujarati-level-4.pdf",
  "index-gujarati-part1-level-1.pdf",
  "index-gujarati-part1-level-2.pdf",
  "index-gujarati-part2-level-1.pdf",
  "index-gujarati-part2-level-2.pdf",
  "index-hindi-level-1.pdf",
  "index-hindi-level-2.pdf",
  "index-hindi-level-3.pdf",
  "index-maths-level-1.pdf",
  "index-maths-level-2.pdf",
  "index-maths-level-3.pdf",
  "index-maths-level-4.pdf",
  "index-pre-vocational-level-1.pdf",
];

function findPdf(subjectInfo: { pdfKey: string } | null, levelNum: string, partNum: string) {
  if (!subjectInfo) return null;
  const candidate = PDF_FILES.find((f) => {
    if (!f.includes(subjectInfo.pdfKey)) return false;
    if (!f.includes(`level-${levelNum}`)) return false;
    if (partNum) return f.includes(`part${partNum}`);
    if (f.includes("part1") || f.includes("part2")) return false;
    return true;
  });
  return candidate ? `/books/pdfs/${candidate}` : null;
}

export const BOOKS: Book[] = Object.entries(covers)
  .map(([path, url]) => {
    const file = path.split("/").pop()!.replace(/\.(png|jpg|jpeg|webp)$/i, "");
    const subjectInfo = deriveSubject(file);
    const subject = subjectInfo?.subject ?? "Other";
    const levelMatch = file.toLowerCase().match(/level\s*([0-9]+)/);
    const partMatch = file.toLowerCase().match(/part\s*([0-9]+)/);
    const levelNum = levelMatch ? levelMatch[1] : "";
    const partNum = partMatch ? partMatch[1] : "";
    const level = deriveLevel(file);
    return {
      id: file,
      title: `${subject} — ${level}`.trim(),
      subject,
      level,
      cover: url,
      pdf: findPdf(subjectInfo, levelNum, partNum),
    };
  })
  .sort((a, b) => {
    const sa = SUBJECT_ORDER.indexOf(a.subject);
    const sb = SUBJECT_ORDER.indexOf(b.subject);
    if (sa !== sb) return sa - sb;
    return a.level.localeCompare(b.level);
  });

export function booksBySubject() {
  const map = new Map<string, Book[]>();
  SUBJECT_ORDER.forEach((s) => map.set(s, []));
  BOOKS.forEach((b) => {
    if (!map.has(b.subject)) map.set(b.subject, []);
    map.get(b.subject)!.push(b);
  });
  return map;
}

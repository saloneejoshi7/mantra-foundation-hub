const files = import.meta.glob("../assets/gallery/**/*.{png,jpg,jpeg,webp}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

export type GalleryItem = {
  id: string;
  category: string;
  categoryLabel: string;
  src: string;
  alt: string;
};

const LABELS: Record<string, string> = {
  "Education": "Education",
  "Awards-and-Achievements": "Awards & Achievements",
  "Breakfast": "Breakfast",
  "Montessori-Activity": "Montessori Activity",
  "Therapy": "Therapy",
  "Vocational-Training-Activity": "Vocational Training",
  "Exterior-View": "Exterior View",
  "Facilities": "Facilities",
  "Foundation-Programs": "Foundation Programs",
};

export const GALLERY: GalleryItem[] = Object.entries(files).map(([path, url]) => {
  const parts = path.split("/");
  const category = parts[parts.length - 2];
  const file = parts[parts.length - 1];
  const id = `${category}-${file}`;
  return {
    id,
    category,
    categoryLabel: LABELS[category] ?? category,
    src: url,
    alt: file.replace(/\.(png|jpg|jpeg|webp)$/i, "").replace(/[-_]/g, " "),
  };
});

export const CATEGORIES = Array.from(
  new Set(GALLERY.map((g) => g.category))
).sort((a, b) => (LABELS[a] ?? a).localeCompare(LABELS[b] ?? b));

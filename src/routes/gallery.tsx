import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Layout } from "@/components/Layout";
import { CATEGORIES, GALLERY, type GalleryItem } from "@/data/gallery";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Mantra Foundation" },
      {
        name: "description",
        content:
          "Education, therapy, vocational training, montessori activity and more — moments from Mantra Foundation in Rajkot.",
      },
      { property: "og:title", content: "Mantra Foundation Gallery" },
      { property: "og:description", content: "Moments from our classrooms, therapy rooms and programs." },
    ],
  }),
  component: GalleryPage,
});

const LABEL: Record<string, string> = {
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

function GalleryImage({ item, onClick }: { item: GalleryItem; onClick: () => void }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <button
      onClick={onClick}
      className="group relative block w-full overflow-hidden rounded-2xl bg-muted shadow-card hover-lift"
      aria-label={`View ${item.alt}`}
    >
      <div className="aspect-[4/3] w-full">
        {!loaded && <div className="skeleton absolute inset-0" />}
        <img
          src={item.src}
          alt={item.alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`h-full w-full object-cover transition-all duration-500 group-hover:scale-105 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent p-3 text-left opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <div className="text-[10px] font-bold uppercase tracking-wider text-white/80">
          {LABEL[item.category] ?? item.category}
        </div>
      </div>
    </button>
  );
}

function GalleryPage() {
  const [filter, setFilter] = useState<string>("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = useMemo(
    () => (filter === "All" ? GALLERY : GALLERY.filter((g) => g.category === filter)),
    [filter]
  );

  // Lightbox keyboard nav
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((i) => (i === null ? null : (i + 1) % filtered.length));
      if (e.key === "ArrowLeft") setLightbox((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, filtered.length]);

  return (
    <Layout>
      <section className="relative isolate pt-28 pb-16 sm:pt-36 sm:pb-24">
        <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <div className="text-xs font-semibold uppercase tracking-wider text-brand">Gallery</div>
          <h1 className="mt-3 animate-fade-up font-display text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
            Moments of <span className="gradient-text">"You Can"</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl animate-fade-up text-base text-muted-foreground sm:text-lg" style={{ animationDelay: "0.15s" }}>
            Classrooms, therapy rooms, kitchens and play — a glimpse of life at Mantra Foundation.
          </p>

          <div className="mx-auto mt-8 flex max-w-4xl flex-wrap justify-center gap-2">
            {["All", ...CATEGORIES].map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                  filter === c
                    ? "bg-[image:var(--gradient-brand)] text-primary-foreground shadow-card"
                    : "border border-border bg-white text-foreground/70 hover:border-brand hover:text-brand-deep"
                }`}
              >
                {c === "All" ? "All" : LABEL[c] ?? c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((item, i) => (
            <div key={item.id} className="animate-scale-in" style={{ animationDelay: `${(i % 12) * 40}ms` }}>
              <GalleryImage item={item} onClick={() => setLightbox(i)} />
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && filtered[lightbox] && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-foreground/90 p-4 animate-fade-in">
          <button
            onClick={() => setLightbox(null)}
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/20"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
          <button
            onClick={() => setLightbox((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length))}
            className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/20 sm:left-6"
            aria-label="Previous"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => setLightbox((i) => (i === null ? null : (i + 1) % filtered.length))}
            className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/20 sm:right-6"
            aria-label="Next"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <figure className="max-h-[88vh] w-full max-w-5xl animate-scale-in">
            <img
              src={filtered[lightbox].src}
              alt={filtered[lightbox].alt}
              className="mx-auto max-h-[80vh] w-auto rounded-2xl object-contain shadow-soft"
            />
            <figcaption className="mt-3 text-center text-sm text-white/80">
              {LABEL[filtered[lightbox].category] ?? filtered[lightbox].category} — {lightbox + 1} / {filtered.length}
            </figcaption>
          </figure>
        </div>
      )}
    </Layout>
  );
}

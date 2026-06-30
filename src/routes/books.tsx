import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Layout } from "@/components/Layout";
import { BOOKS, SUBJECT_ORDER } from "@/data/books";
import { Download, ExternalLink, Search } from "lucide-react";

export const Route = createFileRoute("/books")({
  head: () => ({
    meta: [
      { title: "Books Library — Mantra Foundation Functional Curriculum" },
      {
        name: "description",
        content:
          "Browse Mantra Foundation's functional curriculum books — English, Hindi, Gujarati, Maths, GK, PreVocational and Art & Craft. View or download the index PDF.",
      },
      { property: "og:title", content: "Mantra Foundation Books Library" },
      { property: "og:description", content: "Curriculum books designed for differently-abled learners." },
    ],
  }),
  component: BooksPage,
});

function BooksPage() {
  const [filter, setFilter] = useState<string>("All");
  const [query, setQuery] = useState("");

  const subjects = useMemo(() => {
    const present = new Set(BOOKS.map((b) => b.subject));
    return ["All", ...SUBJECT_ORDER.filter((s) => present.has(s))];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return BOOKS.filter((b) => {
      if (filter !== "All" && b.subject !== filter) return false;
      if (!q) return true;
      const hay = `${b.subject} ${b.level} ${b.title} ${b.id}`.toLowerCase();
      return hay.includes(q);
    });
  }, [filter, query]);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative isolate pt-28 pb-16 sm:pt-36 sm:pb-24">
        <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <div className="text-xs font-semibold uppercase tracking-wider text-brand">Library</div>
          <h1 className="mt-3 animate-fade-up font-display text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
            Books <span className="gradient-text">Library</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl animate-fade-up text-base text-muted-foreground sm:text-lg" style={{ animationDelay: "0.15s" }}>
            A research-based functional curriculum across {BOOKS.length} books. View or download
            the index PDF of each book.
          </p>

          {/* Search */}
          <div className="mx-auto mt-8 flex max-w-md items-center gap-2 rounded-full border border-border bg-white px-4 py-2 shadow-card focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/30">
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
            <input
              type="text"
              inputMode="search"
              enterKeyHint="search"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck={false}
              placeholder="Search by subject or level..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full min-w-0 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              aria-label="Search books"
            />
          </div>

          {/* Filters */}
          <div className="mx-auto mt-6 flex max-w-3xl flex-wrap justify-center gap-2">
            {subjects.map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                  filter === s
                    ? "bg-[image:var(--gradient-brand)] text-primary-foreground shadow-card"
                    : "border border-border bg-white text-foreground/70 hover:border-brand hover:text-brand-deep"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid grouped by subject when no filter */}
      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        {filter === "All" && !query ? (
          subjects
            .filter((s) => s !== "All")
            .map((subj) => {
              const items = BOOKS.filter((b) => b.subject === subj);
              if (!items.length) return null;
              return (
                <div key={subj} className="mt-10 first:mt-0">
                  <div className="reveal mb-5 flex items-end justify-between gap-3">
                    <h2 className="font-display text-2xl font-bold sm:text-3xl">{subj}</h2>
                    <span className="text-xs text-muted-foreground">{items.length} books</span>
                  </div>
                  <BookGrid books={items} />
                </div>
              );
            })
        ) : (
          <div className="mt-2">
            <BookGrid books={filtered} />
            {filtered.length === 0 && (
              <p className="mt-8 text-center text-sm text-muted-foreground">
                No books match your search.
              </p>
            )}
          </div>
        )}
      </section>
    </Layout>
  );
}

function BookGrid({ books }: { books: typeof BOOKS }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {books.map((b, i) => (
        <article
          key={b.id}
          className="reveal group flex flex-col overflow-hidden rounded-2xl bg-card shadow-card hover-lift"
          style={{ transitionDelay: `${i * 30}ms` }}
        >
          <div className="aspect-[3/4] overflow-hidden bg-muted">
            <img
              src={b.cover}
              alt={b.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-1 flex-col p-4">
            <div className="text-[10px] font-bold uppercase tracking-wider text-brand">
              {b.subject}
            </div>
            <h3 className="mt-1 font-display text-sm font-semibold text-foreground">{b.level || "—"}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {b.pdf ? (
                <>
                  <a
                    href={b.pdf}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-[image:var(--gradient-brand)] px-3 py-2 text-xs font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    View Index
                  </a>
                  <a
                    href={b.pdf}
                    download
                    className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border bg-white px-3 py-2 text-xs font-semibold text-foreground hover:border-brand hover:text-brand-deep"
                    aria-label={`Download ${b.title} index PDF`}
                  >
                    <Download className="h-3.5 w-3.5" />
                  </a>
                </>
              ) : (
                <span className="text-xs text-muted-foreground">Index coming soon</span>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

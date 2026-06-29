import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Sparkles, BookOpen, Phone, Mail, MapPin } from "lucide-react";
import { Layout } from "@/components/Layout";
import { BOOKS } from "@/data/books";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mantra Foundation — An Institute for Differently Abled" },
      {
        name: "description",
        content:
          "An Institute for Differently Abled in Rajkot, Gujarat. Special education, therapy, vocational training and sports.",
      },
    ],
  }),
  component: Home,
});

function useCountUp(target: number, duration = 1600, start = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return val;
}

function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(true)),
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const years = useCountUp(15, 1400, active);
  const students = useCountUp(200, 1600, active);
  const books = useCountUp(BOOKS.length, 1400, active);
  const programs = useCountUp(8, 1200, active);

  const items = [
    { v: years, suffix: "+", label: "Years of impact" },
    { v: students, suffix: "+", label: "Lives touched" },
    { v: books, suffix: "", label: "Curriculum books" },
    { v: programs, suffix: "", label: "Core programs" },
  ];

  return (
    <section ref={ref} className="relative mx-auto mt-4 max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 gap-3 rounded-3xl bg-card p-6 shadow-card sm:p-8 lg:grid-cols-4">
        {items.map((it, i) => (
          <div key={i} className="text-center">
            <div className="font-display text-3xl font-bold gradient-text sm:text-4xl lg:text-5xl">
              {it.v}
              {it.suffix}
            </div>
            <div className="mt-1 text-xs font-medium text-muted-foreground sm:text-sm">
              {it.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Home() {
  const featured = BOOKS.slice(0, 6);
  return (
    <Layout>
      {/* HERO */}
      <section className="relative isolate pt-32 pb-24 sm:pt-36 sm:pb-32 lg:pt-48 lg:pb-44">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{ background: "var(--gradient-hero)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute -left-24 top-32 h-72 w-72 rounded-full bg-brand/20 blur-3xl animate-float" />
          <div className="absolute right-[-3rem] top-10 h-80 w-80 rounded-full bg-accent-pink/15 blur-3xl animate-float" style={{ animationDelay: "-3s" }} />
          <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-accent-amber/15 blur-3xl animate-float" style={{ animationDelay: "-1.5s" }} />
        </div>

        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
          <span className="inline-flex animate-fade-in items-center gap-2 rounded-full border border-brand/20 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-deep shadow-card">
            <Sparkles className="h-3.5 w-3.5" />
            Rajkot, Gujarat · Since 2010
          </span>
          <h1
            className="mt-6 animate-fade-up font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ animationDelay: "0.1s" }}
          >
            An Institute for{" "}
            <span className="gradient-text">Differently Abled</span>
          </h1>
          <p
            className="mx-auto mt-6 max-w-2xl animate-fade-up text-base leading-relaxed text-muted-foreground sm:text-lg"
            style={{ animationDelay: "0.25s" }}
          >
            For 15 years, Mantra Foundation has been a home of hope, learning and dignity —
            built on one powerful mantra: <span className="font-semibold text-foreground">You Can.</span>
          </p>
          <div
            className="mt-9 flex animate-fade-up flex-wrap items-center justify-center gap-3"
            style={{ animationDelay: "0.4s" }}
          >
            <Link
              to="/about"
              className="group inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-brand)] px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-[1.03]"
            >
              Our Story
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/books"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-white/80 px-6 py-3 text-sm font-semibold text-foreground hover:bg-white"
            >
              <BookOpen className="h-4 w-4" />
              Browse Books
            </Link>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-6 hidden justify-center sm:flex">
          <div className="animate-float text-muted-foreground">
            <ChevronDown className="h-6 w-6" />
          </div>
        </div>
      </section>

      <Stats />

      {/* Intro */}
      <section className="mx-auto mt-24 max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="reveal">
            <div className="text-xs font-semibold uppercase tracking-wider text-brand">Welcome</div>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
              A home of hope, learning and dignity.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              Mantra Foundation is an educational NGO based in Rajkot, Gujarat — founded by the
              proud parents of Mantra Harkhani, an international para-swimmer with Down Syndrome.
              We deliver a research-based functional curriculum focused on real life: communication,
              self-care, work-readiness and independence.
            </p>
            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {["Special Education", "Therapies", "Skill Training", "Sports"].map((c) => (
                <div
                  key={c}
                  className="rounded-2xl border border-border/70 bg-white px-3 py-3 text-center text-xs font-semibold text-foreground shadow-card"
                >
                  {c}
                </div>
              ))}
            </div>
          </div>
          <div className="reveal">
            <div className="relative overflow-hidden rounded-3xl shadow-soft">
              <img
                src="/src/assets/about/exterior-view.png"
                alt="Mantra Foundation exterior"
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section className="mx-auto mt-24 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div className="reveal">
            <div className="text-xs font-semibold uppercase tracking-wider text-brand">Library</div>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Featured curriculum</h2>
          </div>
          <Link
            to="/books"
            className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-brand-deep hover:underline sm:inline-flex"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {featured.map((b) => (
            <Link
              key={b.id}
              to="/books"
              className="reveal group overflow-hidden rounded-2xl bg-card shadow-card hover-lift"
            >
              <div className="aspect-[3/4] overflow-hidden bg-muted">
                <img
                  src={b.cover}
                  alt={b.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="px-3 py-2">
                <div className="truncate text-xs font-semibold text-foreground">{b.subject}</div>
                <div className="truncate text-[11px] text-muted-foreground">{b.level}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Contact card */}
      <section className="mx-auto mt-24 max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="reveal grid gap-6 rounded-3xl bg-[image:var(--gradient-brand)] p-8 text-primary-foreground shadow-soft sm:p-12 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">Visit us, write to us, support us.</h2>
            <p className="mt-3 max-w-lg text-sm text-primary-foreground/85 sm:text-base">
              We welcome parents, volunteers, well-wishers and partners. Reach out — we'd love to
              show you what our students can do.
            </p>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-deep transition-transform hover:scale-[1.03]"
            >
              Get in touch <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <ul className="grid gap-3 text-sm">
            <li className="flex items-start gap-3 rounded-2xl bg-white/10 p-4 backdrop-blur">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0" />
              <span>D 136, Raviratna Park Main Rd, Golden Park, Rajkot, Gujarat 360005</span>
            </li>
            <li className="flex items-center gap-3 rounded-2xl bg-white/10 p-4 backdrop-blur">
              <Phone className="h-5 w-5 shrink-0" />
              <a href="tel:+919712399777">+91 97123 99777</a>
            </li>
            <li className="flex items-center gap-3 rounded-2xl bg-white/10 p-4 backdrop-blur">
              <Mail className="h-5 w-5 shrink-0" />
              <a href="mailto:mantrafoundationrajkot@gmail.com" className="break-all">
                mantrafoundationrajkot@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </section>
    </Layout>
  );
}

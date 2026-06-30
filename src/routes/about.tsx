import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Heart, Target, Eye, Compass, Users, GraduationCap, Sparkles } from "lucide-react";
import exteriorImg from "@/assets/about/exterior-view.png";
import facilitiesImg from "@/assets/about/facilities.png";
import initiativesImg from "@/assets/about/initiatives.png";
import founders1 from "@/assets/about/founders-1.png";
import founders2 from "@/assets/about/founders-2.png";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Mantra Foundation — 15 Years of 'You Can'" },
      {
        name: "description",
        content:
          "Our story, mission, founders and initiatives — empowering differently-abled individuals through a research-based functional curriculum.",
      },
      { property: "og:title", content: "About Mantra Foundation" },
      { property: "og:description", content: "15 years. One powerful Mantra: You Can." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <Layout>
      {/* HERO */}
      <section className="relative isolate pt-28 pb-24 sm:pt-36 sm:pb-32">
        <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <div className="text-xs font-semibold uppercase tracking-wider text-brand">About Us</div>
          <h1 className="mt-3 animate-fade-up font-display text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
            15 Years. <span className="gradient-text">One Powerful Mantra: "You Can."</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl animate-fade-up text-base text-muted-foreground sm:text-lg" style={{ animationDelay: "0.15s" }}>
            For the last 15 years, Mantra Foundation has been a home of hope, learning and
            dignity for individuals with special needs in Rajkot, Gujarat.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="reveal">
            <div className="text-xs font-semibold uppercase tracking-wider text-brand">Our Story</div>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Begins with Love</h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              We were founded by the proud parents of{" "}
              <span className="font-semibold text-foreground">Mantra Harkhani</span> — a graduate,
              an international para-swimmer, and an individual honored by Hon. Shri Narendra Modiji.
              Mantra has Down Syndrome. His journey taught us one truth:{" "}
              <span className="font-semibold text-foreground">ability has no single definition.</span>
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Named after him, <em>"Mantra"</em> means a powerful chant that transforms lives. That's
              exactly what we do every day.
            </p>
          </div>
          <div className="reveal">
            <img
              src={exteriorImg}
              alt="Mantra Foundation building"
              className="aspect-[4/3] w-full rounded-3xl object-cover shadow-soft"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="mx-auto mt-24 max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="reveal rounded-3xl bg-card p-8 shadow-card sm:p-12">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-soft text-brand-deep">
              <Compass className="h-6 w-6" />
            </div>
            <h2 className="font-display text-2xl font-bold sm:text-3xl">Our Approach: Life Beyond Books</h2>
          </div>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            Inspired by Mantra's journey, our founder created a research-based{" "}
            <span className="font-semibold text-foreground">Functional Curriculum</span>. It focuses
            on real-life skills — communication, self-care, work-readiness and independence. Because
            education should prepare our students for life, not just exams.
          </p>
        </div>
      </section>

      {/* What we do */}
      <section className="mx-auto mt-24 max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-wider text-brand">What We Do</div>
          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Four pillars, one mission</h2>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: GraduationCap, title: "Special Education", text: "Personalized learning for every mind." },
            { icon: Heart, title: "Therapies", text: "Occupational, Speech & Behavioral support." },
            { icon: Sparkles, title: "Skill Training", text: "For employment and self-reliance." },
            { icon: Users, title: "Sports Training", text: "Building confidence, discipline, champions." },
          ].map((c, i) => {
            const Icon = c.icon;
            return (
              <div
                key={c.title}
                className="reveal group rounded-3xl border border-border/60 bg-card p-6 shadow-card hover-lift"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-soft text-brand-deep transition-transform group-hover:scale-110">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Mantra Café dream */}
      <section className="mx-auto mt-24 max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="reveal grid gap-8 overflow-hidden rounded-3xl bg-[image:var(--gradient-brand)] p-8 text-primary-foreground shadow-soft sm:p-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/80">Our Dream</div>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Mantra Café</h2>
            <p className="mt-5 leading-relaxed text-primary-foreground/90">
              Our next step is to launch an inclusive café/restaurant run entirely by our students.
              Here, they won't receive charity — they will{" "}
              <span className="font-semibold">earn with pride</span> as chefs, servers and hosts.
              We believe in giving opportunity, not sympathy.
            </p>
            <p className="mt-4 italic text-primary-foreground/90">
              "Because when the world gives them a chance, our students show the world what they're
              capable of."
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <img src={facilitiesImg} alt="Facilities" className="aspect-square w-full rounded-2xl object-cover" loading="lazy" />
            <img src={initiativesImg} alt="Initiatives" className="aspect-square w-full rounded-2xl object-cover" loading="lazy" />
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="mx-auto mt-24 max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-wider text-brand">History</div>
          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Foundation milestones</h2>
        </div>
        <ol className="relative mt-10 space-y-8 border-l-2 border-brand/20 pl-16 sm:pl-20">
          {[
            { year: "2016", title: "Year of Establishment", body: "Mantra Foundation was born in Rajkot, Gujarat — built on a parent's love and a powerful belief." },
            { year: "2015", title: "Functional Curriculum", body: "Launched our research-based curriculum focused on real-life skills, not just exams." },
            { year: "2020", title: "Vocational & Sports", body: "Expanded into therapies, skill training and sports — producing para-swimming champions." },
            { year: "Today", title: "Mantra Café (Upcoming)", body: "An inclusive café where students earn with pride as chefs, servers and hosts." },
          ].map((m, i) => (
            <li key={i} className="reveal relative" style={{ transitionDelay: `${i * 80}ms` }}>
              <span
                aria-hidden
                className="absolute -left-16 top-0 grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[image:var(--gradient-brand)] text-[11px] font-bold tracking-wide text-primary-foreground shadow-soft ring-4 ring-background sm:-left-20 sm:h-16 sm:w-16 sm:text-xs"
              >
                {m.year}
              </span>
              <h3 className="font-display text-lg font-semibold leading-tight">{m.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{m.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Mission / Vision / Objectives — text-only cards (images contain duplicate content) */}
      <section className="mx-auto mt-24 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {[
            {
              icon: Target,
              title: "Mission",
              text: "To be a catalyst in providing quality education and functional skill programs that will enable the children to realize their optimal potential in academics, development of various skills, socio-emotional functions and independent living.",
            },
            {
              icon: Eye,
              title: "Vision",
              text: "To provide world-class skill based Educational and Vocational Programs that shall enable specially-abled children use their potential for independent living, academics, development of various social skills and Self Dependent livelihood in long term.",
            },
            {
              icon: Compass,
              title: "Objectives",
              text: "• To make children realize that they carry the Divine Master in the heart and are loveable and acceptable in the society.\n• To identify specific problems which are impeding the child's learning.\n• To devise methods and methodologies to overcome the reading/writing problems and problems faced in ADL (Activities of daily life).\n• To develop goals individually for each child as per their skills.\n• To setup objectives periodically to reach the desired goal for each child (Individual Educational Plan).\n• To train them appear for exams conducted by District Board / National Institute of Open Schooling (NIOS).\n• To provide the necessary corrective and rehabilitative training and aids.\n• To provide skill training (vocational training) as a part of learning and future rehabilitation, which in long term can help them in earning independent livelihood.",
            },
          ].map((c, i) => {
            const Icon = c.icon;
            return (
              <div
                key={c.title}
                className="reveal rounded-3xl border border-border/60 bg-card p-7 shadow-card hover-lift"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-soft text-brand-deep">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold">{c.title}</h3>
                <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">{c.text}</p>
              </div>
            );
          })}
        </div>
      </section>


      {/* Founders */}
      <section className="mx-auto mt-24 max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-wider text-brand">Founders</div>
          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Profile of Founders</h2>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {[founders1, founders2].map((src, i) => (
            <div key={i} className="reveal overflow-hidden rounded-3xl bg-card shadow-card" style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <img src={src} alt={`Founder ${i + 1}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
              </div>
            </div>
          ))}
        </div>
      </section>

    </Layout>
  );
}

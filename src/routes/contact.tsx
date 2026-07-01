import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { MapPin, Phone, Mail, Send, Instagram, Youtube, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Mantra Foundation — Rajkot, Gujarat" },
      {
        name: "description",
        content:
          "Visit, call or email Mantra Foundation in Rajkot. Connect with us on Instagram & YouTube.",
      },
      { property: "og:title", content: "Contact Mantra Foundation" },
      { property: "og:description", content: "We'd love to hear from you." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");
    const body = `Hi Mantra Foundation,%0D%0A%0D%0A${encodeURIComponent(message)}%0D%0A%0D%0A— ${encodeURIComponent(name)} (${encodeURIComponent(email)})`;
    window.location.href = `mailto:mantrafoundationrajkot@gmail.com?subject=${encodeURIComponent(
      "Website enquiry from " + name
    )}&body=${body}`;
    setSent(true);
  };

  return (
    <Layout>
      <section className="relative isolate pt-28 pb-16 sm:pt-36 sm:pb-24">
        <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <div className="text-xs font-semibold uppercase tracking-wider text-brand">Contact</div>
          <h1 className="mt-3 animate-fade-up font-display text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
            Let's <span className="gradient-text">connect</span>.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl animate-fade-up text-base text-muted-foreground sm:text-lg" style={{ animationDelay: "0.15s" }}>
            Parents, volunteers, well-wishers and partners — we welcome you.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { icon: MapPin, title: "Visit", body: "D 136, Raviratna Park Main Rd, Golden Park, Rajkot, Gujarat 360005" },
{ icon: Phone, title: "Call", body: "+91 99259 49494", href: "tel:+919925949494" },            { icon: Mail, title: "Email", body: "mantrafoundationrajkot@gmail.com", href: "mailto:mantrafoundationrajkot@gmail.com" },
          ].map((c, i) => {
            const Icon = c.icon;
            const inner = (
              <>
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-soft text-brand-deep">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="mt-4 font-display text-lg font-semibold">{c.title}</div>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground break-words">{c.body}</p>
              </>
            );
            return c.href ? (
              <a
                key={c.title}
                href={c.href}
                className="reveal block rounded-3xl border border-border/60 bg-card p-6 shadow-card hover-lift"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                {inner}
              </a>
            ) : (
              <div
                key={c.title}
                className="reveal rounded-3xl border border-border/60 bg-card p-6 shadow-card hover-lift"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                {inner}
              </div>
            );
          })}
        </div>
      </section>

      {/* Form + Map */}
      <section className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="reveal rounded-3xl bg-card p-6 shadow-card sm:p-8">
            <h2 className="font-display text-2xl font-bold">Send us a message</h2>
            <p className="mt-1 text-sm text-muted-foreground">We typically reply within 1–2 business days.</p>

            {sent ? (
              <div className="mt-6 flex items-start gap-3 rounded-2xl bg-brand-soft/60 p-4 text-sm text-brand-deep">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                Your email client should have opened. If not, write to us at
                <a href="mailto:mantrafoundationrajkot@gmail.com" className="font-semibold underline">
                  mantrafoundationrajkot@gmail.com
                </a>
                .
              </div>
            ) : null}

            <form onSubmit={onSubmit} className="mt-6 grid gap-4">
              <label className="block">
                <span className="text-xs font-semibold text-foreground/80">Your name</span>
                <input
                  required
                  name="name"
                  className="mt-1 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/30"
                  placeholder="Jane Doe"
                />
              </label>
              <label className="block">
                <span className="text-xs font-semibold text-foreground/80">Email</span>
                <input
                  required
                  type="email"
                  name="email"
                  className="mt-1 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/30"
                  placeholder="you@example.com"
                />
              </label>
              <label className="block">
                <span className="text-xs font-semibold text-foreground/80">Message</span>
                <textarea
                  required
                  name="message"
                  rows={5}
                  className="mt-1 w-full resize-none rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/30"
                  placeholder="How can we help?"
                />
              </label>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[image:var(--gradient-brand)] px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-[1.02]"
              >
                <Send className="h-4 w-4" />
                Send message
              </button>
            </form>
          </div>

          <div className="reveal overflow-hidden rounded-3xl bg-card shadow-card">
            <div className="aspect-[4/3] w-full sm:aspect-square lg:aspect-[4/5]">
              <iframe
                title="Mantra Foundation on Google Maps"
                src="https://www.google.com/maps?q=D%20136%20Raviratna%20Park%20Main%20Rd%20Golden%20Park%20Rajkot%20Gujarat%20360005&output=embed"
                loading="lazy"
                className="h-full w-full border-0"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="p-6">
              <h3 className="font-display text-lg font-semibold">Connect With Us</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Follow our journey on social media.
              </p>
              <div className="mt-4 flex gap-3">
                <a
                  href="https://youtube.com/@supermom8507?si=B25falsP30uokQbF"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                  className="grid h-12 w-12 place-items-center rounded-full bg-brand-soft text-brand-deep shadow-card transition-all hover:scale-110 hover:text-accent-pink"
                >
                  <Youtube className="h-5 w-5" />
                </a>
                <a
                  href="https://www.instagram.com/mantrafoundationrajkot?igsh=MTV4azgzdmtoYmk0cQ=="
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="grid h-12 w-12 place-items-center rounded-full bg-brand-soft text-brand-deep shadow-card transition-all hover:scale-110 hover:text-accent-pink"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

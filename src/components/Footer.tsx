import { Link } from "@tanstack/react-router";
import { Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import logo from "/mantra-logo-full.png?url";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/70 bg-gradient-to-b from-brand-soft/30 to-background">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="reveal">
            <img src={logo} alt="Mantra Foundation" className="h-14 w-auto" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              An Institute for Differently Abled in Rajkot, Gujarat. 15 years of teaching one
              powerful mantra: <span className="font-semibold text-foreground">"You Can."</span>
            </p>
          </div>

          <div className="reveal">
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-brand-deep">
              Explore
            </h4>
            <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
              {[
                ["/", "Home"],
                ["/about", "About"],
                ["/books", "Books Library"],
                ["/gallery", "Gallery"],
                ["/contact", "Contact"],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="text-foreground/80 hover:text-brand-deep">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal">
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-brand-deep">
              Connect With Us
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-foreground/80">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <span>D 136, Raviratna Park Main Rd, Golden Park, Rajkot, Gujarat 360005</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-brand" />
<                 a href="tel:+919925949494" className="hover:text-brand-deep">+91 99259 49494</a>              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-brand" />
                <a
                  href="mailto:mantrafoundationrajkot@gmail.com"
                  className="break-all hover:text-brand-deep"
                >
                  mantrafoundationrajkot@gmail.com
                </a>
              </li>
            </ul>
            <div className="mt-5 flex gap-3">
              <a
                href="https://youtube.com/@supermom8507?si=B25falsP30uokQbF"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="grid h-11 w-11 place-items-center rounded-full bg-white text-brand-deep shadow-card transition-all hover:scale-110 hover:text-accent-pink"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/mantrafoundationrajkot?igsh=MTV4azgzdmtoYmk0cQ=="
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="grid h-11 w-11 place-items-center rounded-full bg-white text-brand-deep shadow-card transition-all hover:scale-110 hover:text-accent-pink"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Mantra Foundation. All rights reserved.</p>
          <p>Trust Registration No.: E / 10454 / Rajkot</p>
        </div>
      </div>
    </footer>
  );
}

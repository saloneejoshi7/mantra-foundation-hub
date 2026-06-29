import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import logo from "/mantra-logo-full.png?url";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/books", label: "Books" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 glass-nav">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:h-20 sm:px-6 lg:px-8">
          <Link to="/" className="flex min-w-0 items-center gap-3" aria-label="Mantra Foundation home">
            <img
              src={logo}
              alt="Mantra Foundation"
              className="h-10 w-auto shrink-0 sm:h-12"
            />
            <div className="hidden min-w-0 sm:block">
              <div className="truncate font-display text-base font-bold leading-tight text-foreground">
                Mantra Foundation
              </div>
              <div className="truncate text-[11px] font-medium text-brand">
                Empowering Through Education
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((n) => {
              const active = pathname === n.to;
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "bg-brand-soft text-brand-deep"
                      : "text-foreground/70 hover:bg-brand-soft/60 hover:text-brand-deep"
                  }`}
                >
                  {n.label}
                </Link>
              );
            })}
            <Link
              to="/contact"
              className="ml-2 rounded-full bg-[image:var(--gradient-brand)] px-5 py-2 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-[1.03]"
            >
              Get in touch
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/70 text-foreground shadow-card md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile drawer overlay */}
      {open && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-foreground/30 backdrop-blur-sm animate-fade-in"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-[82%] max-w-sm animate-slide-in-right bg-background p-6 pt-24 shadow-soft">
            <nav className="flex flex-col gap-1">
              {NAV.map((n) => {
                const active = pathname === n.to;
                return (
                  <Link
                    key={n.to}
                    to={n.to}
                    className={`rounded-2xl px-4 py-3 text-base font-semibold transition-colors ${
                      active
                        ? "bg-brand-soft text-brand-deep"
                        : "text-foreground hover:bg-brand-soft/60"
                    }`}
                  >
                    {n.label}
                  </Link>
                );
              })}
              <Link
                to="/contact"
                className="mt-4 rounded-2xl bg-[image:var(--gradient-brand)] px-5 py-3 text-center text-base font-semibold text-primary-foreground shadow-soft"
              >
                Get in touch
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

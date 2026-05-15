'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ArrowUpRight,
  Braces,
  ChevronUp,
  Code2,
  Database,
  ExternalLink,
  Facebook,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Palette,
  Phone,
  Sparkles,
  Smartphone,
} from 'lucide-react';
import {
  type MenuItem,
  getMenuItems,
  NAV_FALLBACK_ITEMS,
} from '@/services/menuService';

function isFooterPathActive(pathname: string, itemPath: string): boolean {
  const base = itemPath.replace(/\/$/, '') || '/';
  if (base === '/') return pathname === '/';
  return pathname === base || pathname.startsWith(`${base}/`);
}

const SERVICE_LABELS = [
  { label: 'Web Development', icon: Code2 },
  { label: 'Mobile Apps', icon: Smartphone },
  { label: 'UI / UX Design', icon: Palette },
  { label: 'API Development', icon: Braces },
  { label: 'Database Design', icon: Database },
];

const Footer = () => {
  const pathname = usePathname();
  const [navItems, setNavItems] = useState<MenuItem[]>(NAV_FALLBACK_ITEMS);

  useEffect(() => {
    let cancelled = false;
    getMenuItems().then((items) => {
      if (!cancelled) setNavItems(items);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const year = new Date().getFullYear();

  return (
    <footer className="relative isolate mt-auto overflow-hidden border-t border-border bg-card/40 backdrop-blur-xl dark:bg-card/30">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(100,116,139,0.09)_1px,transparent_1px),linear-gradient(to_bottom,rgba(100,116,139,0.09)_1px,transparent_1px)] bg-[length:56px_56px] dark:bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-accent/15 blur-[100px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-muted-foreground/10 blur-[90px]"
      />

      <div className="relative z-[1] mx-auto max-w-6xl px-4 pb-10 pt-14 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Brand */}
          <div className="space-y-6 lg:col-span-4">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-border bg-gradient-to-br from-accent/20 via-card to-card shadow-lg shadow-black/5 ring-1 ring-black/[0.04] dark:from-accent/25 dark:shadow-black/30 dark:ring-white/10">
                <span className="text-lg font-bold tracking-tight text-foreground">MA</span>
              </div>
              <div className="min-w-0 space-y-1">
                <p className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  <Sparkles className="h-3.5 w-3.5 text-accent" aria-hidden />
                  Studio
                </p>
                <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                  Md. Abdul Adud
                </h2>
              </div>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Building scalable interfaces, dependable APIs, and product-grade experiences—focused on clarity,
              performance, and polish.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground shadow-md shadow-accent/20 transition hover:bg-accent/90 active:scale-[0.98]"
              >
                Let&apos;s talk
                <ArrowUpRight className="h-4 w-4 opacity-90" aria-hidden />
              </Link>
              <a
                href="mailto:mdabduladud8@gmail.com"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-background/60 px-5 py-2.5 text-sm font-semibold text-foreground backdrop-blur-sm transition hover:border-accent/40 hover:bg-accent/5"
              >
                <Mail className="h-4 w-4 text-accent" aria-hidden />
                Email
              </a>
            </div>
          </div>

          {/* Navigate */}
          <div className="lg:col-span-3 lg:pt-1">
            <h3 className="mb-5 text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Navigate
            </h3>
            <nav aria-label="Footer">
              <ul className="space-y-1">
                {navItems.map((item) => {
                  const active = !item.isExternal && isFooterPathActive(pathname, item.path);
                  const linkClass =
                    'group inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm transition sm:py-1.5 ' +
                    (active
                      ? 'bg-accent/10 font-semibold text-accent'
                      : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground');

                  if (item.isExternal) {
                    return (
                      <li key={item.id}>
                        <a
                          href={item.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={linkClass}
                        >
                          <span>{item.label}</span>
                          <ExternalLink className="h-3.5 w-3.5 opacity-60 transition group-hover:opacity-100" />
                        </a>
                      </li>
                    );
                  }

                  return (
                    <li key={item.id}>
                      <Link href={item.path} className={linkClass}>
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* Services */}
          <div className="lg:col-span-2 lg:pt-1">
            <h3 className="mb-5 text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Services
            </h3>
            <ul className="space-y-2">
              {SERVICE_LABELS.map(({ label, icon: Icon }) => (
                <li
                  key={label}
                  className="flex items-center gap-2.5 rounded-lg border border-border/80 bg-muted/25 px-3 py-2 text-xs font-medium text-foreground backdrop-blur-sm dark:bg-muted/15"
                >
                  <Icon className="h-3.5 w-3.5 shrink-0 text-accent" aria-hidden />
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-5 lg:col-span-3 lg:pt-1">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Connect
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a
                  href="mailto:mdabduladud8@gmail.com"
                  className="group inline-flex items-start gap-3 rounded-xl border border-transparent px-2 py-1 transition hover:border-border hover:bg-muted/30"
                >
                  <span className="mt-0.5 inline-flex rounded-lg bg-accent/10 p-2 text-accent">
                    <Mail className="h-4 w-4" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                      Email
                    </span>
                    <span className="font-medium text-foreground underline-offset-4 group-hover:underline">
                      mdabduladud8@gmail.com
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+8801737055870"
                  className="group inline-flex items-start gap-3 rounded-xl border border-transparent px-2 py-1 transition hover:border-border hover:bg-muted/30"
                >
                  <span className="mt-0.5 inline-flex rounded-lg bg-accent/10 p-2 text-accent">
                    <Phone className="h-4 w-4" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                      Phone
                    </span>
                    <span className="font-medium text-foreground">+880 1737-055870</span>
                  </span>
                </a>
              </li>
              <li className="inline-flex items-start gap-3 px-2 py-1">
                <span className="mt-0.5 inline-flex rounded-lg bg-accent/10 p-2 text-accent">
                  <MapPin className="h-4 w-4" aria-hidden />
                </span>
                <span>
                  <span className="block text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                    Location
                  </span>
                  <span className="font-medium text-foreground">Rajshahi, Bangladesh</span>
                </span>
              </li>
            </ul>

            <div className="flex flex-wrap gap-2 pt-1">
              <a
                href="https://github.com/sopnilali"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-background/70 text-muted-foreground shadow-sm transition hover:border-accent/45 hover:bg-accent/10 hover:text-accent"
              >
                <Github className="h-[1.125rem] w-[1.125rem]" aria-hidden />
              </a>
              <a
                href="https://www.linkedin.com/in/ami-abdul-adud"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-background/70 text-muted-foreground shadow-sm transition hover:border-accent/45 hover:bg-accent/10 hover:text-accent"
              >
                <Linkedin className="h-[1.125rem] w-[1.125rem]" aria-hidden />
              </a>
              <a
                href="https://www.facebook.com/cse.wadud"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-background/70 text-muted-foreground shadow-sm transition hover:border-accent/45 hover:bg-accent/10 hover:text-accent"
              >
                <Facebook className="h-[1.125rem] w-[1.125rem]" aria-hidden />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-border pt-8 sm:flex-row sm:gap-4">
          <p className="text-center text-xs text-muted-foreground sm:text-left">
            © {year}{' '}
            <span className="font-semibold text-foreground/90">Md. Abdul Adud</span>. Crafted with care.
          </p>
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-background/80 px-4 py-2 text-xs font-semibold text-foreground shadow-sm backdrop-blur-sm transition hover:border-accent/40 hover:bg-accent/10 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <ChevronUp className="h-4 w-4" aria-hidden />
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

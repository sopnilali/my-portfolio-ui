'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ExternalLink, Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import {
  type MenuItem,
  getMenuItems,
  NAV_FALLBACK_ITEMS,
} from '@/services/menuService';

const LOGO_INITIALS = 'MA';

function isPathActive(pathname: string, menuPath: string): boolean {
  const base = menuPath.replace(/\/$/, '') || '/';
  if (base === '/') return pathname === '/';
  if (pathname === base) return true;
  return pathname.startsWith(`${base}/`);
}

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(NAV_FALLBACK_ITEMS);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let cancelled = false;
    getMenuItems().then((items) => {
      if (!cancelled && items.length > 0) {
        setMenuItems(items);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[100] transition-all duration-300 ${
          isScrolled ? 'pt-3 md:pt-4' : 'pt-4 md:pt-5'
        }`}
      >
        <nav
          className={`mx-auto flex max-w-6xl items-center justify-between gap-3 px-3 transition-[box-shadow,border-color,background-color,padding] duration-300 sm:gap-4 sm:px-5 lg:px-8 ${
            isScrolled || isMenuOpen
              ? 'rounded-2xl border border-border bg-background/90 py-2.5 shadow-lg shadow-black/5 ring-1 ring-black/[0.04] backdrop-blur-xl dark:bg-background/75 dark:shadow-black/25 dark:ring-white/10'
              : 'rounded-2xl border border-border/40 bg-background/60 py-3 backdrop-blur-md dark:bg-background/40'
          }`}
          aria-label="Main navigation"
        >
          <Link
            href="/"
            className="group flex min-w-0 shrink-0 items-center gap-2.5 sm:gap-3"
            onClick={() => setIsMenuOpen(false)}
          >
            <span
              className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-accent via-accent to-accent/80 text-[11px] font-bold tracking-tight text-accent-foreground shadow-md shadow-accent/25 ring-2 ring-accent/20 transition group-hover:shadow-lg group-hover:shadow-accent/25 sm:h-10 sm:w-10 sm:text-xs"
              aria-hidden
            >
              {LOGO_INITIALS}
            </span>
            <div className="hidden min-w-0 flex-col leading-tight sm:flex">
              <span className="truncate text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                Md. Abdul Adud
              </span>
              <span className="truncate bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-sm font-semibold text-transparent sm:text-base">
                Full Stack Developer
              </span>
            </div>
          </Link>

          <div className="hidden min-w-0 flex-1 items-center justify-center lg:flex lg:px-2">
            <div className="flex max-h-[none] max-w-[40rem] flex-wrap items-center justify-center gap-0.5 rounded-xl border border-border/80 bg-muted/50 p-1 shadow-inner backdrop-blur-sm dark:bg-muted/25">
              {menuItems.map((item) => (
                <NavMenuLink key={item.id} item={item} />
              ))}
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <Link
              href="/contact"
              className="hidden rounded-xl bg-accent px-3 py-2 text-xs font-semibold text-accent-foreground shadow-sm ring-1 ring-accent/20 transition hover:bg-accent/90 active:scale-[0.98] md:inline-flex md:px-4 md:text-sm"
            >
              Hire me
            </Link>
            <div className="rounded-xl border border-border bg-muted/50 p-0.5 backdrop-blur-sm dark:bg-muted/35">
              <ThemeToggle />
            </div>
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background text-foreground shadow-sm transition hover:border-accent/40 hover:bg-accent/5 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:hidden"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav-drawer"
            >
              <span className="sr-only">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
              {isMenuOpen ? (
                <X className="h-5 w-5" aria-hidden />
              ) : (
                <Menu className="h-5 w-5" aria-hidden />
              )}
            </button>
          </div>
        </nav>

        <div
          className={`fixed inset-0 z-[90] bg-background/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
            isMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
          }`}
          aria-hidden={!isMenuOpen}
          onClick={() => setIsMenuOpen(false)}
        />

        <div
          id="mobile-nav-drawer"
          className={`fixed right-3 top-[calc(env(safe-area-inset-top)+4.5rem)] z-[95] flex max-h-[min(78vh,calc(100dvh-7.5rem))] w-[min(19rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/15 ring-1 ring-black/[0.04] transition-[transform,opacity,visibility] duration-300 ease-out dark:bg-card/95 dark:shadow-black/50 lg:hidden ${
            isMenuOpen
              ? 'visible translate-y-0 opacity-100'
              : 'invisible -translate-y-2 opacity-0 pointer-events-none'
          }`}
          role="dialog"
          aria-modal="true"
          aria-hidden={!isMenuOpen}
        >
          <div className="border-b border-border bg-muted/40 px-4 py-3 dark:bg-muted/20">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Menu
            </p>
          </div>
          <nav className="max-h-[50vh] flex-1 overflow-y-auto overscroll-contain px-2 py-2" aria-label="Mobile navigation">
            {menuItems.map((item) => (
              <MobileNavMenuLink
                key={item.id}
                item={item}
                onNavigate={() => setIsMenuOpen(false)}
              />
            ))}
          </nav>
          <div className="border-t border-border p-3">
            <Link
              href="/contact"
              className="flex items-center justify-center rounded-xl bg-accent py-3 text-center text-sm font-semibold text-accent-foreground shadow-sm transition hover:bg-accent/90 active:scale-[0.98]"
              onClick={() => setIsMenuOpen(false)}
            >
              Hire me
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

function desktopLinkClass(active: boolean) {
  const base =
    'inline-flex items-center gap-1 rounded-lg px-3 py-2 text-[13px] font-semibold transition-all duration-200 xl:px-3.5 xl:text-sm';
  if (active) {
    return `${base} bg-background text-accent shadow-sm ring-1 ring-border dark:bg-card`;
  }
  return `${base} text-muted-foreground hover:bg-background/70 hover:text-foreground dark:hover:bg-card/80`;
}

function NavMenuLink({ item }: { item: MenuItem }) {
  const pathname = usePathname();
  const active = !item.isExternal && isPathActive(pathname, item.path);
  const cls = desktopLinkClass(active);

  if (item.isExternal) {
    return (
      <a
        href={item.path}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
      >
        {item.label}
        <ExternalLink className="h-3 w-3 shrink-0 opacity-70" aria-hidden />
      </a>
    );
  }

  return (
    <Link href={item.path} className={cls} aria-current={active ? 'page' : undefined}>
      {item.label}
    </Link>
  );
}

function MobileNavMenuLink({
  item,
  onNavigate,
}: {
  item: MenuItem;
  onNavigate: () => void;
}) {
  const pathname = usePathname();
  const active = !item.isExternal && isPathActive(pathname, item.path);
  const base =
    'mb-1 flex w-full items-center justify-between gap-2 rounded-xl px-3 py-3 text-left text-[15px] font-semibold transition-colors last:mb-0';

  if (item.isExternal) {
    return (
      <a
        href={item.path}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} text-foreground hover:bg-muted/80`}
        onClick={onNavigate}
      >
        {item.label}
        <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
      </a>
    );
  }

  return (
    <Link
      href={item.path}
      onClick={onNavigate}
      className={`${base} ${
        active
          ? 'bg-accent/12 text-accent ring-1 ring-accent/25'
          : 'text-foreground hover:bg-muted/70'
      }`}
      aria-current={active ? 'page' : undefined}
    >
      {item.label}
    </Link>
  );
}

export default Navbar;

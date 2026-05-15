'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  ArrowUpRight,
  Facebook,
  FileText,
  Github,
  Globe,
  Instagram,
  Linkedin,
  Sparkles,
  Twitter,
  Zap,
} from 'lucide-react';
import type { About, HeroSocialIcon } from '@/services/aboutService';
import {
  getHeroButtons,
  getHeroSocialLinks,
  heroAvailabilityBadge,
  heroDisplayBio,
  heroDisplayName,
  heroDisplayRole,
  heroImageAlt,
  heroImageSrc,
  heroPortfolioBadge,
  parseHeroHighlights,
} from '@/services/aboutService';

function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

function HeroSocialIconGlyph({ icon }: { icon: HeroSocialIcon }) {
  const c = 'h-[1.125rem] w-[1.125rem] shrink-0';
  switch (icon) {
    case 'github':
      return <Github className={c} aria-hidden />;
    case 'linkedin':
      return <Linkedin className={c} aria-hidden />;
    case 'facebook':
      return <Facebook className={c} aria-hidden />;
    case 'twitter':
      return <Twitter className={c} aria-hidden />;
    case 'instagram':
      return <Instagram className={c} aria-hidden />;
    default:
      return <Globe className={c} aria-hidden />;
  }
}

function HeroPortraitImage({
  src,
  alt,
  showBlockingSkeleton,
}: {
  src: string;
  alt: string;
  showBlockingSkeleton: boolean;
}) {
  const [loaded, setLoaded] = useState(false);
  const showOverlay = showBlockingSkeleton || !loaded;

  return (
    <div className="relative aspect-[4/5] w-full max-h-[min(72vh,520px)] min-h-[280px] bg-muted sm:min-h-[360px]">
      {showOverlay ? (
        <div className="absolute inset-0 z-[1] animate-pulse bg-gradient-to-r from-muted via-muted-foreground/10 to-muted">
          <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-background/35 to-transparent" />
        </div>
      ) : null}
      <Image
        src={src}
        alt={alt}
        fill
        priority
        className={`object-cover object-top transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        sizes="(max-width: 1024px) 100vw, 42vw"
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/[0.05] dark:ring-white/[0.06]"
      />
    </div>
  );
}

interface HeroSectionProps {
  about: About | null;
}

const HeroSection = ({ about }: HeroSectionProps) => {
  const isDataLoading = !about;

  const displayName = heroDisplayName(about);
  const displayRole = heroDisplayRole(about);
  const displayBio = heroDisplayBio(about);
  const imageSrc = heroImageSrc(about);
  const imageAlt = heroImageAlt(about);
  const portfolioBadge = heroPortfolioBadge(about);
  const availabilityBadge = heroAvailabilityBadge(about);
  const highlights = parseHeroHighlights(about);
  const heroButtons = getHeroButtons(about);
  const socialLinks = getHeroSocialLinks(about);

  const ctaClassPrimary =
    'inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/25 transition hover:bg-accent/90 hover:shadow-xl hover:shadow-accent/20 active:scale-[0.98] sm:w-auto';

  const ctaClassSecondary =
    'inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-background/80 px-6 py-3.5 text-sm font-semibold text-foreground backdrop-blur-sm transition hover:border-accent/40 hover:bg-accent/5 hover:text-accent active:scale-[0.98] sm:w-auto';

  return (
    <section className="relative isolate overflow-hidden bg-background pb-20 pt-[5.25rem] md:pb-28 md:pt-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(100,116,139,0.09)_1px,transparent_1px),linear-gradient(to_bottom,rgba(100,116,139,0.09)_1px,transparent_1px)] bg-[length:48px_48px] dark:bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-0 h-[28rem] w-[28rem] rounded-full bg-accent/20 blur-[100px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 left-[10%] h-[22rem] w-[22rem] rounded-full bg-muted-foreground/10 blur-[90px]"
      />

      <div className="relative z-[1] mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <div className="order-2 space-y-8 lg:order-1">
            <div className="inline-flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground shadow-sm">
                <Sparkles className="h-3.5 w-3.5 text-accent" aria-hidden />
                {portfolioBadge}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-900 dark:text-emerald-100">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-55" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                {availabilityBadge}
              </span>
            </div>

            {isDataLoading ? (
              <div className="space-y-5">
                <div className="h-14 w-[90%] max-w-xl animate-pulse rounded-xl bg-muted sm:h-16" />
                <div className="h-10 w-2/3 animate-pulse rounded-lg bg-muted" />
                <div className="space-y-2 pt-2">
                  <div className="h-4 w-full animate-pulse rounded bg-muted" />
                  <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
                </div>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  <h1 className="text-[2.125rem] font-bold tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
                    <span className="bg-gradient-to-r from-foreground via-accent to-muted-foreground bg-clip-text text-transparent dark:via-accent">
                      {displayName}
                    </span>
                  </h1>
                  <p className="flex flex-wrap items-center gap-2 text-lg font-medium text-muted-foreground sm:text-xl">
                    <Zap className="h-5 w-5 shrink-0 text-accent" aria-hidden />
                    <span>{displayRole}</span>
                  </p>
                  <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-[1.05rem] sm:leading-relaxed">
                    {displayBio}
                  </p>
                </div>

                <ul className="flex flex-wrap gap-2">
                  {highlights.map((item) => (
                    <li
                      key={item}
                      className="rounded-lg border border-border bg-muted/50 px-3 py-1.5 text-xs font-semibold text-foreground/90 backdrop-blur-sm dark:bg-muted/30"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </>
            )}

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              {heroButtons.map((button, index) => {
                const ext = isExternalHref(button.link);
                const className = button.primary ? ctaClassPrimary : ctaClassSecondary;
                const content = (
                  <>
                    <span>{button.text}</span>
                    {button.primary ? (
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    ) : (
                      <FileText className="h-4 w-4 opacity-90" aria-hidden />
                    )}
                  </>
                );
                const btnKey = `${button.text}-${button.link}-${index}`;

                if (ext) {
                  return (
                    <a
                      key={btnKey}
                      href={button.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={className}
                    >
                      {content}
                      <ArrowUpRight className="-ml-1 h-4 w-4 opacity-70" aria-hidden />
                    </a>
                  );
                }

                return (
                  <Link key={btnKey} href={button.link} className={className}>
                    {content}
                  </Link>
                );
              })}
            </div>

            <div className="border-t border-border pt-8">
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                Connect
              </p>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground shadow-sm transition hover:border-accent/40 hover:bg-accent/10 hover:text-accent"
                  >
                    <HeroSocialIconGlyph icon={link.icon} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="relative order-1 lg:order-2 lg:justify-self-end">
            <div
              aria-hidden
              className="absolute -left-10 top-12 hidden h-40 w-40 rounded-[2rem] border border-accent/25 bg-accent/10 blur-2xl md:block"
            />
            <div
              aria-hidden
              className="absolute -bottom-8 -right-6 h-48 w-48 rounded-full bg-accent/15 blur-[64px]"
            />

            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div
                aria-hidden
                className="absolute inset-0 -rotate-6 rounded-[2rem] bg-gradient-to-br from-accent/20 via-transparent to-transparent opacity-70"
              />
              <div className="relative overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-2xl shadow-black/10 ring-1 ring-black/[0.04] dark:bg-card/80 dark:shadow-black/40 dark:ring-white/10">
                <div className="border-b border-border bg-muted/40 px-4 py-3 dark:bg-muted/20">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-red-400/90" />
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-amber-400/90" />
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-400/90" />
                    <span className="ml-3 flex-1 truncate rounded-md bg-background/80 py-1 text-center text-[10px] font-medium tracking-wide text-muted-foreground dark:bg-background/40">
                      profile.preview — live
                    </span>
                  </div>
                </div>

                <HeroPortraitImage
                  key={imageSrc}
                  src={imageSrc}
                  alt={imageAlt}
                  showBlockingSkeleton={isDataLoading}
                />

                <div className="flex items-center justify-between gap-3 border-t border-border bg-card/95 px-4 py-3 dark:bg-card/60">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-foreground">
                      {displayName}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {isDataLoading ? 'Loading profile…' : displayRole}
                    </p>
                  </div>
                  <Link
                    href="/contact"
                    className="shrink-0 rounded-lg bg-accent px-3 py-1.5 text-xs font-bold text-accent-foreground shadow-sm transition hover:bg-accent/90"
                  >
                    Hire
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

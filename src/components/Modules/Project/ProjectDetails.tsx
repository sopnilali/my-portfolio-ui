import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  Clock,
  ExternalLink,
  Github,
  LayoutGrid,
  Server,
  Sparkles,
  FolderSearch,
} from 'lucide-react';
import type { IProject } from '@/components/Types/project.type';

interface ProjectDetailsProps {
  project: IProject | null;
}

function isValidImageSrc(src: unknown): src is string {
  return typeof src === 'string' && src.trim().length > 0;
}

function isValidHttpUrl(href: string | undefined): boolean {
  if (!href?.trim()) return false;
  try {
    const u = new URL(href.trim());
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
}

function looksLikeHtml(text: string): boolean {
  return /<\/?[a-z][\s\S]*>/i.test(text);
}

function formatDate(iso?: string): string | null {
  if (!iso?.trim()) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function statusPillClass(status: string): string {
  const s = status.toLowerCase();
  if (
    s.includes('complete') ||
    s.includes('done') ||
    s.includes('live') ||
    s.includes('shipped')
  ) {
    return 'border-emerald-500/30 bg-emerald-500/12 text-emerald-800 dark:text-emerald-100';
  }
  if (
    s.includes('progress') ||
    s.includes('ongoing') ||
    s.includes('active') ||
    s.includes('build')
  ) {
    return 'border-amber-500/30 bg-amber-500/12 text-amber-950 dark:text-amber-50';
  }
  return 'border-border bg-muted/80 text-muted-foreground';
}

const ProjectDetails = ({ project }: ProjectDetailsProps) => {
  if (!project) {
    return (
      <section className="relative min-h-[70vh] overflow-hidden bg-background pb-16 pt-24">
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-24 h-72 w-72 rounded-full bg-accent/10 blur-[100px]"
        />
        <div className="relative z-[1] mx-auto flex max-w-lg flex-col items-center px-6 py-20 text-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-card shadow-sm">
            <FolderSearch className="h-8 w-8 text-muted-foreground" aria-hidden />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Project not found
          </h1>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            This project may have been removed or the link is incorrect.
          </p>
          <Link
            href="/project"
            className="mt-8 inline-flex items-center gap-2 rounded-xl border border-border bg-muted/70 px-5 py-2.5 text-sm font-semibold text-foreground backdrop-blur-sm transition-colors hover:border-accent/40 hover:bg-accent/10 hover:text-accent dark:bg-muted/40"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to projects
          </Link>
        </div>
      </section>
    );
  }

  const imageSrc = isValidImageSrc(project.imageUrl)
    ? project.imageUrl.trim()
    : null;
  const statusLabel = project.status?.trim() || 'Project';
  const statusClass = statusPillClass(statusLabel);
  const showFrontend = isValidHttpUrl(project.frontendrepoUrl);
  const showBackend = isValidHttpUrl(project.backendrepoUrl);
  const showLive = isValidHttpUrl(project.liveUrl);
  const updatedFmt = formatDate(project.updatedAt);
  const createdFmt = formatDate(project.createdAt);
  const descHtml = looksLikeHtml(project.description);

  return (
    <article className="relative overflow-hidden bg-white pb-20 pt-24 dark:bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-28 top-0 h-[28rem] w-[28rem] rounded-full bg-accent/[0.07] blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-[22rem] w-[22rem] rounded-full bg-muted-foreground/[0.06] blur-[100px]"
      />

      <div className="relative z-[1] mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Back */}
        <div className="mb-8">
          <Link
            href="/project"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
            All projects
          </Link>
        </div>

        {/* Title block */}
        <header className="mb-10 max-w-4xl space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest ${statusClass}`}
            >
              {statusLabel}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              <Sparkles className="h-3 w-3 text-accent" aria-hidden />
              Case study
            </span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-[3.25rem] md:leading-[1.1]">
            <span className="bg-gradient-to-r from-foreground via-accent to-muted-foreground bg-clip-text text-transparent dark:via-accent">
              {project.title}
            </span>
          </h1>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2 font-medium">
              <Clock className="h-4 w-4 text-accent" aria-hidden />
              {project.duration || 'Timeline TBD'}
            </span>
            {updatedFmt ? (
              <span className="inline-flex items-center gap-2">
                <Calendar className="h-4 w-4 text-accent" aria-hidden />
                Updated {updatedFmt}
                {createdFmt && createdFmt !== updatedFmt ? (
                  <span className="text-muted-foreground/70">
                    · First built {createdFmt}
                  </span>
                ) : null}
              </span>
            ) : createdFmt ? (
              <span className="inline-flex items-center gap-2">
                <Calendar className="h-4 w-4 text-accent" aria-hidden />
                {createdFmt}
              </span>
            ) : null}
          </div>
        </header>

        {/* Hero media */}
        <div className="relative mb-12 overflow-hidden rounded-2xl border border-border bg-muted shadow-xl shadow-black/[0.06] ring-1 ring-black/[0.04] dark:shadow-black/40 dark:ring-white/10">
          <div className="relative aspect-[21/9] min-h-[220px] w-full md:min-h-[300px]">
            {imageSrc ? (
              <>
                <Image
                  src={imageSrc}
                  alt={project.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1200px) 100vw, 1152px"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30 dark:from-background dark:via-transparent"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 ring-1 ring-inset ring-black/[0.06] dark:ring-white/[0.08]"
                />
              </>
            ) : (
              <div className="flex h-full min-h-[220px] w-full flex-col items-center justify-center gap-4 bg-gradient-to-br from-muted via-muted to-accent/15 px-8 text-center md:min-h-[300px]">
                <LayoutGrid
                  className="h-16 w-16 text-accent/35 dark:text-accent/45"
                  aria-hidden
                />
                <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  No showcase image
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Two columns */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-8 lg:col-span-8">
            <section className="rounded-2xl border border-border bg-card/90 p-6 shadow-sm backdrop-blur-sm dark:bg-card/60 sm:p-8">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                <span className="inline-block h-8 w-1 rounded-full bg-accent" aria-hidden />
                Overview
              </h2>
              {!project.description?.trim() ? (
                <p className="text-sm text-muted-foreground">No overview provided.</p>
              ) : descHtml ? (
                <div
                  className="blog-content max-w-none text-[15px] leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: project.description,
                  }}
                />
              ) : (
                <div className="text-[15px] leading-relaxed text-muted-foreground">
                  {project.description.split('\n').map((line, index) => (
                    <p key={`${index}-${line.slice(0, 12)}`} className="mb-3 last:mb-0">
                      {line || '\u00a0'}
                    </p>
                  ))}
                </div>
              )}
            </section>

            <section className="rounded-2xl border border-border bg-card/90 p-6 shadow-sm backdrop-blur-sm dark:bg-card/60 sm:p-8">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                <span className="inline-block h-8 w-1 rounded-full bg-accent" aria-hidden />
                Tech stack
              </h2>
              {(project.technology?.length ?? 0) > 0 ? (
                <ul className="flex flex-wrap gap-2">
                  {(project.technology ?? []).map((tech: string) => (
                    <li key={tech}>
                      <span className="inline-flex rounded-lg border border-border bg-muted/50 px-3 py-1.5 text-sm font-medium text-foreground backdrop-blur-sm transition-colors hover:border-accent/30 hover:bg-accent/5 dark:bg-muted/30">
                        {tech}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">No tech stack listed.</p>
              )}
            </section>
          </div>

          <aside className="space-y-6 lg:col-span-4">
            <div className="lg:sticky lg:top-28 lg:space-y-6">
              <div className="rounded-2xl border border-border bg-card/95 p-6 shadow-sm backdrop-blur-md dark:bg-card/70">
                <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  Launch
                </h3>
                {showLive ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/live flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3.5 text-center text-sm font-semibold text-accent-foreground shadow-md transition-all hover:bg-accent/90 hover:shadow-lg active:scale-[0.98]"
                  >
                    Open live demo
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover/live:translate-x-0.5 group-hover/live:-translate-y-0.5" />
                  </a>
                ) : (
                  <p className="rounded-xl border border-dashed border-border bg-muted/30 px-4 py-3 text-center text-sm text-muted-foreground">
                    No public demo linked for this project.
                  </p>
                )}
              </div>

              {(showFrontend || showBackend) && (
                <div className="rounded-2xl border border-border bg-card/95 p-6 shadow-sm backdrop-blur-md dark:bg-card/70">
                  <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                    Source
                  </h3>
                  <div className="flex flex-col gap-2">
                    {showFrontend ? (
                      <a
                        href={project.frontendrepoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 rounded-xl border border-border bg-background/80 px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent/35 hover:bg-accent/10 hover:text-accent dark:bg-background/40"
                      >
                        <Github className="h-5 w-5 shrink-0" aria-hidden />
                        Frontend repo
                        <ExternalLink className="ml-auto h-3.5 w-3.5 opacity-60" aria-hidden />
                      </a>
                    ) : null}
                    {showBackend ? (
                      <a
                        href={project.backendrepoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 rounded-xl border border-border bg-background/80 px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent/35 hover:bg-accent/10 hover:text-accent dark:bg-background/40"
                      >
                        <Server className="h-5 w-5 shrink-0" aria-hidden />
                        Backend repo
                        <ExternalLink className="ml-auto h-3.5 w-3.5 opacity-60" aria-hidden />
                      </a>
                    ) : null}
                  </div>
                </div>
              )}

              <div className="rounded-2xl border border-dashed border-border bg-muted/40 p-6 dark:bg-muted/20">
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Need the full story behind architecture or deployment? Mention this
                  project when you&nbsp;
                  <Link
                    href="/contact"
                    className="font-semibold text-accent underline-offset-4 hover:underline"
                  >
                    get in touch
                  </Link>
                  .
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
};

export default ProjectDetails;

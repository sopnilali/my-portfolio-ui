import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Clock,
  ExternalLink,
  Github,
  LayoutGrid,
  Server,
} from 'lucide-react';
import type { IProject } from '@/components/Types/project.type';

function isValidImageSrc(src: unknown): src is string {
  return typeof src === 'string' && src.trim().length > 0;
}

function stripHtml(html: string): string {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function excerpt(text: string, maxLen = 130): string {
  const t = stripHtml(text).trim();
  if (t.length <= maxLen) return t;
  return `${t.slice(0, maxLen).trim()}…`;
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

function statusPillClass(status: string): string {
  const s = status.toLowerCase();
  if (
    s.includes('complete') ||
    s.includes('done') ||
    s.includes('live') ||
    s.includes('shipped')
  ) {
    return 'border-emerald-500/25 bg-emerald-500/12 text-emerald-800 dark:text-emerald-200';
  }
  if (
    s.includes('progress') ||
    s.includes('ongoing') ||
    s.includes('active') ||
    s.includes('build')
  ) {
    return 'border-amber-500/25 bg-amber-500/12 text-amber-900 dark:text-amber-100';
  }
  return 'border-border bg-muted/80 text-muted-foreground';
}

const ProjectCard = ({
  project,
  index = 0,
}: {
  project: IProject;
  index?: number;
}) => {
  const detailHref = `/project/${project.id}`;
  const imageSrc = isValidImageSrc(project.imageUrl)
    ? project.imageUrl.trim()
    : null;
  const blurb = excerpt(project.description);
  const showFrontend = isValidHttpUrl(project.frontendrepoUrl);
  const showBackend = isValidHttpUrl(project.backendrepoUrl);
  const showLive = isValidHttpUrl(project.liveUrl);
  const statusLabel = project.status?.trim() || 'Project';

  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card/95 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/35 hover:shadow-lg hover:shadow-accent/5 dark:bg-card/75"
      data-aos="fade-up"
      data-aos-delay={index * 100}
    >
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-muted">
        <Link
          href={detailHref}
          className="relative block h-full min-h-[11rem] w-full sm:min-h-[12.5rem]"
        >
          {imageSrc ? (
            <>
              <Image
                src={imageSrc}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-transparent opacity-90 transition-opacity duration-300 group-hover:from-background/92"
              />
              <div
                aria-hidden
                className="absolute inset-0 ring-1 ring-inset ring-black/[0.06] dark:ring-white/10"
              />
            </>
          ) : (
            <div className="flex h-full min-h-[11rem] w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-muted via-muted to-accent/15 px-6 text-center transition-colors group-hover:to-accent/25 sm:min-h-[12.5rem]">
              <LayoutGrid
                className="h-12 w-12 text-accent/40 dark:text-accent/50"
                aria-hidden
              />
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Preview
              </span>
            </div>
          )}
        </Link>

        <span
          className={`absolute left-3 top-3 inline-flex max-w-[70%] items-center truncate rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest shadow-sm backdrop-blur-sm ${statusPillClass(statusLabel)}`}
          title={statusLabel}
        >
          {statusLabel}
        </span>
        <span className="absolute right-3 top-3 inline-flex items-center rounded-full bg-background/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-accent shadow-sm backdrop-blur-sm dark:bg-background/60">
          Case study
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-between gap-4 p-5 sm:p-6">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-muted-foreground">
            <span className="inline-flex items-center gap-1.5 text-foreground">
              <Clock className="h-3.5 w-3.5 shrink-0 text-accent" aria-hidden />
              {project.duration || 'Timeline TBD'}
            </span>
          </div>

          <Link href={detailHref} className="block">
            <h3 className="text-lg font-bold leading-snug tracking-tight text-foreground transition-colors duration-200 group-hover:text-accent sm:text-xl">
              {project.title}
            </h3>
          </Link>

          {blurb ? (
            <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
              {blurb}
            </p>
          ) : null}

          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {project.technology.slice(0, 6).map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-border bg-muted/60 px-2 py-0.5 text-[11px] font-medium text-muted-foreground backdrop-blur-sm transition-colors group-hover:border-accent/20 group-hover:text-foreground"
              >
                {tech}
              </span>
            ))}
            {project.technology.length > 6 ? (
              <span className="rounded-md border border-dashed border-border px-2 py-0.5 text-[11px] text-muted-foreground">
                +{project.technology.length - 6}
              </span>
            ) : null}
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-1">
            {showFrontend ? (
              <a
                href={project.frontendrepoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-transparent text-muted-foreground transition-colors hover:border-border hover:bg-muted hover:text-foreground"
                aria-label="Frontend repository"
              >
                <Github className="h-4 w-4" />
              </a>
            ) : null}
            {showBackend ? (
              <a
                href={project.backendrepoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-transparent text-muted-foreground transition-colors hover:border-border hover:bg-muted hover:text-foreground"
                aria-label="Backend repository"
              >
                <Server className="h-4 w-4" />
              </a>
            ) : null}
            {showLive ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-transparent text-muted-foreground transition-colors hover:border-accent/35 hover:bg-accent/10 hover:text-accent"
                aria-label="Live demo"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            ) : null}
            {!showFrontend && !showBackend && !showLive ? (
              <span className="text-xs text-muted-foreground">
                Links available on detail page
              </span>
            ) : null}
          </div>

          <Link
            href={detailHref}
            className="group/btn inline-flex items-center justify-center gap-2 self-start rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground shadow-sm transition-all duration-200 hover:bg-accent/90 hover:shadow-md active:scale-[0.98] sm:self-auto"
          >
            View details
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;

import React from 'react';
import Image from 'next/image';
import { Code2 } from 'lucide-react';
import type { Skill } from '@/services/skillService';

function isValidImageSrc(src: unknown): src is string {
  return typeof src === 'string' && src.trim().length > 0;
}

export function SkillCard({
  skill,
  index = 0,
}: {
  skill: Skill;
  index?: number;
}) {
  const src = isValidImageSrc(skill.icon) ? skill.icon.trim() : null;

  return (
    <article
      className="group relative flex flex-col items-center gap-4 overflow-hidden rounded-2xl border border-border bg-card/90 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/35 hover:shadow-lg hover:shadow-accent/5 dark:bg-card/70 sm:p-7"
      data-aos="fade-up"
      data-aos-delay={Math.min(index * 40, 400)}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-accent/10 opacity-60 blur-2xl transition-opacity duration-300 group-hover:opacity-90"
      />
      <div className="relative z-[1]">
        <div
          className="relative mx-auto flex h-[4.25rem] w-[4.25rem] shrink-0 items-center justify-center rounded-2xl border border-border/80 bg-gradient-to-br from-muted via-muted to-accent/15 p-[0.65rem] shadow-inner ring-1 ring-black/[0.04] transition-all duration-300 group-hover:to-accent/25 dark:ring-white/[0.06]"
        >
          {src ? (
            <div className="relative h-full w-full">
              <Image
                src={src}
                alt={skill.name}
                fill
                className="object-contain transition-transform duration-300 group-hover:scale-110"
                sizes="72px"
              />
            </div>
          ) : (
            <Code2
              className="h-9 w-9 text-accent/50 dark:text-accent/60"
              aria-hidden
            />
          )}
          <span className="absolute -bottom-1 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-accent/40 opacity-60 transition-all duration-300 group-hover:w-12 group-hover:opacity-100" />
        </div>
      </div>

      <h3 className="relative z-[1] text-center text-sm font-semibold leading-snug tracking-tight text-foreground transition-colors duration-200 group-hover:text-accent sm:text-base">
        <span className="line-clamp-2">{skill.name}</span>
      </h3>
    </article>
  );
}

export function SkillCardSkeleton({ index = 0 }: { index?: number }) {
  return (
    <div
      className="flex animate-pulse flex-col items-center gap-4 rounded-2xl border border-border bg-muted/40 p-6 sm:p-7"
      data-aos="fade-up"
      data-aos-delay={Math.min(index * 40, 400)}
    >
      <div className="relative h-[4.25rem] w-[4.25rem] overflow-hidden rounded-2xl border border-border bg-muted">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/35 to-transparent animate-shimmer" />
      </div>
      <div className="h-4 w-24 rounded-md bg-muted" />
    </div>
  );
}

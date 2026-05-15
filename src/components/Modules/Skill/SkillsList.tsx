import React from 'react';
import Link from 'next/link';
import { ArrowRight, Layers3, Sparkles } from 'lucide-react';
import type { Skill } from '@/services/skillService';
import { SkillCard, SkillCardSkeleton } from './SkillCard';

const PREVIEW_MAX = 12;

interface SkillsListProps {
  skills: Skill[];
}

const SkillsList = ({ skills }: SkillsListProps) => {
  const hasSkills = skills.length > 0;
  const preview = hasSkills ? skills.slice(0, PREVIEW_MAX) : [];
  const hasMore = skills.length > PREVIEW_MAX;

  return (
    <section className="relative overflow-hidden bg-white py-14 dark:bg-background sm:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/4 top-0 h-72 w-[28rem] -translate-x-1/2 rounded-full bg-accent/[0.085] blur-[110px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 right-0 h-72 w-72 rounded-full bg-muted-foreground/[0.06] blur-[96px]"
      />

      <div className="relative z-[1] mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
          <p
            className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground"
            data-aos="fade-down"
          >
            <Sparkles className="h-3.5 w-3.5 text-accent" aria-hidden />
            Stack
          </p>
          <h2
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-[2.75rem]"
            data-aos="fade-up"
          >
            Skills &amp;
            {' '}
            <span className="bg-gradient-to-r from-foreground via-accent to-muted-foreground bg-clip-text text-transparent dark:via-accent">
              tooling
            </span>
          </h2>
          <div
            className="mx-auto mt-4 h-1 w-14 rounded-full bg-accent"
            data-aos="zoom-in"
            data-aos-delay="80"
          />
          <p
            className="mt-4 text-sm text-muted-foreground sm:text-base"
            data-aos="fade-up"
            data-aos-delay="120"
          >
            Languages, frameworks, and platforms I use to design, build, and ship
            products end to end.
          </p>
        </header>

        {!hasSkills ? (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {[...Array(12)].map((_, index) => (
              <SkillCardSkeleton key={index} index={index} />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
              {preview.map((skill, index) => (
                <SkillCard
                  key={skill.id ?? skill.name}
                  skill={skill}
                  index={index}
                />
              ))}
            </div>

            {hasMore ? (
              <div className="mt-10 flex justify-center md:mt-12">
                <Link
                  href="/skill"
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-muted/80 px-5 py-2.5 text-sm font-semibold text-foreground backdrop-blur-sm transition-colors duration-200 hover:border-accent/40 hover:bg-accent/10 hover:text-accent dark:bg-muted/50"
                  data-aos="fade-up"
                >
                  <Layers3 className="h-4 w-4" aria-hidden />
                  View all {skills.length} skills
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            ) : null}
          </>
        )}
      </div>
    </section>
  );
};

export default SkillsList;

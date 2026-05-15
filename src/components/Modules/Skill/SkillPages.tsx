import React from 'react';
import { Layers3, Wrench } from 'lucide-react';
import type { Skill } from '@/services/skillService';
import { SkillCard } from './SkillCard';

interface SkillPagesProps {
  skills: Skill[];
}

const SkillPages = ({ skills }: SkillPagesProps) => {
  const hasSkills = skills.length > 0;

  return (
    <section className="relative min-h-[60vh] overflow-hidden bg-white py-14 dark:bg-background sm:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-16 h-[26rem] w-[26rem] rounded-full bg-accent/[0.08] blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-12 left-0 h-64 w-[22rem] rounded-full bg-muted-foreground/[0.055] blur-[100px]"
      />

      <div className="relative z-[1] mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <p
            className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground"
            data-aos="fade-down"
          >
            <Wrench className="h-3.5 w-3.5 text-accent" aria-hidden />
            Capabilities
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-[2.85rem]">
            Full{' '}
            <span className="bg-gradient-to-r from-foreground via-accent to-muted-foreground bg-clip-text text-transparent dark:via-accent">
              skill matrix
            </span>
          </h1>
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
            Everything loaded from your API—from core languages to delivery and
            DevOps—you get a dense, glanceable overview of the toolchain.
          </p>
        </header>

        {!hasSkills ? (
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border bg-muted/30 px-8 py-16 text-center dark:bg-muted/15">
            <Layers3 className="h-12 w-12 text-muted-foreground/45" aria-hidden />
            <p className="text-base font-medium text-foreground">
              No skills loaded yet
            </p>
            <p className="max-w-md text-sm text-muted-foreground">
              When your backend returns skill records, each one appears here as a card
              with icon and label.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 sm:gap-5">
            {skills.map((skill, index) => (
              <SkillCard
                key={skill.id ?? skill.name}
                skill={skill}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SkillPages;

'use client';

import React from 'react';
import type { Experience } from '@/services/experienceService';
import {
  BriefcaseBusiness,
  CalendarDays,
  GraduationCap,
  Sparkles,
} from 'lucide-react';

interface ExperienceAndEducationListProps {
  experiences: Experience[];
}

interface EducationItem {
  degree: string;
  institution: string;
  startDate: string;
  endDate: string;
  description: string;
}

function formatExperiencePeriod(startDate?: string, endDate?: string): string {
  const start = startDate
    ? new Date(startDate).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      })
    : '';
  const hasEnd = endDate != null && String(endDate).trim() !== '';
  const end = hasEnd
    ? new Date(endDate!).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      })
    : 'Present';
  return `${start} - ${end}`;
}

function formatEducationYears(startDate: string, endDate: string): string {
  return `${new Date(startDate).toLocaleDateString('en-US', { year: 'numeric' })} — ${new Date(endDate).toLocaleDateString('en-US', { year: 'numeric' })}`;
}

type RailVariant = 'primary' | 'secondary';

function TimelineRail({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant: RailVariant;
}) {
  const linePrimary =
    'from-accent/70 via-accent/35 to-accent/5 dark:from-accent/60 dark:via-accent/28 dark:to-transparent';
  const lineSecondary =
    'from-muted-foreground/55 via-muted-foreground/22 to-muted-foreground/5 dark:from-muted-foreground/45 dark:via-muted-foreground/18 dark:to-transparent';

  return (
    <div className="relative">
      <div
        aria-hidden
        className={`pointer-events-none absolute bottom-10 left-[22px] top-10 hidden w-[2px] rounded-full bg-gradient-to-b md:block ${variant === 'primary' ? linePrimary : lineSecondary}`}
      />
      <div className="relative space-y-8 md:space-y-10">{children}</div>
    </div>
  );
}

function EducationCard({ item }: { item: EducationItem }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-card/95 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/35 hover:shadow-md dark:bg-card/80">
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 w-1 rounded-l-2xl bg-gradient-to-b from-accent via-accent to-accent/70"
      />
      <div
        aria-hidden
        className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-accent/10 blur-3xl transition-opacity duration-500 group-hover:bg-accent/[0.14]"
      />

      <div className="relative flex flex-wrap items-center gap-2 gap-y-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-foreground backdrop-blur-sm dark:border-accent/30 dark:bg-accent/15">
          <CalendarDays
            className="h-3.5 w-3.5 text-accent"
            aria-hidden
          />
          {formatEducationYears(item.startDate, item.endDate)}
        </span>
        <span className="hidden items-center gap-1 text-xs font-medium text-muted-foreground sm:inline-flex">
          <Sparkles className="h-3.5 w-3.5 text-accent" aria-hidden />
          Academic
        </span>
      </div>

      <h4 className="relative mt-4 text-xl font-bold tracking-tight text-foreground">
        {item.degree}
      </h4>
      <p className="relative mt-1 text-base font-medium text-muted-foreground">
        {item.institution}
      </p>
      <p className="relative mt-3 text-sm leading-relaxed text-muted-foreground">
        {item.description}
      </p>
    </div>
  );
}

function ExperienceCard({ item }: { item: Experience }) {
  const isPresent =
    item.endDate == null || String(item.endDate).trim() === '';

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-background/95 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-muted-foreground/25 hover:shadow-md dark:bg-background/55">
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 w-1 rounded-l-2xl bg-gradient-to-b from-muted-foreground/80 via-muted-foreground/55 to-accent/65"
      />
      <div
        aria-hidden
        className="absolute -right-10 top-0 h-32 w-32 rounded-full bg-muted-foreground/[0.07] blur-3xl transition-opacity group-hover:bg-accent/10 dark:bg-accent/5"
      />

      <div className="relative flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 text-xs font-semibold uppercase tracking-wider text-foreground backdrop-blur-sm dark:border-border dark:bg-muted/80">
          <CalendarDays className="h-3.5 w-3.5 text-accent" aria-hidden />
          {formatExperiencePeriod(item.startDate, item.endDate)}
        </span>
        {isPresent && (
          <span className="inline-flex items-center rounded-full border border-accent/35 bg-accent/12 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-accent dark:border-accent/40 dark:bg-accent/18">
            Current
          </span>
        )}
      </div>

      <h4 className="relative mt-4 text-xl font-bold tracking-tight text-foreground">
        {item.position ?? 'Role'}
      </h4>
      <p className="relative mt-1 text-base font-medium text-muted-foreground">
        {item.company ?? ''}
      </p>
      {item.description && (
        <p className="relative mt-3 text-sm leading-relaxed text-muted-foreground">
          {item.description}
        </p>
      )}
    </div>
  );
}

function TimelineMarker({
  variant,
  icon: Icon,
  isLast,
}: {
  variant: RailVariant;
  icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>;
  isLast: boolean;
}) {
  const dotPrimary =
    'bg-accent text-accent-foreground shadow-lg shadow-accent/30 ring-accent/25 dark:ring-accent/35';
  const dotSecondary =
    'bg-muted-foreground text-background shadow-md ring-muted-foreground/30 dark:bg-muted-foreground dark:text-background dark:ring-muted-foreground/25';

  const linePrimary = 'from-accent/50 to-accent/5 dark:from-accent/40';
  const lineSecondary =
    'from-muted-foreground/45 to-muted-foreground/[0.08] dark:from-muted-foreground/38';

  return (
    <div className="flex gap-0 md:w-14 md:flex-shrink-0 md:flex-col md:items-center">
      <div
        className={`relative z-[1] flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl ring-4 ring-background dark:ring-background ${variant === 'primary' ? dotPrimary : dotSecondary}`}
      >
        <Icon className="h-5 w-5" aria-hidden />
      </div>
      {!isLast && (
        <div
          aria-hidden
          className={`mx-auto mt-2 hidden min-h-[2rem] w-[2px] flex-1 rounded-full bg-gradient-to-b md:block ${variant === 'primary' ? linePrimary : lineSecondary}`}
        />
      )}
    </div>
  );
}

const ExperienceAndEducationList = ({
  experiences,
}: ExperienceAndEducationListProps) => {
  const educationData: EducationItem[] = [
    {
      degree: 'Bachelor of Science in Computer Science',
      institution: 'Varendra University',
      startDate: '08-01-2019',
      endDate: '08-31-2023',
      description:
        'Studied core computer science concepts including algorithms, data structures, and software engineering principles.',
    },
    {
      degree: 'HSC in Science',
      institution: 'Chakkriti School and College',
      startDate: '01-01-2016',
      endDate: '12-31-2018',
      description: 'Higher secondary school certificate in Science',
    },
    {
      degree: 'SSC in Science',
      institution: 'Chakkriti School and College',
      startDate: '01-01-2015',
      endDate: '12-31-2016',
      description: 'Secondary school certificate in Science',
    },
  ];

  return (
    <section className="relative overflow-hidden bg-background pb-16 pt-8 text-foreground transition-colors duration-500">
      {/* theme wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-12 h-64 w-64 rounded-full bg-accent/[0.08] blur-[100px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-muted-foreground/[0.06] blur-[100px]"
      />

      <div className="relative z-[1] container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto mb-10 max-w-2xl text-center md:mb-12">
          <p
            className="mb-2 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground backdrop-blur-sm"
            data-aos="fade-down"
          >
            <Sparkles className="h-3.5 w-3.5 text-accent" aria-hidden />
            Journey
          </p>
          <h2
            className="text-3xl font-bold tracking-tight sm:text-4xl"
            data-aos="fade-up"
          >
            Education{' '}
            <span className="bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent dark:via-accent dark:to-muted-foreground">
              &amp; Experience
            </span>
          </h2>
          <div
            className="mx-auto mt-4 h-1 w-20 rounded-full bg-accent"
            data-aos="zoom-in"
            data-aos-delay="100"
          />
          <p
            className="mt-4 text-sm text-muted-foreground sm:text-base"
            data-aos="fade-up"
            data-aos-delay="150"
          >
            Academic foundations and roles that shaped how I build products today.
          </p>
        </header>

        {/* দুটি সেকশন — এক টানা কার্ড, মাঝে স্পষ্ট ডিভাইডার (মোবাইলে ও ডেস্কটপে) */}
        <div className="overflow-hidden rounded-3xl border border-border bg-muted/40 shadow-sm backdrop-blur-md lg:flex lg:items-stretch dark:bg-muted/25">
          {/* Education */}
          <div
            className="relative flex min-h-0 flex-1 flex-col border-b border-border bg-muted/80 p-6 shadow-inner shadow-black/[0.02] backdrop-blur-md dark:bg-muted/55 sm:p-8 lg:border-b-0 lg:border-r-2 lg:border-border lg:p-10"
            data-aos="fade-up"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"
            />

            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-accent-foreground shadow-md shadow-accent/25">
                <GraduationCap className="h-6 w-6" aria-hidden />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground">Education</h3>
                <p className="text-sm text-muted-foreground">
                  Degrees &amp; milestones
                </p>
              </div>
            </div>

            <TimelineRail variant="primary">
              {educationData.map((item, index) => (
                <article
                  key={`${item.degree}-${index}`}
                  className="flex gap-4 md:gap-0"
                  data-aos="fade-up"
                  data-aos-delay={index * 120}
                >
                  <TimelineMarker
                    variant="primary"
                    icon={GraduationCap}
                    isLast={index === educationData.length - 1}
                  />
                  <div className="min-w-0 flex-1 pb-2 md:flex-initial">
                    <EducationCard item={item} />
                  </div>
                </article>
              ))}
            </TimelineRail>
          </div>

          {/* Experience */}
          <div
            className="relative flex min-h-0 flex-1 flex-col bg-card/95 p-6 shadow-inner shadow-black/[0.02] backdrop-blur-md dark:bg-card/70 sm:p-8 lg:p-10"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-muted-foreground/25 to-transparent"
            />

            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-background text-accent shadow-inner dark:bg-background/70">
                <BriefcaseBusiness className="h-6 w-6" aria-hidden />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground">Experience</h3>
                <p className="text-sm text-muted-foreground">
                  Roles &amp; responsibilities
                </p>
              </div>
            </div>

            {experiences.length === 0 ? (
              <div
                className="rounded-2xl border border-dashed border-border bg-muted/40 p-10 text-center dark:bg-muted/25"
                data-aos="fade-up"
              >
                <BriefcaseBusiness
                  className="mx-auto h-10 w-10 text-muted-foreground"
                  aria-hidden
                />
                <p className="mt-4 text-sm font-medium text-muted-foreground">
                  No experience entries loaded yet.
                </p>
                <p className="mt-1 text-xs text-muted-foreground/90">
                  Data will appear when your API returns roles.
                </p>
              </div>
            ) : (
              <TimelineRail variant="secondary">
                {experiences.map((item, index) => (
                  <article
                    key={item.id ?? index}
                    className="flex gap-4 md:gap-0"
                    data-aos="fade-up"
                    data-aos-delay={index * 120}
                  >
                    <TimelineMarker
                      variant="secondary"
                      icon={BriefcaseBusiness}
                      isLast={index === experiences.length - 1}
                    />
                    <div className="min-w-0 flex-1 pb-2 md:flex-initial">
                      <ExperienceCard item={item} />
                    </div>
                  </article>
                ))}
              </TimelineRail>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceAndEducationList;

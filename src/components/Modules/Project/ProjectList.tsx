import React from 'react';
import Link from 'next/link';
import { ArrowRight, FolderKanban, Sparkles } from 'lucide-react';
import ProjectCard from './ProjectCard';
import type { IProject } from '@/components/Types/project.type';

interface ProjectListProps {
  projects: IProject[];
}

const ProjectList = ({ projects }: ProjectListProps) => {
  const preview = projects.slice(0, 3);
  const hasProjects = preview.length > 0;

  return (
    <section className="relative overflow-hidden bg-white py-14 dark:bg-background sm:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 top-0 h-72 w-72 rounded-full bg-accent/[0.09] blur-[100px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 left-0 h-64 w-64 rounded-full bg-muted-foreground/[0.06] blur-[90px]"
      />

      <div className="relative z-[1] container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
          <p
            className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground"
            data-aos="fade-down"
          >
            <Sparkles className="h-3.5 w-3.5 text-accent" aria-hidden />
            Portfolio
          </p>
          <h2
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-[2.75rem]"
            data-aos="fade-up"
          >
            Featured{' '}
            <span className="bg-gradient-to-r from-foreground via-accent to-muted-foreground bg-clip-text text-transparent dark:via-accent">
              Projects
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
            Highlights from shipped work—architecture, stacks, and outcomes in
            compact case studies you can dive into.
          </p>
        </header>

        {hasProjects ? (
          <div className="grid gap-8 sm:gap-10 md:grid-cols-2 xl:grid-cols-3">
            {preview.map((project: IProject, idx: number) => (
              <ProjectCard key={project.id} project={project} index={idx} />
            ))}
          </div>
        ) : (
          <div
            className="mx-auto flex max-w-md flex-col items-center gap-4 rounded-2xl border border-dashed border-border bg-card/50 px-8 py-14 text-center"
            data-aos="fade-up"
          >
            <FolderKanban
              className="h-12 w-12 text-muted-foreground/50"
              aria-hidden
            />
            <p className="text-sm text-muted-foreground">
              Projects will appear here once they are loaded from the API.
            </p>
          </div>
        )}

        {hasProjects ? (
          <div className="mt-10 flex justify-center md:mt-14">
            <Link
              href="/project"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-muted/80 px-5 py-2.5 text-sm font-semibold text-foreground backdrop-blur-sm transition-colors duration-200 hover:border-accent/40 hover:bg-accent/10 hover:text-accent dark:bg-muted/50"
              data-aos="fade-up"
            >
              <FolderKanban className="h-4 w-4" aria-hidden />
              View all projects
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default ProjectList;

import React from 'react';
import { FolderKanban, Sparkles } from 'lucide-react';
import ProjectCard from './ProjectCard';
import type { IProject } from '@/components/Types/project.type';

interface ProjectPagesProps {
  projects: IProject[];
}

const ProjectPages = ({ projects }: ProjectPagesProps) => {
  const list = projects ?? [];
  const hasProjects = list.length > 0;

  return (
    <section className="relative min-h-[60vh] overflow-hidden bg-white py-14 dark:bg-background sm:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 top-20 h-96 w-96 rounded-full bg-accent/[0.08] blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-muted-foreground/[0.06] blur-[100px]"
      />

      <div className="relative z-[1] container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <p
            className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground"
            data-aos="fade-down"
          >
            <Sparkles className="h-3.5 w-3.5 text-accent" aria-hidden />
            Work
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-[2.85rem]">
            All{' '}
            <span className="bg-gradient-to-r from-foreground via-accent to-muted-foreground bg-clip-text text-transparent dark:via-accent">
              Projects
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
            A running catalog of builds—Repos, demos, timelines, and the stack each
            one runs on.
          </p>
        </header>

        {hasProjects ? (
          <div className="grid gap-8 sm:gap-10 md:grid-cols-2 xl:grid-cols-3">
            {list.map((project: IProject, idx: number) => (
              <ProjectCard key={project.id} project={project} index={idx} />
            ))}
          </div>
        ) : (
          <div
            className="mx-auto flex max-w-lg flex-col items-center gap-4 rounded-2xl border border-dashed border-border bg-card/40 px-8 py-20 text-center"
            data-aos="fade-up"
          >
            <FolderKanban
              className="h-14 w-14 text-muted-foreground/45"
              aria-hidden
            />
            <p className="text-base font-medium text-foreground">
              No projects yet
            </p>
            <p className="max-w-sm text-sm text-muted-foreground">
              When your backend returns projects, they will render here as rich
              cards with links and tech tags.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectPages;

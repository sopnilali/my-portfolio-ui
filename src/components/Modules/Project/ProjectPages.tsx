import React from 'react';
import ProjectCard from './ProjectCard';
import { IProject } from '@/components/Types/project.type';

interface ProjectPagesProps {
  projects: IProject[];
}

const ProjectPages = ({ projects }: ProjectPagesProps) => {

  return (
    <div className="relative bg-white dark:bg-gray-900/40 backdrop-blur-2xl transition-colors duration-500">
      <div className="container mx-auto px-4 sm:px-4 lg:px-4 py-12 relative z-10">
        <h2
          className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-12 transition-colors duration-500"
        >
          Projects
        </h2>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-3 lg:gap-4"
        >
          {projects?.map((project: IProject) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectPages;

'use client';

import React from 'react';
import ProjectCard from './ProjectCard';
import Link from 'next/link';
import { useGetAllProjectQuery } from '@/components/Redux/features/projects/projectApi';
import { IProject } from '@/components/Types/project.type';

const ProjectList = () => {
  const { data: projectData, isLoading, isError, isFetching } = useGetAllProjectQuery(undefined);
  const projects = projectData?.data;
  const isDataLoading = isLoading || isFetching;

  // Skeleton loader for project card
  const ProjectCardSkeleton = () => (
    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-xl overflow-hidden shadow-lg border border-gray-200/20 dark:border-gray-700/20 animate-pulse">
      <div className="relative h-48 w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
      </div>
      <div className="flex flex-col flex-1 justify-between p-6">
        <div>
          <div className="h-6 w-3/4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded mb-2" />
          <div className="h-4 w-1/2 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded mb-4" />
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="h-6 w-16 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-full" />
            <div className="h-6 w-20 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-full" />
            <div className="h-6 w-14 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-full" />
          </div>
        </div>
        <div className="flex justify-between items-center pt-4">
          <div className="flex gap-4">
            <div className="h-5 w-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded" />
            <div className="h-5 w-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded" />
            <div className="h-5 w-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded" />
          </div>
          <div className="h-9 w-20 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-lg" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative bg-white dark:bg-gray-900/40 backdrop-blur-2xl">
      <div className="container mx-auto px-4 sm:px-4 lg:px-4 py-12 relative z-10">
        <h2 
          className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8"
        >
          Projects
        </h2>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-3 lg:gap-4"
        >
          {isDataLoading ? (
            <>
              <ProjectCardSkeleton />
              <ProjectCardSkeleton />
              <ProjectCardSkeleton />
            </>
          ) : (
            projects?.slice(0, 3).map((project: IProject) => (
              <ProjectCard key={project.id} project={project} />
            ))
          )}
        </div>
        <div className='flex justify-center items-center pt-4'>
          <a
            href="/project"
            className="mt-4 px-6 py-3 bg-white/30 dark:bg-gray-800/30 text-gray-900 dark:text-white rounded-md font-medium border border-gray-300/50 dark:border-gray-600/50 shadow-lg hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-all duration-300 backdrop-blur-md"
          >
            <span>More Projects</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectList;

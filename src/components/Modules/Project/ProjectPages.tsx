'use client';

import React from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import Link from 'next/link';
import { useGetAllProjectQuery } from '@/components/Redux/features/projects/projectApi';
import { IProject } from '@/components/Types/project.type';

const ProjectPages = () => {
  const { data: projectData, isLoading, isError } = useGetAllProjectQuery(undefined);
  const projects = projectData?.data;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };


  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900/70 backdrop-blur-md">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-800 dark:border-gray-200"></div>
      </div>
    )
  }

  if (isError || !projects) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900/70 backdrop-blur-md">
        <h1 className="text-2xl text-red-500 dark:text-red-300">Error loading projects</h1>
      </div>
    )
  }

  return (
    <div className="relative bg-white dark:bg-gray-900/40 backdrop-blur-2xl transition-colors duration-500">
      <div className="container mx-auto px-4 sm:px-4 lg:px-4 py-12 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-12 transition-colors duration-500"
        >
          Projects
        </motion.h2>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-3 lg:gap-4"
        >
          {projects?.map((project: IProject) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectPages;

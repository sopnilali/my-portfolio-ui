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
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-4 lg:px-4 py-12">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-8 "
      >
       Projects
      </motion.h2>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-3 lg:gap-4"
      >
        {projects?.map((project: IProject) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </motion.div>
    </div>
  );
};

export default ProjectPages;

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import Link from 'next/link';
import { useGetAllProjectQuery } from '@/components/Redux/features/projects/projectApi';
import { IProject } from '@/components/Types/project.type';

const ProjectList = () => {

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
        className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 "
      >
      Projects
      </motion.h2>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-3 lg:gap-4"
      >
        {projects?.slice(0, 4).map((project: IProject) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </motion.div>
      <div className='flex justify-center items-center pt-4'>
      <motion.a
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        href="/project"
        className=" mt-4 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-700 transition-colors duration-300 flex items-center justify-center gap-2 text-sm"
      >
        <span>More Projects</span>
      </motion.a>
      </div>
    </div>
  );
};

export default ProjectList;

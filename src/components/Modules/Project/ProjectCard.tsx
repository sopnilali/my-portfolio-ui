import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaGithub, FaExternalLinkAlt, FaServer } from 'react-icons/fa';
import { IProject } from '@/components/Types/project.type';
import Link from 'next/link';
import { BiDetail } from 'react-icons/bi';


// Accept the project prop
const ProjectCard = ({ project }: { project: IProject}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 group flex flex-col border border-gray-200/20 dark:border-gray-700/20"
    >
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 justify-between p-6">
        <div>
          <Link href={`/project/${project.id}`}>
            <h3 className="text-xl hover:text-gray-700 dark:hover:text-gray-300 font-bold text-gray-800 dark:text-white mb-2 transition-colors duration-300">
              {project.title}
            </h3>
          </Link>

          {/* Duration */}
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Duration: {project.duration}</p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technology.map((tech, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="px-2 py-1 text-xs bg-gray-100/70 dark:bg-gray-700/70 text-gray-700 dark:text-gray-300 rounded-full backdrop-blur-sm"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Footer with Buttons and Icons */}
        <div className="flex justify-between items-center pt-4 mt-auto">
          <div className="flex gap-4">
            <motion.a
              href={project.frontendrepoUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
            >
              <FaGithub className="w-5 h-5" />
            </motion.a>
            <motion.a
              href={project.backendrepoUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
            >
              <FaServer className="w-5 h-5" />
            </motion.a>
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
            >
              <FaExternalLinkAlt className="w-5 h-5" />
            </motion.a>
          </div>
          <motion.a
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-gray-800/90 dark:bg-gray-700/90 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-300 text-sm backdrop-blur-sm"
            href={`project/${project.id}`}
          >
            <div className="flex items-center gap-2">
              <BiDetail className="w-5 h-5" /> Details
            </div>
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;

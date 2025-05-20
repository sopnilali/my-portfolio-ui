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
      data-aos="fade-right"
      data-aos-duration="1000"
      className="bg-white/70 backdrop-blur-md rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 group"
    >
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content */}
      <div className="p-6 ">
        <Link href={`/project/${project.id}`}><h3 className="text-xl hover:text-gray-700 font-bold text-gray-800 mb-2">{project.title}</h3></Link>


        {/* Duration */}
        <p className="text-sm text-gray-500 mb-4 ">Duration: {project.duration}</p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technology.map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className='flex justify-between items-center'>
        <div className="flex gap-4">
          <motion.a
            href={project.frontendrepoUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            className="text-gray-600 hover:text-gray-900 transition-colors duration-500"
          >
            <FaGithub className="w-5 h-5" />
          </motion.a>
          <motion.a
            href={project.backendrepoUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            className="text-gray-600 hover:text-gray-800 transition-colors duration-500"
          >
            <FaServer className="w-5 h-5" />
          </motion.a>
          <motion.a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            className="text-gray-600 hover:text-gray-800 transition-colors duration-500"
          >
            <FaExternalLinkAlt className="w-5 h-5" />
          </motion.a>
        </div>
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors duration-300 text-sm"
          href={`project/${project.id}`}
        >
         <div className='flex items-center gap-2'>
         <BiDetail className='w-5 h-5' /> Details
         </div>
        </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;

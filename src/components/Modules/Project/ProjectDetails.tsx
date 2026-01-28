import React from 'react'
import Image from 'next/image';
import { FaGithub, FaExternalLinkAlt, FaServer } from 'react-icons/fa';
import type { IProject } from '@/components/Types/project.type';

interface ProjectDetailsProps {
    project: IProject | null;
}

const ProjectDetails = ({ project }: ProjectDetailsProps) => {
    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-2xl text-red-600">Project not found</h1>
            </div>
        );
    }

    return (
        <>
            <div className="min-h-screen bg-white  dark:bg-gray-900/40 backdrop-blur-md pt-20 transition-colors duration-500">
                <div className="container mx-auto px-4 sm:px-4 lg:px-4 py-12">
                    <div>
                        {/* Project Header */}
                        <div className="mb-2 flex justify-between items-center">
                            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-500">{project.title}</h1>
                            <p className="text-gray-600 dark:text-gray-300 mb-4 transition-colors duration-500">Duration: {project.duration}</p>
                        </div>

                        {/* Project Image */}
                        <div className="relative h-[500px] flex justify-start w-full mb-8 rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-xl dark:shadow-gray-800/50">
                            <Image
                                src={project.imageUrl}
                                alt={project.title}
                                fill
                                priority
                                className="object-cover transition-transform duration-500 hover:scale-105"
                            />
                        </div>

                        {/* Project Description */}
                        <div className="prose dark:prose-invert max-w-none mb-8 transition-colors duration-500">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-500">Project Overview</h2>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-500">{project.description.split('\n').map((line: string, index: number) => (
                                <React.Fragment key={index}>
                                    {line}
                                    <br />
                                </React.Fragment>
                            ))}</p>
                        </div>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2 mb-8">
                            {project.technology.map((tech: string, index: number) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm transition-colors duration-500 hover:bg-gray-200 dark:hover:bg-gray-700"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>

                        {/* Project Links */}
                        <div className="flex flex-wrap gap-4 mb-8">
                            <a
                                href={project.frontendrepoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-gray-800 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-all duration-500 hover:shadow-lg dark:hover:shadow-gray-800/50 active:scale-95"
                            >
                                <FaGithub className="w-5 h-5" />
                                <span>Frontend Code</span>
                            </a>
                            <a
                                href={project.backendrepoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-gray-800 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-all duration-500 hover:shadow-lg dark:hover:shadow-gray-800/50 active:scale-95"
                            >
                                <FaServer className="w-5 h-5" />
                                <span>Backend Code</span>
                            </a>
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-gray-800 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-all duration-500 hover:shadow-lg dark:hover:shadow-gray-800/50 active:scale-95"
                            >
                                <FaExternalLinkAlt className="w-5 h-5" />
                                <span>Live</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProjectDetails

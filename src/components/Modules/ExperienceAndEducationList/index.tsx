'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useGetAllExperienceQuery } from '@/components/Redux/features/experience/experienceApi';

const ExperienceAndEducationList = () => {
    const { data: experienceData, isLoading, isError } = useGetAllExperienceQuery(undefined);

    // Separate education and experience data
    const educationData = [
        {
            degree: "Bachelor of Science in Computer Science",
            institution: "Varendra University",
            startDate: "08-01-2019",
            endDate: "08-31-2023",
            description: "Studied core computer science concepts including algorithms, data structures, and software engineering principles."
        },
        {
            degree: "HSC in Science",
            institution: "Chakkriti School and College",
            startDate: "01-01-2016",
            endDate: "12-31-2018",
            description: "Higher secondary school certificate in Science"
        },
        {
            degree: "SSC in Science",
            institution: "Chakkriti School and College",
            startDate: "01-01-2015",
            endDate: "12-31-2016",
            description: "Secondary school certificate in Science"
        }
    ];


    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900/70 backdrop-blur-md">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-800 dark:border-gray-200"></div>
            </div>
        )
    }



    const experienceInfo = experienceData?.data

    if (isError || !experienceInfo) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900/70 backdrop-blur-md">
                <h1 className="text-2xl text-red-500 dark:text-red-300">Error loading projects</h1>
            </div>
        )
    }



    return (
        <div className="relative bg-white dark:bg-gray-900/40 backdrop-blur-2xl transition-colors duration-500">
            <div className="container mx-auto py-12 px-4 sm:px-4 lg:px-4 relative z-10">
                <div className="flex flex-col md:flex-row">
                    {/* Education Column */}
                    <div className="w-full md:w-1/2 pl-0">
                        <motion.h3
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-3xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-500"
                        >
                            Education
                        </motion.h3>
                        {educationData?.map((item: any, index: number) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="mb-8 flex"
                            >
                                <div className="flex-shrink-0 mr-2">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-600 dark:bg-gray-700 text-white transition-colors duration-500">
                                        <div className="w-3 h-3 bg-white rounded-full"></div>
                                    </div>
                                    {index !== educationData.length - 1 && (
                                        <div className="w-0.5 h-full bg-gray-600 dark:bg-gray-700 mx-auto transition-colors duration-500"></div>
                                    )}
                                </div>
                                <div className="flex-grow">
                                    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-lg shadow-lg p-6 h-full transition-all duration-500 hover:shadow-xl border border-gray-200/20 dark:border-gray-700/20 hover:border-gray-300/30 dark:hover:border-gray-600/30">
                                        <p className="text-gray-600 dark:text-gray-400 mb-4 font-bold transition-colors duration-500">
                                            {new Date(item.startDate).toLocaleDateString('en-US', { year: 'numeric' })} - {new Date(item.endDate).toLocaleDateString('en-US', { year: 'numeric' })}
                                        </p>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-500">{item.degree}</h3>
                                        <h4 className="text-lg text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-500">{item.institution}</h4>
                                        <p className="text-gray-800 dark:text-gray-200 transition-colors duration-500">{item.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    {/* Experience Column */}
                    <div className="w-full md:w-1/2 pl-0 md:pl-4">
                        <motion.h3
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-3xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-500"
                        >
                            Experience
                        </motion.h3>
                        {experienceInfo?.map((item: any, index: number) => (
                            <TimelineItem key={index} item={item} index={index} isLast={index === experienceInfo.length - 1} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const TimelineItem = ({ item, index, isLast }: { item: any, index: number, isLast: boolean }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="mb-8 flex"
    >
        <div className="flex-shrink-0 mr-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-600 dark:bg-gray-700 text-white transition-colors duration-500">
                <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            {!isLast && (
                <div className="w-0.5 h-full bg-gray-600 dark:bg-gray-700 mx-auto transition-colors duration-500"></div>
            )}
        </div>
        <div className="flex-grow">
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-lg shadow-lg p-6 h-full transition-all duration-500 hover:shadow-xl border border-gray-200/20 dark:border-gray-700/20 hover:border-gray-300/30 dark:hover:border-gray-600/30">
                <p className="text-gray-600 dark:text-gray-400 mb-4 font-bold transition-colors duration-500">
                    {new Date(item.startDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} - {new Date(item.endDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </p>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-500">{item.position}</h3>
                <h4 className="text-lg text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-500">{item.company}</h4>
                <p className="text-gray-800 dark:text-gray-200 transition-colors duration-500">{item.description}</p>
            </div>
        </div>
    </motion.div>
);

export default ExperienceAndEducationList;

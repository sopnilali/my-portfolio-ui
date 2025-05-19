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
    const experienceInfo = experienceData?.data
    return (
        <div className="bg-white/70 backdrop-blur-md min-h-screen flex items-center">
            <div className="container mx-auto py-12">
                <div data-aos="fade-up" data-aos-duration="1500" className="flex flex-col md:flex-row">
                    {/* Education Column */}
                    <div className="w-full md:w-1/2 pl-0 md:pl-4">
                        <h3 className="text-3xl font-bold text-gray-700 mb-6">Education</h3>
                        {educationData?.map((item: any, index: number) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="mb-8 flex"
                            >
                                <div className="flex-shrink-0 mr-4">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-600 text-white">
                                        <div className="w-3 h-3 bg-white rounded-full"></div>
                                    </div>
                                    {index !== educationData.length - 1 && (
                                        <div className="w-0.5 h-full bg-gray-600 mx-auto"></div>
                                    )}
                                </div>
                                <div className="flex-grow pb-8">
                                    <div className="bg-white rounded-lg shadow-lg p-6 h-full transition-all duration-300 hover:bg-gray-50 hover:shadow-xl hover:scale-[1.02]">
                                        <p className="text-gray-600 mb-4 font-bold">
                                            {new Date(item.startDate).toLocaleDateString('en-US', { year: 'numeric' })} - {new Date(item.endDate).toLocaleDateString('en-US', { year: 'numeric' })}
                                        </p>
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">{item.degree}</h3>
                                        <h4 className="text-lg text-gray-700 mb-2">{item.institution}</h4>
                                        <p className="text-gray-800">{item.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    {/* Experience Column */}
                    <div className="w-full md:w-1/2 pl-0 md:pl-4">
                        <h3 className="text-3xl font-bold text-gray-700 mb-6">Experience</h3>
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
        <div className="flex-shrink-0 mr-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-600 text-white">
                <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            {!isLast && (
                <div className="w-0.5 h-full bg-gray-600 mx-auto"></div>
            )}
        </div>
        <div className="flex-grow pb-8">
            <div className="bg-white rounded-lg shadow-lg p-6 h-full transition-all duration-300 hover:bg-gray-50 hover:shadow-xl hover:scale-[1.02]">
                <p className="text-gray-600 mb-4 font-bold">
                    {new Date(item.startDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} - {new Date(item.endDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </p>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.position}</h3>
                <h4 className="text-lg text-gray-700 mb-2">{item.company}</h4>
                <p className="text-gray-800">{item.description}</p>
            </div>
        </div>
    </motion.div>
);

export default ExperienceAndEducationList;

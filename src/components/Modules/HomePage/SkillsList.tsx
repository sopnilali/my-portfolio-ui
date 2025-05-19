'use client';

import { useGetAllSkillsQuery } from '@/components/Redux/features/skill/skillApi';
import { motion } from 'framer-motion';
import Image from 'next/image';

const SkillsList = () => {
    const {data:skills, isLoading, isError} = useGetAllSkillsQuery(undefined);

    return (
        <div className="bg-white/70 backdrop-blur-md">
            <div className="container mx-auto px-4 sm:px-4 lg:px-4 py-16 -mb-5">
                <motion.h2 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-bold  text-gray-900 mb-12"
                    data-aos="fade-up"
                >
                    Skills
                </motion.h2>
                
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                    {skills?.data?.map((skill:any, index:any) => (
                        <motion.div
                            key={skill.name}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white rounded-lg p-3 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center justify-center aspect-square cursor-pointer"
                        >
                            <div data-aos="fade-up" data-aos-delay={index * 100} className="flex flex-col items-center justify-center h-full">
                                <Image 
                                    src={skill.icon}
                                    alt={skill.name}
                                    width={100}
                                    height={100}
                                    className="text-orange-500 mb-2"
                                />
                                <h3 className="text-xs sm:text-sm font-medium text-gray-900 text-center">
                                    {skill.name}
                                </h3>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SkillsList;

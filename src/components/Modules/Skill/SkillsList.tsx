'use client';

import { useGetAllSkillsQuery } from '@/components/Redux/features/skill/skillApi';
import { motion } from 'framer-motion';
import Image from 'next/image';

const SkillsList = () => {
    const {data:skills, isLoading, isError} = useGetAllSkillsQuery(undefined);

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

    return (
        <div className="relative bg-white dark:bg-gray-900/40 backdrop-blur-2xl">
            <div className="container mx-auto px-4 sm:px-4 lg:px-4 py-12 relative z-10">
                <motion.h2 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-12"
                >
                    Skills
                </motion.h2>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 gap-4"
                >
                    {skills?.data?.map((skill: any, index: any) => (
                        <motion.div
                            key={skill.name}
                            variants={itemVariants}
                            whileHover={{ 
                                scale: 1.05,
                                transition: { duration: 0.2 }
                            }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-xl p-2 sm:p-3 md:p-4 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-row items-center justify-between gap-3 sm:gap-4 cursor-pointer border border-gray-200/20 dark:border-gray-700/20"
                        >
                            <div className="relative aspect-square w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12">
                                <Image 
                                    src={skill.icon}
                                    alt={skill.name}
                                    fill
                                    className="object-contain transition-transform duration-300 hover:scale-110"
                                />
                            </div>
                            <h3 className="text-sm sm:text-base font-medium text-gray-900 dark:text-white text-left w-full">
                                {skill.name}
                            </h3>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default SkillsList;

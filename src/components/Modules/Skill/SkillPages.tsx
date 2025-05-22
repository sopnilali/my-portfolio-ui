'use client';

import { useGetAllSkillsQuery } from '@/components/Redux/features/skill/skillApi';
import { motion } from 'framer-motion';
import Image from 'next/image';

const SkillPages = () => {
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

    if (isLoading) {
        return (
          <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900/70 backdrop-blur-md">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-800 dark:border-gray-200"></div>
          </div>
        )
      }
    
      if (isError || !skills) {
        return (
          <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900/70 backdrop-blur-md">
            <h1 className="text-2xl text-red-500 dark:text-red-300">Error loading skills</h1>
          </div>
        )
      }



    return (
        <div className="relative bg-white dark:bg-gray-900/40 backdrop-blur-2xl transition-colors duration-500">
            <div className="container mx-auto px-4 sm:px-4 lg:px-4 py-12 relative z-10">
                <motion.h2 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-12 transition-colors duration-500"
                >
                    Skills
                </motion.h2>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4"
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
                            className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-500 flex flex-col items-center justify-center aspect-square cursor-pointer border border-gray-200/20 dark:border-gray-700/20 hover:border-gray-300/30 dark:hover:border-gray-600/30"
                        >
                            <div className="flex flex-col items-center justify-center h-full">
                                <Image 
                                    src={skill.icon}
                                    alt={skill.name}
                                    width={100}
                                    height={100}
                                    className="mb-2 transition-all duration-500 hover:scale-110 filter dark:brightness-90"
                                />
                                <h3 className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white text-center transition-colors duration-500">
                                    {skill.name}
                                </h3>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default SkillPages;

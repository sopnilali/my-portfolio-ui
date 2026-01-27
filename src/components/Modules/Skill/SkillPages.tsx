'use client';

import { useGetAllSkillsQuery } from '@/components/Redux/features/skill/skillApi';
import Image from 'next/image';

const SkillPages = () => {

    const {data:skills, isLoading, isError, isFetching} = useGetAllSkillsQuery(undefined);
    const isDataLoading = isLoading || isFetching;


    // Skeleton loader for skill card
    const SkillCardSkeleton = () => (
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-xl p-2 sm:p-3 md:p-4 shadow-md border border-gray-200/20 dark:border-gray-700/20 flex flex-row items-center justify-between gap-3 sm:gap-4 animate-pulse">
            <div className="relative aspect-square w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
            </div>
            <div className="h-4 w-20 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded" />
        </div>
    );



    return (
        <div className="relative bg-white dark:bg-gray-900/40 backdrop-blur-2xl">
            <div className="container mx-auto px-4 sm:px-4 lg:px-4 py-12 relative z-10">
                <h2 
                    className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8"
                >
                    Skills
                </h2>

                <div
                    className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 gap-4"
                >
                    {isDataLoading ? (
                        <>
                            {[...Array(12)].map((_, index) => (
                                <SkillCardSkeleton key={index} />
                            ))}
                        </>
                    ) : (
                        skills?.data?.map((skill: any, index: any) => (
                        <div
                            key={skill.name}
                            className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-xl p-2 sm:p-3 md:p-4 shadow-md hover:shadow-lg transition-all duration-300 flex flex-row items-center justify-between gap-3 sm:gap-4 cursor-pointer border border-gray-200/20 dark:border-gray-700/20 active:scale-95"
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
                        </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default SkillPages;

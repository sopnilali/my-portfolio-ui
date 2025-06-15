import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import './blog.css'
import { useGetAllBlogQuery } from '@/components/Redux/features/blog/blogApi'

const BlogList = () => {
    const { data: blogs, isLoading, isError } = useGetAllBlogQuery(undefined)

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 dark:border-gray-100"></div>
            </div>
        )
    }

    if (isError || !blogs?.data) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-2xl text-red-600 dark:text-red-400">Error loading blogs</h1>
            </div>
        )
    }

    return (
        <>
            <div className=" px-4 pb-10 dark:bg-gray-900/40 bg-white">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl font-bold mb-12 text-center text-gray-900 dark:text-white"
                >
                    Latest Blog Posts
                </motion.h2>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-8 container mx-auto"
                >
                    {blogs?.data?.slice(0, 3).map((blog: any) => (
                        <motion.div
                            key={blog.id}
                            variants={itemVariants}
                            className="border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800/70 shadow hover:shadow-lg transition-shadow duration-300 p-4 md:p-6 flex flex-col md:flex-row items-start md:items-stretch gap-6"
                        >
                            <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
                                <Link href={`/blog/${blog.id}`} className="block h-full">
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        className="relative w-full h-56 md:h-full rounded-lg overflow-hidden"
                                    >
                                        <Image
                                            src={blog.thumbnail}
                                            alt={blog.title}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                            priority={true}
                                        />
                                    </motion.div>
                                </Link>
                            </div>
                            <div className="flex-1 flex flex-col justify-between py-2">
                                <div className='flex flex-col gap-2'>
                                    <Link href={`/blog/${blog.id}`}>
                                        <motion.h2
                                            className="text-2xl font-bold mb-2 leading-snug text-gray-800 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200"
                                        >
                                            {blog.title}
                                        </motion.h2>
                                    </Link>
                                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-3 space-x-2">
                                        <span className="font-semibold uppercase tracking-wide">{blog.user.name || "Anonymous"}</span>
                                        <span>•</span>
                                        <span>
                                            {blog.createdAt
                                                ? new Date(blog.createdAt).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })
                                                : ''}
                                        </span>
                                    </div>
                                    <div className="text-gray-700 dark:text-gray-300 text-base mb-4 line-clamp-3">
                                        <div
                                            className="text-gray-800 dark:text-gray-200"
                                            dangerouslySetInnerHTML={{
                                                __html: blog.content.length > 60 ? blog.content.substring(0, 200) + '...' : blog.content
                                            }}
                                        />
                                    </div>
                                </div>
                                <Link href={`/blog/${blog.id}`}>
                                    <motion.button
                                        className="mt-2 px-5 py-2 border border-gray-800 dark:border-gray-200 text-gray-900 dark:text-gray-100 rounded hover:bg-gray-700 dark:hover:bg-gray-600 text-sm font-semibold hover:text-white dark:hover:text-white duration-300 transition-all cursor-pointer"
                                    >
                                        Read More
                                    </motion.button>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                    <div className='flex justify-center items-center py-4'>
                        <Link href="/blog" className="items-center border border-gray-800 dark:border-gray-200 text-gray-900 dark:text-gray-100 rounded-md px-4 py-2 hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors text-base font-semibold hover:text-white dark:hover:text-white duration-300 cursor-pointer">
                            Learn More
                        </Link>
                    </div>
                </motion.div>
            </div>
        </>
    )
}

export default BlogList

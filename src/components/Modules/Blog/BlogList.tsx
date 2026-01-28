import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import './blog.css'
import type { Blog } from '@/services/blogService'

interface BlogListProps {
    blogs: Blog[];
}

const BlogList = ({ blogs }: BlogListProps) => {

    // Skeleton loader for blog card
    const BlogCardSkeleton = () => (
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800/70 shadow p-4 md:p-6 flex flex-col md:flex-row items-start md:items-stretch gap-6 animate-pulse">
            <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
                <div className="relative w-full h-56 md:h-full rounded-lg overflow-hidden bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                </div>
            </div>
            <div className="flex-1 flex flex-col justify-between py-2">
                <div className='flex flex-col gap-2'>
                    <div className="h-8 w-3/4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded mb-2" />
                    <div className="h-4 w-1/3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded mb-3" />
                    <div className="space-y-2">
                        <div className="h-4 w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded" />
                        <div className="h-4 w-5/6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded" />
                        <div className="h-4 w-4/6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded" />
                    </div>
                </div>
                <div className="h-9 w-24 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded mt-2" />
            </div>
        </div>
    )

    return (
        <>
            <div className=" px-4 pb-10 dark:bg-gray-900/40 bg-white">
                <h2
                    className="text-4xl font-bold mb-12 text-center text-gray-900 dark:text-white"
                >
                    Latest Blog Posts
                </h2>
                <div
                    className="space-y-8 container mx-auto"
                >
                    {blogs.length === 0 ? (
                        <>
                            <BlogCardSkeleton />
                            <BlogCardSkeleton />
                            <BlogCardSkeleton />
                        </>
                    ) : (
                        blogs.slice(0, 3).map((blog) => (
                        <div
                            key={blog.id}
                            className="border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800/70 shadow hover:shadow-lg transition-shadow duration-300 p-4 md:p-6 flex flex-col md:flex-row items-start md:items-stretch gap-6"
                        >
                            <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
                                <Link href={`/blog/${blog.id}`} className="block h-full">
                                    <div className="relative w-full h-56 md:h-full rounded-lg overflow-hidden transition-transform duration-200 hover:scale-[1.02]">
                                        <Image
                                            src={blog.thumbnail}
                                            alt={blog.title}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                    </div>
                                </Link>
                            </div>
                            <div className="flex-1 flex flex-col justify-between py-2">
                                <div className='flex flex-col gap-2'>
                                    <Link href={`/blog/${blog.id}`}>
                                        <h2 className="text-2xl font-bold mb-2 leading-snug text-gray-800 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200">
                                            {blog.title}
                                        </h2>
                                    </Link>
                                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-3 space-x-2">
                                        <span className="font-semibold uppercase tracking-wide">{blog.user?.name || "Anonymous"}</span>
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
                                    <button className="mt-2 px-5 py-2 border border-gray-800 dark:border-gray-200 text-gray-900 dark:text-gray-100 rounded hover:bg-gray-700 dark:hover:bg-gray-600 text-sm font-semibold hover:text-white dark:hover:text-white duration-300 transition-all cursor-pointer active:scale-95">
                                        Read More
                                    </button>
                                </Link>
                            </div>
                        </div>
                        ))
                    )}
                    <div className='flex justify-center items-center py-4'>
                        <Link href="/blog" className="items-center border border-gray-800 dark:border-gray-200 text-gray-900 dark:text-gray-100 rounded-md px-4 py-2 hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors text-base font-semibold hover:text-white dark:hover:text-white duration-300 cursor-pointer">
                            Learn More
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BlogList

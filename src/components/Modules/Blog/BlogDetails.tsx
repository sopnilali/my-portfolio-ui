"use client"

import React, { useEffect } from 'react'
import Image from 'next/image'
import { useGetBlogByIdQuery } from '@/components/Redux/features/blog/blogApi'
import { useParams } from 'next/navigation'
import { FaEye } from 'react-icons/fa'

const BlogDetails = () => {
    const { id } = useParams()
    const { data: blog, isLoading, isError } = useGetBlogByIdQuery(id)

    useEffect(() => {
        const incrementViewCount = () => {
            const currentViews = parseInt(localStorage.getItem(`blog_${id}_views`) || '0')
            localStorage.setItem(`blog_${id}_views`, (currentViews + 1).toString())
        }
        incrementViewCount()
    }, [id])

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900/70 backdrop-blur-md">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-800 dark:border-gray-200"></div>
            </div>
        );
    }

    if (isError || !blog?.data) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900/70 backdrop-blur-md">
                <h1 className="text-2xl text-red-500 dark:text-red-300">Error loading blog details</h1>
            </div>
        );
    }

    const localViews = parseInt(localStorage.getItem(`blog_${id}_views`) || '0')
    const totalViews = (blog.data.readingCount || 0) + localViews

    return (
        <div className="px-4 py-20 bg-white dark:bg-gray-900/40 backdrop-blur-2xl ">
            {/* Blog Header */}
            <div className="mb-8 ">
                <h1 className="text-3xl pt-10 md:text-4xl font-bold text-gray-900 dark:text-white mb-4 container mx-auto">
                    {blog.data.title}
                </h1>
                <div className="flex items-center gap-4 text-sm container mx-auto">
                    <span className="text-gray-700 dark:text-gray-300">
                        {blog.data.createdAt ? new Date(blog.data.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        }) : ''}
                    </span>
                    <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400 ">
                        <FaEye className="text-lg" />
                        <span>{totalViews} views</span>
                    </span>
                </div>
            </div>

            {/* Featured Image */}
            {blog.data.thumbnail && (
                <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden container mx-auto">
                    <Image
                        src={blog.data.thumbnail}
                        alt={blog.data.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            )}

            <div className="blog-content container mx-auto " dangerouslySetInnerHTML={{ __html: blog.data.content }} />


        </div>
    )
}

export default BlogDetails

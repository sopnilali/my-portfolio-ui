'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { FaEye } from 'react-icons/fa'
import type { Blog } from '@/services/blogService'
import { blogCoverSrc } from './blogArchiveUtils'

interface BlogDetailsProps {
    blog: Blog | null;
}

const BlogDetails = ({ blog }: BlogDetailsProps) => {
    const [localViews, setLocalViews] = useState(0);

    useEffect(() => {
        if (!blog?.id) return;
        const key = `blog_${blog.id}_views`;
        const currentViews = parseInt(localStorage.getItem(key) || '0', 10);
        const nextViews = currentViews + 1;
        localStorage.setItem(key, String(nextViews));
        setLocalViews(nextViews);
    }, [blog?.id]);

    if (!blog) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900/70 backdrop-blur-md">
                <h1 className="text-2xl text-red-500 dark:text-red-300">Blog not found</h1>
            </div>
        );
    }

    const coverSrc = blogCoverSrc(blog);

    const totalViews = (blog.readingCount ?? 0) + localViews;

    return (
        <div className="px-4 py-20 bg-white dark:bg-gray-900/40 backdrop-blur-2xl ">
            {/* Blog Header */}
            <div className="mb-8 ">
                <h1 className="text-3xl pt-10 md:text-4xl font-bold text-gray-900 dark:text-white mb-4 container mx-auto">
                    {blog.title}
                </h1>
                <div className="flex items-center gap-4 text-sm container mx-auto">
                    <span className="text-gray-700 dark:text-gray-300">
                        {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString('en-US', {
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
            {coverSrc ? (
                <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden container mx-auto">
                            <Image
                                src={coverSrc}
                                alt={blog.title}
                                fill
                                className="object-cover"
                                priority
                            />
                </div>
            ) : null}

            <div className="blog-content container mx-auto " dangerouslySetInnerHTML={{ __html: blog.content }} />


        </div>
    )
}

export default BlogDetails

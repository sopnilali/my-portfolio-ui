"use client"

import React, { useEffect } from 'react'
import Image from 'next/image'
import './blog.css'
import { useGetBlogByIdQuery } from '@/components/Redux/features/blog/blogApi'
import { useParams } from 'next/navigation'
import { FaEye } from 'react-icons/fa'

const BlogDetails = () => {
    const { id } = useParams()
    const { data: blog, isLoading, isError } = useGetBlogByIdQuery(id)

    useEffect(() => {
        // Increment view count when component mounts
        const incrementViewCount = () => {
            const currentViews = parseInt(localStorage.getItem(`blog_${id}_views`) || '0')
            localStorage.setItem(`blog_${id}_views`, (currentViews + 1).toString())
        }
        incrementViewCount()
    }, [id])

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (isError || !blog?.data) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-2xl text-red-600">Error loading blog details</h1>
            </div>
        );
    }

    const localViews = parseInt(localStorage.getItem(`blog_${id}_views`) || '0')
    const totalViews = (blog.data.readingCount || 0) + localViews

    return (
        <div className="container mx-auto px-4 py-20">
            {/* Blog Header */}
            <div className="blog-header">
                <h1 className="blog-title">{blog.data.title}</h1>
                <div className="blog-meta space-x-2 flex items-center gap-4">
                    <span className="blog-date">
                        {blog.data.createdAt ? new Date(blog.data.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        }) : ''}
                    </span>
                    <span className="flex items-center gap-1 text-gray-600">
                        <FaEye className="text-lg" />
                        <span>{totalViews} views</span>
                    </span>
                </div>
            </div>

            {/* Featured Image */}
            {blog.data.thumbnail && (
                <div className="blog-image-container">
                    <Image
                        src={blog.data.thumbnail}
                        alt={blog.data.title}
                        fill
                        className="blog-image"
                    />
                </div>
            )}

            <div className='blog-content' dangerouslySetInnerHTML={{ __html: blog.data.content }} />
        </div>
    )
}

export default BlogDetails

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BookOpen, Calendar, Sparkles, UserCircle } from 'lucide-react';
import './blog.css';
import type { Blog } from '@/services/blogService';
import {
    blogCoverSrc,
    excerptFromContent,
    formatBlogDateShort as formatBlogDate,
} from './blogArchiveUtils';

function BlogCardSkeleton() {
    return (
        <div className="flex animate-pulse flex-col overflow-hidden rounded-2xl border border-border bg-card/90 shadow-sm dark:bg-card/70">
            <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-muted">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/40 to-transparent animate-shimmer" />
            </div>
            <div className="flex flex-1 flex-col gap-3 p-5">
                <div className="h-4 w-2/5 rounded-full bg-muted" />
                <div className="h-6 w-[90%] rounded-md bg-muted" />
                <div className="h-16 w-full rounded-lg bg-muted/80" />
                <div className="mt-auto h-9 w-28 rounded-lg bg-muted" />
            </div>
        </div>
    );
}

function BlogPostCard({ blog, index = 0 }: { blog: Blog; index?: number }) {
    const excerpt = excerptFromContent(blog.content, 160);
    const author = blog.user?.name || 'Anonymous';
    const thumbnailSrc = blogCoverSrc(blog);

    return (
        <article
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card/95 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/35 hover:shadow-lg hover:shadow-accent/5 dark:bg-card/75"
            data-aos="fade-up"
            data-aos-delay={index * 100}
        >
            <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-muted">
                <Link href={`/blog/${blog.id}`} className="relative block h-full min-h-[11rem] w-full sm:min-h-[12.5rem]">
                    {thumbnailSrc ? (
                        <>
                            <Image
                                src={thumbnailSrc}
                                alt={blog.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <div
                                aria-hidden
                                className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/5 to-transparent opacity-90 transition-opacity duration-300 group-hover:from-background/90"
                            />
                            <div
                                aria-hidden
                                className="absolute inset-0 ring-1 ring-inset ring-black/[0.06] dark:ring-white/10"
                            />
                        </>
                    ) : (
                        <div className="flex h-full min-h-[11rem] w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-muted via-muted to-accent/15 px-6 text-center transition-colors group-hover:to-accent/25 sm:min-h-[12.5rem]">
                            <BookOpen
                                className="h-12 w-12 text-accent/40 dark:text-accent/50"
                                aria-hidden
                            />
                            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                                No cover
                            </span>
                        </div>
                    )}
                </Link>
                <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-background/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-accent shadow-sm backdrop-blur-sm dark:bg-background/60">
                    Article
                </span>
            </div>

            <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
                            <UserCircle className="h-3.5 w-3.5 shrink-0 text-accent" aria-hidden />
                            {author}
                        </span>
                        <span className="hidden sm:inline opacity-40" aria-hidden>
                            •
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5 shrink-0 text-accent opacity-90" aria-hidden />
                            {formatBlogDate(blog.createdAt)}
                        </span>
                    </div>

                    <Link href={`/blog/${blog.id}`} className="block">
                        <h3 className="line-clamp-2 text-xl font-bold leading-snug tracking-tight text-foreground transition-colors duration-200 group-hover:text-accent sm:text-[1.35rem]">
                            {blog.title}
                        </h3>
                    </Link>

                    {excerpt ? (
                        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                            {excerpt}
                        </p>
                    ) : null}
                </div>

                <Link
                    href={`/blog/${blog.id}`}
                    className="group/btn mt-5 inline-flex w-fit items-center gap-2 rounded-xl border border-accent/30 bg-accent/10 px-4 py-2.5 text-sm font-semibold text-accent transition-all duration-200 hover:bg-accent hover:text-accent-foreground active:scale-[0.98] dark:border-accent/40 dark:hover:bg-accent"
                >
                    Read article
                    <ArrowRight
                        className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-0.5"
                        aria-hidden
                    />
                </Link>
            </div>
        </article>
    );
}

interface BlogListProps {
    blogs: Blog[];
}

const BlogList = ({ blogs }: BlogListProps) => {
    const preview = blogs.slice(0, 3);
    const hasPosts = preview.length > 0;

    return (
        <section className="relative overflow-hidden bg-background py-14 text-foreground transition-colors md:py-20">
            <div
                aria-hidden
                className="pointer-events-none absolute -right-28 top-0 h-72 w-72 rounded-full bg-accent/[0.07] blur-[100px]"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute -bottom-24 left-0 h-64 w-64 rounded-full bg-muted-foreground/[0.06] blur-[90px]"
            />

            <div className="relative z-[1] container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <header className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
                    <p
                        className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground"
                        data-aos="fade-down"
                    >
                        <Sparkles className="h-3.5 w-3.5 text-accent" aria-hidden />
                        Writing
                    </p>
                    <h2
                        className="text-3xl font-bold tracking-tight sm:text-4xl md:text-[2.75rem]"
                        data-aos="fade-up"
                    >
                        Latest{' '}
                        <span className="bg-gradient-to-r from-foreground via-accent to-muted-foreground bg-clip-text text-transparent dark:via-accent">
                            Blog Posts
                        </span>
                    </h2>
                    <div
                        className="mx-auto mt-4 h-1 w-14 rounded-full bg-accent"
                        data-aos="zoom-in"
                        data-aos-delay="80"
                    />
                    <p
                        className="mt-4 text-sm text-muted-foreground sm:text-base"
                        data-aos="fade-up"
                        data-aos-delay="120"
                    >
                        Ideas, tutorials, and notes from recent work—clear, practical, and
                        straight to the point.
                    </p>
                </header>

                <div className="grid gap-8 sm:gap-10 md:grid-cols-2 xl:grid-cols-3">
                    {!hasPosts ? (
                        <>
                            <BlogCardSkeleton />
                            <BlogCardSkeleton />
                            <BlogCardSkeleton />
                        </>
                    ) : (
                        preview.map((blog, idx) => (
                            <BlogPostCard key={blog.id} blog={blog} index={idx} />
                        ))
                    )}
                </div>

                <div className="mt-10 flex justify-center md:mt-14">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 rounded-xl border border-border bg-muted/80 px-5 py-2.5 text-sm font-semibold text-foreground backdrop-blur-sm transition-colors duration-200 hover:border-accent/40 hover:bg-accent/10 hover:text-accent dark:bg-muted/50"
                        data-aos="fade-up"
                    >
                        <BookOpen className="h-4 w-4" aria-hidden />
                        View all posts
                        <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default BlogList;

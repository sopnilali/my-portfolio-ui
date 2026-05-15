'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
  FileText,
  LayoutGrid,
  Search,
  Sparkles,
  UserCircle,
} from 'lucide-react';
import './blog.css';
import type { Blog } from '@/services/blogService';
import {
  blogCoverSrc,
  excerptFromContent,
  estimateReadingMinutes,
  formatBlogDateLong,
  formatBlogDateShort,
  sortBlogsByDate,
  stripHtml,
} from './blogArchiveUtils';

function matchesQuery(blog: Blog, query: string): boolean {
  if (!query.trim()) return true;
  const q = query.trim().toLowerCase();
  const author = blog.user?.name ?? '';
  const blob = `${blog.title} ${stripHtml(blog.content)} ${author}`.toLowerCase();
  return blob.includes(q);
}

function FeaturedPost({ blog }: { blog: Blog }) {
  const author = blog.user?.name || 'Anonymous';
  const excerpt = excerptFromContent(blog.content, 260);
  const readMin = estimateReadingMinutes(blog.content);
  const thumb = blogCoverSrc(blog);

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-lg shadow-black/[0.04] ring-1 ring-black/[0.04] dark:bg-card/80 dark:shadow-black/40 dark:ring-white/10">
      <div className="grid min-h-[280px] gap-0 md:grid-cols-12 md:min-h-[340px]">
        <Link
          href={`/blog/${blog.id}`}
          className="relative block min-h-[220px] overflow-hidden bg-muted md:col-span-5 lg:col-span-6"
        >
          {thumb ? (
            <>
              <Image
                src={thumb}
                alt={blog.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent md:bg-gradient-to-r md:from-transparent md:via-background/25 md:to-background/95"
              />
            </>
          ) : (
            <div className="flex h-full min-h-[220px] flex-col items-center justify-center gap-3 bg-gradient-to-br from-muted via-muted to-accent/20">
              <BookOpen className="h-14 w-14 text-accent/40" aria-hidden />
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Featured article
              </span>
            </div>
          )}
          <span className="absolute left-4 top-4 inline-flex rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-accent-foreground shadow-md backdrop-blur-sm">
            Editors pick
          </span>
        </Link>

        <div className="flex flex-col justify-center p-6 sm:p-8 md:col-span-7 lg:col-span-6">
          <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
              <UserCircle className="h-4 w-4 shrink-0 text-accent" aria-hidden />
              {author}
            </span>
            <span className="opacity-40" aria-hidden>
              •
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-accent opacity-90" aria-hidden />
              {formatBlogDateShort(blog.createdAt)}
            </span>
            <span className="opacity-40" aria-hidden>
              •
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-accent opacity-90" aria-hidden />
              {readMin} min read
            </span>
          </div>

          <Link href={`/blog/${blog.id}`} className="block">
            <h2 className="text-2xl font-bold leading-tight tracking-tight text-foreground transition-colors hover:text-accent sm:text-3xl lg:text-[2rem]">
              {blog.title}
            </h2>
          </Link>

          {excerpt ? (
            <p className="mt-4 line-clamp-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {excerpt}
            </p>
          ) : null}

          <Link
            href={`/blog/${blog.id}`}
            className="group/btn mt-6 inline-flex w-fit items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground shadow-md transition hover:bg-accent/90 active:scale-[0.98]"
          >
            Open in reader
            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

function ArchivePostCard({ blog }: { blog: Blog }) {
  const author = blog.user?.name || 'Anonymous';
  const excerpt = excerptFromContent(blog.content, 150);
  const readMin = estimateReadingMinutes(blog.content);
  const thumb = blogCoverSrc(blog);

  return (
    <article
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card/95 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 dark:bg-card/70"
    >
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-muted">
        <Link href={`/blog/${blog.id}`} className="relative block h-full min-h-[10.5rem] w-full">
          {thumb ? (
            <>
              <Image
                src={thumb}
                alt={blog.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-background/85 via-transparent to-transparent opacity-95"
              />
            </>
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-muted to-accent/15 py-10">
              <FileText className="h-10 w-10 text-accent/45" aria-hidden />
            </div>
          )}
        </Link>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex flex-wrap items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          <span>{formatBlogDateShort(blog.createdAt)}</span>
          <span aria-hidden className="opacity-35">
            ·
          </span>
          <span>{readMin} min read</span>
        </div>
        <Link href={`/blog/${blog.id}`} className="block">
          <h3 className="line-clamp-2 text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-accent">
            {blog.title}
          </h3>
        </Link>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {excerpt}
        </p>
        <div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5 truncate font-medium text-foreground/90">
            <UserCircle className="h-3.5 w-3.5 shrink-0 text-accent" aria-hidden />
            <span className="truncate">{author}</span>
          </span>
          <Link
            href={`/blog/${blog.id}`}
            className="inline-flex shrink-0 items-center gap-1 font-semibold text-accent hover:underline"
          >
            Read
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

interface BlogPagesProps {
  blogs: Blog[];
}

const BlogPages = ({ blogs }: BlogPagesProps) => {
  const [query, setQuery] = useState('');

  const sorted = useMemo(() => sortBlogsByDate(blogs), [blogs]);

  const filtered = useMemo(
    () => sorted.filter((b) => matchesQuery(b, query)),
    [sorted, query],
  );

  const featured = filtered[0];
  const rest = filtered.slice(1);
  const totalWords = useMemo(() => sorted.reduce((n, b) => n + stripHtml(b.content).split(/\s+/).filter(Boolean).length, 0), [sorted]);
  const latestLabel = sorted[0]?.createdAt ? formatBlogDateLong(sorted[0].createdAt) : '—';

  return (
    <div className="relative min-h-screen overflow-hidden bg-background pb-24 pt-[5.25rem] text-foreground">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-0 h-[520px] w-[520px] rounded-full bg-accent/[0.07] blur-[130px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-48 h-[380px] w-[380px] rounded-full bg-muted-foreground/[0.045] blur-[110px]"
      />

      <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-accent">
            Home
          </Link>
          <span className="opacity-40">/</span>
          <span className="font-medium text-foreground">Journal</span>
        </nav>

        {/* Masthead */}
        <header className="mb-12 max-w-4xl">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-accent" aria-hidden />
            Content hub
          </p>
          <h1 className="text-[2rem] font-bold tracking-tight sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
            Blog
            
          </h1>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-semibold text-muted-foreground">
              {sorted.length} article{sorted.length === 1 ? '' : 's'}
            </span>
            <span className="rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-semibold text-muted-foreground">
              ~{Math.max(1, Math.round(totalWords / 200))} min total read
            </span>
          </div>
        </header>

        <div className="mt-12 flex flex-col gap-12 xl:grid xl:grid-cols-[1fr_min(320px,32%)] xl:gap-14 xl:items-start">
          <div className="min-w-0 space-y-10">
            {/* Search */}
            <div className="relative">
              <label htmlFor="blog-archive-search" className="sr-only">
                Search articles
              </label>
              <Search
                className="pointer-events-none absolute left-4 top-1/2 z-[1] h-4 w-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
              <input
                id="blog-archive-search"
                type="search"
                placeholder="Search posts by title, author, or keywords…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoComplete="off"
                className="w-full rounded-2xl border border-border bg-card py-4 pl-12 pr-4 text-sm text-foreground shadow-sm outline-none ring-0 transition placeholder:text-muted-foreground focus:border-accent/50 focus:ring-2 focus:ring-accent/20 dark:bg-card/70"
              />
            </div>

            {!featured ? (
              <div className="rounded-2xl border border-dashed border-border bg-muted/30 px-8 py-20 text-center dark:bg-muted/10">
                <LayoutGrid className="mx-auto h-14 w-14 text-muted-foreground/35" aria-hidden />
                <p className="mt-4 text-lg font-semibold text-foreground">
                  {blogs.length === 0 ? 'No articles yet' : 'No matching articles'}
                </p>
                <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
                  {blogs.length === 0
                    ? 'Posts from your API will display here.'
                    : 'Try a broader search keyword or clear the filter.'}
                </p>
                {blogs.length > 0 && query ? (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    className="mt-8 rounded-xl border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground transition hover:border-accent/40 hover:text-accent"
                  >
                    Clear search
                  </button>
                ) : null}
              </div>
            ) : (
              <>
                <FeaturedPost blog={featured} />

                {rest.length > 0 ? (
                  <div>
                    <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                      <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                        Recent in queue
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Showing{' '}
                        <span className="font-semibold text-foreground">
                          {filtered.length}
                        </span>{' '}
                        of{' '}
                        <span className="font-semibold text-foreground">
                          {sorted.length}
                        </span>
                      </p>
                    </div>
                    <div className="grid gap-6 sm:gap-8 sm:grid-cols-2">
                      {rest.map((blog) => (
                        <ArchivePostCard key={blog.id} blog={blog} />
                      ))}
                    </div>
                  </div>
                ) : null}
              </>
            )}
          </div>

          {/* CMS-style sidebar */}
          <aside className="space-y-6 xl:sticky xl:top-28">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm dark:bg-card/70">
              <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                Desk overview
              </h3>
              <dl className="mt-4 space-y-4 text-sm">
                <div className="flex justify-between gap-4 border-b border-border pb-3">
                  <dt className="text-muted-foreground">Published</dt>
                  <dd className="font-bold text-foreground">{sorted.length}</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-border pb-3">
                  <dt className="text-muted-foreground">Visible now</dt>
                  <dd className="font-bold text-foreground">{filtered.length}</dd>
                </div>
                <div className="flex justify-between gap-4 pt-1">
                  <dt className="text-muted-foreground">Latest draft date</dt>
                  <dd className="max-w-[11rem] text-right font-semibold text-foreground">
                    {latestLabel}
                  </dd>
                </div>
              </dl>
            </div>

            <Link
              href="/"
              className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5 text-sm font-semibold shadow-sm transition hover:border-accent/35 hover:bg-accent/5 hover:text-accent dark:bg-card/60"
            >
              <ArrowRight className="h-5 w-5 rotate-180" aria-hidden />
              Back to site
            </Link>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BlogPages;

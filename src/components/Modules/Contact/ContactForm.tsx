'use client';

import React from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Mail,
  MessageSquare,
  Send,
  Shield,
  Sparkles,
} from 'lucide-react';
import { createContact, type ContactPayload } from '@/services/contactService';

type ContactFormData = ContactPayload;

const perks = [
  {
    icon: Clock,
    title: 'Quick reply',
    text: 'I usually respond within 1–2 business days.',
  },
  {
    icon: Shield,
    title: 'Direct to inbox',
    text: 'Secure SMTP delivery with your reply address preserved.',
  },
  {
    icon: Mail,
    title: 'Projects & collaborations',
    text: 'Briefs, scope, timelines, or full-time opportunities.',
  },
];

const inputBase =
  'w-full rounded-xl border border-border bg-background px-4 py-3.5 text-[15px] text-foreground shadow-sm outline-none ring-0 transition placeholder:text-muted-foreground focus:border-accent/60 focus:ring-2 focus:ring-accent/20 disabled:opacity-60 dark:bg-background/80';

function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const onSubmit = async (data: ContactFormData) => {
    const toastId = toast.loading('Sending message…');
    try {
      setIsSubmitting(true);
      const response = await createContact(data);
      toast.success(response.message, { id: toastId });
      reset();
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Failed to send message';
      toast.error(message, { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative isolate min-h-[calc(100vh-6rem)] overflow-hidden bg-background pb-20 pt-24 md:pb-28 md:pt-28">
      {/* Background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(100,116,139,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(100,116,139,0.07)_1px,transparent_1px)] bg-[length:40px_40px] dark:bg-[linear-gradient(to_right,rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.06)_1px,transparent_1px)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-20%] top-0 h-[28rem] w-[28rem] rounded-full bg-accent/15 blur-[110px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-[-10%] h-[18rem] w-[18rem] rounded-full bg-muted-foreground/10 blur-[90px]"
      />

      <div className="relative z-[1] mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <nav className="mb-10 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-accent">
            Home
          </Link>
          <span aria-hidden className="opacity-40">
            /
          </span>
          <span className="font-medium text-foreground">Contact</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14 lg:items-start">
          {/* Left column — messaging */}
          <div className="space-y-8 lg:col-span-5">
            <div className="inline-flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground shadow-sm">
                <Sparkles className="h-3.5 w-3.5 text-accent" aria-hidden />
                Say hello
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent/10 px-2.5 py-1 text-[11px] font-semibold text-accent">
                <MessageSquare className="h-3 w-3" aria-hidden />
                Inbox open
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="text-[2rem] font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.65rem] lg:leading-[1.12]">
                Let&apos;s build{' '}
                <span className="bg-gradient-to-r from-foreground via-accent to-muted-foreground bg-clip-text text-transparent dark:via-accent">
                  something sharp
                </span>
              </h1>
              <p className="max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
                Share a brief, timeline, stack, or link to a repo. I read everything and reply
                personally—like a polished product handshake, not a black hole form.
              </p>
            </div>

            <ul className="space-y-3">
              {perks.map(({ icon: Icon, title, text }) => (
                <li
                  key={title}
                  className="flex gap-3 rounded-2xl border border-border bg-card/60 p-4 shadow-sm backdrop-blur-sm dark:bg-card/40"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/12 text-accent">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <p className="font-semibold text-foreground">{title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="hidden lg:block rounded-2xl border border-dashed border-border bg-muted/30 p-6 dark:bg-muted/15">
              <p className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                Prefer another channel after first touch? Mention it in your message—we can align on
                call, Slack, or email threads.
              </p>
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-[1.5rem] border border-border bg-card/95 p-6 shadow-2xl shadow-black/[0.06] ring-1 ring-black/[0.04] backdrop-blur-xl dark:bg-card/70 dark:shadow-black/30 dark:ring-white/[0.06] sm:p-8 md:p-9">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-12 top-0 h-40 w-40 rounded-full bg-accent/15 blur-[64px]"
              />

              <div className="relative space-y-2 border-b border-border pb-8">
                <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                  Send a message
                </h2>
                <p className="text-sm text-muted-foreground">
                  Fields logically required—clear subject lines help me prioritize.
                </p>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="relative space-y-6 pt-8"
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <label
                      htmlFor="name"
                      className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground"
                    >
                      Name <span className="text-accent">*</span>
                    </label>
                    <input
                      {...register('name', { required: 'Name is required' })}
                      type="text"
                      id="name"
                      autoComplete="name"
                      className={inputBase}
                      placeholder="Your name"
                    />
                    {errors.name ? (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                        {errors.name.message}
                      </p>
                    ) : null}
                  </div>
                  <div className="sm:col-span-1">
                    <label
                      htmlFor="email"
                      className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground"
                    >
                      Email <span className="text-accent">*</span>
                    </label>
                    <input
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address',
                        },
                      })}
                      type="email"
                      id="email"
                      autoComplete="email"
                      className={inputBase}
                      placeholder="you@company.com"
                    />
                    {errors.email ? (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                        {errors.email.message}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground"
                  >
                    Message <span className="text-accent">*</span>
                  </label>
                  <textarea
                    {...register('message', { required: 'Message is required' })}
                    id="message"
                    rows={6}
                    className={`${inputBase} min-h-[10.5rem] resize-y`}
                    placeholder="Project goals, budget range, deadlines, tech stack—or just say hello."
                  />
                  {errors.message ? (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                      {errors.message.message}
                    </p>
                  ) : null}
                </div>

                <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-8 py-3.5 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/25 transition hover:bg-accent/90 hover:shadow-xl disabled:pointer-events-none disabled:opacity-60 sm:w-auto"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-accent-foreground/30 border-t-accent-foreground" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send message
                        <Send className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden />
                      </>
                    )}
                  </button>
                </div>
              </form>

              <div className="relative mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6 text-sm">
                <Link
                  href="/project"
                  className="inline-flex items-center gap-2 font-medium text-muted-foreground transition hover:text-accent"
                >
                  View work
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 font-medium text-muted-foreground transition hover:text-accent"
                >
                  Back home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactForm;

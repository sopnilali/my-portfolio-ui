import React from 'react';

interface Stat {
  value: number;
  label: string;
}

const StatsStrip = ({ stats }: { stats: Stat[] }) => {
  const visible = stats.filter((s) => s.value > 0);
  if (visible.length === 0) return null;

  return (
    <section className="relative px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
      <dl
        className="mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border shadow-xl shadow-accent/5 lg:grid-cols-4"
        data-aos="fade-up"
      >
        {visible.map((s) => (
          <div
            key={s.label}
            className="flex flex-col-reverse bg-card/90 px-6 py-7 text-center backdrop-blur-md transition-colors hover:bg-card dark:bg-card/70"
          >
            <dt className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {s.label}
            </dt>
            <dd className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              {s.value}
              <span className="text-accent">+</span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
};

export default StatsStrip;

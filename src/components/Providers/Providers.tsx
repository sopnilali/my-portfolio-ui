'use client';

import { ReactNode, useEffect, useState } from 'react';
import { Toaster } from 'sonner';

export const Providers = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setTheme(root.classList.contains('dark') ? 'dark' : 'light');
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {children}
      <Toaster
        position="top-center"
        duration={2000}
        richColors
        theme={theme}
      />
    </>
  );
};

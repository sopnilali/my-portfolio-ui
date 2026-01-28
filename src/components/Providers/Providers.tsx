'use client';

import { ReactNode } from 'react';
import { Toaster } from 'sonner';

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {children}
      <Toaster
        position="top-center"
        duration={2000}
        richColors
        theme="light"
      />
    </>
  );
};

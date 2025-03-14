'use client';

import fetcher from '@/services/fetcher';
import { ReactNode } from 'react';
import { SWRConfig } from 'swr';

export default function SwrProvider({ children }: { children: ReactNode }) {
  return <SWRConfig value={{ fetcher }}>{children}</SWRConfig>;
}

import { type ReactNode } from 'react';
import type { Metadata } from 'next';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';

export const metadata: Metadata = {
  title: {
    template: '%s | Blog',
    default: 'Blog',
  },
  description: 'Articles techniques, write-ups CTF et réflexions sur la cybersécurité',
  openGraph: {
    title: 'Blog',
    description: 'Articles techniques, write-ups CTF et réflexions sur la cybersécurité',
    type: 'website',
  },
};

export default function BlogLayout({ children }: { children: ReactNode }) {
  return <HomeLayout {...baseOptions()}>{children}</HomeLayout>;
}

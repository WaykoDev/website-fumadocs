import { type ReactNode } from 'react';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { blogSource } from '@/lib/blog-source';

export default function BlogArticleLayout({ children }: { children: ReactNode }) {
  // Remove links from options to avoid duplication with main navbar
  // Keep nav and other options from baseOptions
  const { links: _, ...options } = baseOptions();

  return (
    <DocsLayout
      tree={blogSource.pageTree}
      {...options}
      // Sidebar is enabled by default in DocsLayout
      // Mobile navbar with hamburger button is also enabled by default
    >
      {children}
    </DocsLayout>
  );
}

import { type ReactNode } from 'react';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { blogSource } from '@/lib/blog-source';

export default function BlogArticleLayout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={blogSource.pageTree}
      {...baseOptions()}
    >
      {children}
    </DocsLayout>
  );
}

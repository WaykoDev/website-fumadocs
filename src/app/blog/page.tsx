import { Suspense } from "react";
import { getSerializableBlogPosts, getAllTags } from "@/lib/blog-source";
import { BlogPageClient } from "@/components/blog/BlogPageClient";
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';

export default function BlogPage() {
  const posts = getSerializableBlogPosts();
  const tags = getAllTags();

  return (
    <HomeLayout {...baseOptions()}>
      <Suspense fallback={<div className="min-h-screen" />}>
        <BlogPageClient posts={posts} tags={tags} />
      </Suspense>
    </HomeLayout>
  );
}
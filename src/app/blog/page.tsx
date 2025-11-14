import { Suspense } from "react";
import { getSerializableBlogPosts, getAllTags } from "@/lib/blog-source";
import { BlogPageClient } from "@/components/blog/BlogPageClient";

export default function BlogPage() {
  const posts = getSerializableBlogPosts();
  const tags = getAllTags();

  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <BlogPageClient posts={posts} tags={tags} />
    </Suspense>
  );
}
"use client";

import { useSearchParams } from "next/navigation";
import { BlogList } from "./BlogList";
import { type SerializableBlogPost } from "@/lib/blog-source";

interface BlogPageClientProps {
  posts: SerializableBlogPost[];
  tags: string[];
}

export function BlogPageClient({ posts, tags }: BlogPageClientProps) {
  const searchParams = useSearchParams();
  const tagFromUrl = searchParams.get('tag');
  return (
    <>
      <style jsx global>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }

        .gradient-text {
          background: linear-gradient(
            90deg,
            #a78bfa 0%,
            #ec4899 50%,
            #a78bfa 100%
          );
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradient-shift 3s ease infinite;
        }

        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>

      <div className="container px-4 py-8 sm:px-6 md:px-8">
        <BlogList posts={posts} tags={tags} initialTag={tagFromUrl} />
      </div>
    </>
  );
}

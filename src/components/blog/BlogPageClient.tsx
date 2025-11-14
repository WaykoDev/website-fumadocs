"use client";

import { useSearchParams } from "next/navigation";
import StarfieldBackground from "@/components/StarfieldBackground";
import NoScroll from "@/components/NoScroll";
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
      <StarfieldBackground />
      <NoScroll />

      <style jsx global>{`
        /* Hide scrollbar */
        html, body {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        html::-webkit-scrollbar,
        body::-webkit-scrollbar {
          display: none;
        }

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

      <div className="min-h-screen px-4 py-16 sm:px-6 md:px-8">
        {/* Hero Section */}
        <header className="max-w-7xl mx-auto space-y-6 text-center animate-fade-in-up mb-12">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight gradient-text">
            Blog
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Write-ups, articles techniques, réflexions et updates de projets en cybersécurité
          </p>
        </header>

        <BlogList posts={posts} tags={tags} initialTag={tagFromUrl} />
      </div>
    </>
  );
}

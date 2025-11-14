"use client";

import { useState, useMemo, useEffect } from "react";
import { type SerializableBlogPost } from "@/lib/blog-source";
import { BlogCard } from "./BlogCard";
import { TagBadge } from "./TagBadge";
import { Search } from "lucide-react";

interface BlogListProps {
  posts: SerializableBlogPost[];
  tags: string[];
  initialTag?: string | null;
}

export function BlogList({ posts, tags, initialTag }: BlogListProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(initialTag || null);
  const [searchQuery, setSearchQuery] = useState("");

  // Update selected tag when initialTag changes
  useEffect(() => {
    if (initialTag) {
      setSelectedTag(initialTag);
    }
  }, [initialTag]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesTag = !selectedTag || post.tags?.includes(selectedTag);
      const matchesSearch = !searchQuery ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTag && matchesSearch;
    });
  }, [posts, selectedTag, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto space-y-12">
      {/* Search Bar */}
      <div className="max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un article..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-black text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          />
        </div>
      </div>

      {/* Tags Filter */}
      {tags.length > 0 && (
        <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <h2 className="text-sm font-mono uppercase tracking-wider text-gray-500 text-center">
            Filtrer par tag
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            <TagBadge
              tag="Tous"
              onClick={() => setSelectedTag(null)}
              active={!selectedTag}
            />
            {tags.map((tag) => (
              <TagBadge
                key={tag}
                tag={tag}
                onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                active={tag === selectedTag}
              />
            ))}
          </div>
        </div>
      )}

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
            <div key={post.url} style={{ animationDelay: `${0.4 + index * 0.05}s` }} className="animate-fade-in-up">
              <BlogCard post={post} />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-gray-500">
            Aucun article trouvé
          </div>
        )}
      </div>

      {/* Stats */}
      {posts.length > 0 && (
        <div className="pt-8 text-center text-sm font-mono text-gray-500 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
          {filteredPosts.length} / {posts.length} articles
        </div>
      )}
    </div>
  );
}

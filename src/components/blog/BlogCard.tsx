"use client";

import Link from "next/link";
import { type SerializableBlogPost } from "@/lib/blog-source";
import { formatDate, getTagColor } from "@/lib/blog-utils";
import { Clock, Calendar } from "lucide-react";

interface BlogCardProps {
  post: SerializableBlogPost;
  readingTime?: number;
}

export function BlogCard({ post, readingTime }: BlogCardProps) {
  const { title, description, date, tags, image } = post;

  return (
    <Link
      href={post.url}
      className="group relative block overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-2"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent pointer-events-none" />

      {/* Image */}
      {image && (
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-purple-900/20 to-black">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      )}

      <div className="p-6 space-y-4">
        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className={`px-3 py-1 text-xs font-mono rounded-full border ${getTagColor(tag)} transition-all duration-300 group-hover:scale-105`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h3 className="text-xl font-bold tracking-tight group-hover:text-purple-500 transition-colors duration-300">
          {title}
        </h3>

        {/* Description */}
        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {description}
          </p>
        )}

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500 font-mono">
          {date && (
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(date)}</span>
            </div>
          )}
          {readingTime && (
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{readingTime} min</span>
            </div>
          )}
        </div>

        {/* Hover indicator */}
        <div className="flex items-center gap-2 text-sm font-medium text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span>Lire l'article</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </div>
      </div>
    </Link>
  );
}

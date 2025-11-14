"use client";

import Link from "next/link";
import { getTagColor } from "@/lib/blog-utils";

interface LinkTagBadgeProps {
  tag: string;
}

export function LinkTagBadge({ tag }: LinkTagBadgeProps) {
  const colorClass = getTagColor(tag);

  return (
    <Link
      href={`/blog?tag=${encodeURIComponent(tag)}`}
      className={`
        inline-block px-4 py-2 text-sm font-mono rounded-full border transition-all duration-300
        ${colorClass}
        cursor-pointer hover:scale-110 hover:shadow-lg
      `}
    >
      {tag}
    </Link>
  );
}

"use client";

import { getTagColor } from "@/lib/blog-utils";

interface TagBadgeProps {
  tag: string;
  onClick?: () => void;
  active?: boolean;
}

export function TagBadge({ tag, onClick, active }: TagBadgeProps) {
  const colorClass = getTagColor(tag);

  return (
    <button
      onClick={onClick}
      disabled={!onClick}
      className={`
        px-4 py-2 text-sm font-mono rounded-full border transition-all duration-300
        ${colorClass}
        ${onClick ? 'cursor-pointer hover:scale-110 hover:shadow-lg' : 'cursor-default'}
        ${active ? 'ring-2 ring-purple-500 scale-105' : ''}
      `}
    >
      {tag}
    </button>
  );
}

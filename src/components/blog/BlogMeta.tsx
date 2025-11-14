import { Calendar, Clock, User } from "lucide-react";
import { formatDate } from "@/lib/blog-utils";

interface BlogMetaProps {
  author?: string;
  date?: string | Date;
  readingTime?: number;
}

export function BlogMeta({ author, date, readingTime }: BlogMetaProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-gray-600 dark:text-gray-400 font-mono">
      {author && (
        <div className="flex items-center gap-2">
          <User className="w-4 h-4" />
          <span>{author}</span>
        </div>
      )}
      {date && (
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <time dateTime={typeof date === 'string' ? date : date.toISOString()}>
            {formatDate(date)}
          </time>
        </div>
      )}
      {readingTime && (
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>{readingTime} min de lecture</span>
        </div>
      )}
    </div>
  );
}

import { blog } from '@/.source';
import { type InferPageType, loader } from 'fumadocs-core/source';

export const blogSource = loader({
  baseUrl: '/blog',
  source: blog.toFumadocsSource(),
});

export type BlogPost = InferPageType<typeof blogSource>;

// Serializable type for passing to client components
export type SerializableBlogPost = {
  url: string;
  slugs: string[];
  title: string;
  description?: string;
  author?: string;
  date?: string | Date;
  tags?: string[];
  image?: string;
  excerpt?: string;
};

export function getAllBlogPosts(): BlogPost[] {
  return blogSource.getPages().sort((a, b) => {
    const dateA = new Date(a.data.date || 0).getTime();
    const dateB = new Date(b.data.date || 0).getTime();
    return dateB - dateA; // Most recent first
  });
}

export function serializeBlogPost(post: BlogPost): SerializableBlogPost {
  return {
    url: post.url,
    slugs: post.slugs,
    title: post.data.title,
    description: post.data.description,
    author: post.data.author,
    date: post.data.date,
    tags: post.data.tags,
    image: post.data.image,
    excerpt: post.data.excerpt,
  };
}

export function getSerializableBlogPosts(): SerializableBlogPost[] {
  return getAllBlogPosts().map(serializeBlogPost);
}

export function getBlogPostsByTag(tag: string): BlogPost[] {
  return getAllBlogPosts().filter((post) =>
    post.data.tags?.includes(tag)
  );
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  getAllBlogPosts().forEach((post) => {
    post.data.tags?.forEach((tag: string) => tags.add(tag));
  });
  return Array.from(tags).sort();
}

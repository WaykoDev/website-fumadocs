import { notFound } from "next/navigation";
import { blogSource, getAllBlogPosts } from "@/lib/blog-source";
import { BlogMeta } from "@/components/blog/BlogMeta";
import { LinkTagBadge } from "@/components/blog/LinkTagBadge";
import defaultMdxComponents from "fumadocs-ui/mdx";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import "./blog-post.css";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = blogSource.getPage([slug]);

  if (!page) {
    notFound();
  }

  const { title, description, author, date, tags } = page.data;
  const MDX = page.data.body;
  const readingTime = 5; // You can calculate this from content if needed

  return (
    <div className="min-h-screen">
        {/* Back button */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-purple-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour au blog
          </Link>
        </div>

        {/* Hero Section */}
        <header className="gradient-hero py-12 sm:py-16 px-4 sm:px-6 md:px-8">
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              {title}
            </h1>
            {description && (
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400">
                {description}
              </p>
            )}
            <BlogMeta author={author} date={date} readingTime={readingTime} />
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-4">
                {tags.map((tag) => (
                  <LinkTagBadge key={tag} tag={tag} />
                ))}
              </div>
            )}
          </div>
        </header>

        {/* Content */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-12">
          <div className="prose prose-neutral dark:prose-invert">
            <MDX components={defaultMdxComponents} />
          </div>
        </article>
      </div>
  );
}

export async function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({
    slug: post.slugs[0],
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = blogSource.getPage([slug]);

  if (!page) {
    return {};
  }

  const { title, description, author, date, tags, image } = page.data;

  return {
    title: `${title} | Blog`,
    description: description || `Article de blog par ${author || 'Franck Chevalier'}`,
    authors: [{ name: author || 'Franck Chevalier' }],
    keywords: tags || [],
    openGraph: {
      title,
      description: description || '',
      type: 'article',
      publishedTime: date ? new Date(date).toISOString() : undefined,
      authors: [author || 'Franck Chevalier'],
      tags: tags || [],
      images: image ? [{ url: image }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: description || '',
      images: image ? [image] : [],
    },
  };
}
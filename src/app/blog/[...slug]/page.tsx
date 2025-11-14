import { notFound } from "next/navigation";
import { blogSource, getAllBlogPosts } from "@/lib/blog-source";
import { BlogMeta } from "@/components/blog/BlogMeta";
import { LinkTagBadge } from "@/components/blog/LinkTagBadge";
import defaultMdxComponents from "fumadocs-ui/mdx";
import "./blog-post.css";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const page = blogSource.getPage(slug);

  if (!page) {
    notFound();
  }

  const { title, description, author, date, tags } = page.data;
  const MDX = page.data.body;
  const readingTime = 5; // You can calculate this from content if needed

  return (
    <div className="w-full">
      {/* Hero Header - Mobile First */}
      <header className="gradient-hero py-6 px-4 sm:py-8 sm:px-6 md:py-12 md:px-8 mb-6 sm:mb-8">
        <div className="max-w-4xl space-y-3 sm:space-y-4 md:space-y-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight break-words">
            {title}
          </h1>
          {description && (
            <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400">
              {description}
            </p>
          )}
          <div className="pt-2">
            <BlogMeta author={author} date={date} readingTime={readingTime} />
          </div>
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <LinkTagBadge key={tag} tag={tag} />
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Content - Mobile First */}
      <article className="prose prose-neutral dark:prose-invert w-full max-w-none md:max-w-4xl px-4 sm:px-6 md:px-8 pb-8 prose-sm sm:prose-base">
        <MDX components={defaultMdxComponents} />
      </article>
    </div>
  );
}

export async function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({
    slug: post.slugs,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const page = blogSource.getPage(slug);

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
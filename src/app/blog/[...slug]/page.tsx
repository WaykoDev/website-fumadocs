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

  const { description, author, date, tags } = page.data;
  const MDX = page.data.body;
  const readingTime = 5; // You can calculate this from content if needed

  return (
    <>
      {/* Article Metadata */}
      <div className="mb-8 space-y-4 border-b pb-6">
        {description && (
          <p className="text-lg text-muted-foreground">
            {description}
          </p>
        )}
        <BlogMeta author={author} date={date} readingTime={readingTime} />
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <LinkTagBadge key={tag} tag={tag} />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <MDX components={defaultMdxComponents} />
    </>
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
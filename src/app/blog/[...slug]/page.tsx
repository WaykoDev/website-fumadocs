import { notFound } from "next/navigation";
import { blogSource, getAllBlogPosts } from "@/lib/blog-source";
import { BlogMeta } from "@/components/blog/BlogMeta";
import { LinkTagBadge } from "@/components/blog/LinkTagBadge";
import { getMDXComponents } from "@/mdx-components";

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
    <div className="w-full min-h-screen">
      {/* Hero Header - Mobile First with Tailwind gradient */}
      <header className="relative w-full py-6 px-4 sm:py-8 sm:px-6 md:py-12 md:px-8 mb-6 sm:mb-8 bg-gradient-to-br from-violet-500/10 via-pink-500/10 to-transparent border-b border-violet-500/20">
        <div className="max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto space-y-3 sm:space-y-4 md:space-y-6">
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

      {/* Content - Mobile First with proper constraints, expanding on ultra-wide screens */}
      <article className="w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pb-8">
        {/*
          Prose wrapper with responsive sizing and proper overflow handling
          - Mobile (default): Full width with padding
          - Desktop: Max 4xl centered
          - Large screens (lg): Max 5xl
          - Extra large (xl): Max 6xl
          - Ultra-wide (2xl): Max 7xl
          - All viewports: Proper image and code block handling
        */}
        <div className="prose prose-neutral dark:prose-invert prose-sm sm:prose-base max-w-none
                        prose-headings:font-bold prose-headings:tracking-tight
                        prose-h1:text-3xl prose-h1:sm:text-4xl prose-h1:mb-6
                        prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-4
                        prose-h3:text-xl prose-h3:sm:text-2xl prose-h3:mt-8 prose-h3:mb-3
                        prose-p:leading-7 prose-p:mb-4
                        prose-a:text-violet-500 prose-a:no-underline prose-a:underline-offset-4 hover:prose-a:text-violet-600 prose-a:transition-colors
                        prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:bg-gray-100 prose-code:dark:bg-gray-800 prose-code:text-sm prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
                        prose-pre:rounded-lg prose-pre:p-4 prose-pre:overflow-x-auto prose-pre:max-w-full
                        prose-pre:bg-gray-50 prose-pre:dark:bg-gray-900
                        prose-img:rounded-lg prose-img:my-8 prose-img:shadow-xl prose-img:max-w-full prose-img:h-auto
                        prose-blockquote:border-l-4 prose-blockquote:border-violet-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:my-6 prose-blockquote:text-gray-600 prose-blockquote:dark:text-gray-400
                        prose-ul:my-6 prose-ol:my-6
                        prose-li:my-2 prose-li:leading-7
                        prose-table:w-full prose-table:my-6 prose-table:overflow-x-auto prose-table:block prose-table:max-w-full
                        prose-th:bg-gray-100 prose-th:dark:bg-gray-800 prose-th:px-4 prose-th:py-2 prose-th:font-semibold prose-th:text-left
                        prose-td:border-t prose-td:border-gray-200 prose-td:dark:border-gray-700 prose-td:px-4 prose-td:py-2">
          <MDX components={getMDXComponents()} />
        </div>
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

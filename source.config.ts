import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
  metaSchema,
} from 'fumadocs-mdx/config';
import { z } from 'zod';

// You can customise Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.dev/docs/mdx/collections
export const docs = defineDocs({
  docs: {
    schema: frontmatterSchema,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

// Blog collection with custom schema
export const blog = defineDocs({
  dir: 'content/blog',
  docs: {
    schema: frontmatterSchema.extend({
      author: z.string().default('Franck Chevalier'),
      date: z.string().or(z.date()),
      tags: z.array(z.string()).default([]),
      image: z.string().optional(),
      excerpt: z.string().optional(),
    }),
  },
});

export default defineConfig({
  mdxOptions: {
    // MDX options
  },
});

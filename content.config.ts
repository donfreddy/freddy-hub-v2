import { defineCollection, defineContentConfig, z } from '@nuxt/content';

const locales = ['fr', 'en'];

const articleSchema = z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty(),
  slug: z.string().nonempty(),
  tags: z.array(z.string()).nonempty(),
  readingTime: z.number().min(0), // in minutes
  published: z.boolean(),
  publishedAt: z.date(),
  updatedAt: z.date(),
});

const baseSchema = {
  name: z.string().nonempty(),
  description: z.string().nonempty(),
  url: z.string().url(),
  thumbnail: z.string().url(),
};

const projectSchema = z.object(baseSchema);

const useSchema = z.object({
  ...baseSchema,
  category: z.string().nonempty(),
});

export default defineContentConfig({
  collections: Object.fromEntries(
    locales.flatMap((locale) => [
      [
        `articles_${locale}`,
        defineCollection({
          source: `${locale}/articles/**/*`,
          type: 'page',
          schema: articleSchema,
        }),
      ],
      [
        `projects_${locale}`,
        defineCollection({
          source: `${locale}/projects/**.json`,
          type: 'data',
          schema: projectSchema,
        }),
      ],
      [
        `uses_${locale}`,
        defineCollection({
          source: `${locale}/uses/**.json`,
          type: 'data',
          schema: useSchema,
        }),
      ],
    ]),
  ),
});

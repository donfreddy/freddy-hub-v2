import { defineCollection, defineContentConfig, z } from "@nuxt/content";

const locales = ["fr", "en"];

export default defineContentConfig({
  collections: Object.fromEntries(
    locales.flatMap((locale) => [
      [
        `articles_${locale}`,
        defineCollection({
          source: `${locale}/articles/*.md`,
          type: "page",
          schema: z.object({
            title: z.string(),
            description: z.string(),
            slug: z.string(),
            tags: z.array(z.string()),
            readingTime: z.number(), // in minutes
            published: z.boolean(),
            publishedAt: z.date(),
            updatedAt: z.date(),
          }),
        }),
      ],
      [
        `projects_${locale}`,
        defineCollection({
          source: `${locale}/projects/*.json`,
          type: "data",
          schema: z.object({
            name: z.string(),
            description: z.string(),
            url: z.string().url(),
            thumbnail: z.string(),
            stack: z.array(z.string()),
            status: z.string(),
            duration: z.string(), // in months
            opensource: z.boolean(),
          }),
        }),
      ],
    ])
  ),
});

import { z, defineCollection } from 'astro:content';

// Blog コレクションのスキーマ
const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
  }),
});

// コレクションのエクスポート
export const collections = {
  blog: blogCollection,
};

// src/content/config.ts
import * as astroContent from 'astro:content';
import { z } from 'zod';

console.log('astroContent:', astroContent); // デバッグ用

// Blog コレクションの定義
const blogCollection = astroContent.defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    slug: z.string(),
  }),
});

// Store コレクションの定義
const storeCollection = astroContent.defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    custom_link_label: z.string(),
    custom_link: z.string(),
    updatedDate: z.coerce.date(),
    pubDate: z.coerce.date(),
    price: z.number().optional(),
    image: z.string().optional(),
  }),
});

// コレクションをエクスポート
export default astroContent.defineConfig({
  collections: {
    blog: blogCollection,
    store: storeCollection,
  },
});

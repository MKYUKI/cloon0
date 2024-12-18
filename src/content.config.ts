// src/content/config.ts
import { defineConfig, defineCollection } from 'astro:content';
import { z } from 'zod';

console.log('defineConfig:', defineConfig);
console.log('defineCollection:', defineCollection);
console.log('z:', z);

// Blog コレクションの定義
const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    slug: z.string(), // slug フィールドを必須に追加
  }),
});

// Store コレクションの定義（必要に応じて）
const storeCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    custom_link_label: z.string(),
    custom_link: z.string(),
    updatedDate: z.coerce.date(),
    pubDate: z.coerce.date(),
    price: z.number().optional(), // 一部ファイルに存在
    image: z.string().optional(), // 一部ファイルに存在
  }),
});

// コレクションをエクスポート
export default defineConfig({
  collections: {
    blog: blogCollection,
    store: storeCollection, // store コレクションを追加（必要な場合）
  },
});

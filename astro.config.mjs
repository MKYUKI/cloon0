import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import rss from '@astrojs/rss';

export default defineConfig({
  site: 'https://cloon0.onrender.com', // サイトURLを設定
  integrations: [
    tailwind(), // TailwindCSS
    sitemap(),  // サイトマップ生成
    rss({
      title: 'Masaki KusakaのWebサイト', // RSSフィードのタイトル
      description: '革新的なウェブサイトです。', // RSSの説明
      site: 'https://cloon0.onrender.com', // サイトURL
      items: [], // RSSアイテム (後で実装する)
    }),
  ],
});

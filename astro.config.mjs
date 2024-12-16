import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import rss from '@astrojs/rss';

// Astro設定の定義
export default defineConfig({
  site: 'https://cloon0.onrender.com',
  integrations: [
    tailwind(), // TailwindCSSの統合
    sitemap(),  // サイトマップの生成
    rss(),      // RSSフィードの生成
  ],
});

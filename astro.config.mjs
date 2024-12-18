// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import rss from '@astrojs/rss';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  integrations: [
    tailwind(),
    mdx(),
    rss({
      title: 'My Astro Site RSS Feed',
      description: 'This is my Astro site RSS feed.',
      site: 'https://your-site-url.com', // あなたのサイトのURLに置き換えてください
      items: [], // 初期アイテムリスト
    }),
    sitemap(),
  ],
  // その他の設定があればここに追加
});

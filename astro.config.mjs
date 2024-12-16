import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import rss from '@astrojs/rss';

export default defineConfig({
  site: 'https://ultimate-fusion-appp.vercel.app',
  integrations: [
    mdx(),
    tailwind(),
    sitemap(),
    rss({
      title: 'Masaki Kusakaのブログ',
      description: 'AIと最新技術に関するブログ',
      site: 'https://ultimate-fusion-appp.vercel.app',
      items: [], // RSSアイテムを適切に設定
    }),
  ],
  output: 'static',
});

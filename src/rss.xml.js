// src/pages/rss.xml.js
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export const get = async () => rss({
  title: 'Masaki Kusakaのブログ',
  description: 'AIと最新技術に関するブログ',
  site: 'https://ultimate-fusion-appp.vercel.app',
  items: await getCollection('blog', (post) => ({
    title: post.title,
    description: post.description,
    link: `/blog/${post.slug}`,
    pubDate: new Date(post.pubDate),
  })),
});

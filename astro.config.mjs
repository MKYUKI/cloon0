import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import rss from '@astrojs/rss';

export default defineConfig({
  site: 'https://cloon0-a9jshjmzu-mkyukis-projects.vercel.app', // サイトURL
  integrations: [
    tailwind(),
    sitemap(),
    rss({
      title: '日下真旗のWebポートフォリオ',
      description: '革新的なウェブサイトです。',
      items: async () => {
        const posts = await getCollection('blog');
        return posts.map(post => ({
          title: post.data.title,
          description: post.data.description,
          link: `/blog/${post.slug}/`,
          pubDate: post.data.pubDate,
        }));
      },
    }),
  ],
});

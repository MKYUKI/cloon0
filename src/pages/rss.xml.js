<<<<<<< HEAD
import { getCollection } from 'astro:content';

export async function get() {
  const posts = await getCollection('blog');
  const items = posts.map(post => `
    <item>
      <title>${post.title}</title>
      <link>https://cloon0.onrender.com/blog/${post.slug}</link>
      <description><![CDATA[${post.description}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>
  `).join('');

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Masaki Kusakaのブログ</title>
    <link>https://cloon0.onrender.com/blog</link>
    <description>AIと最新技術に関するブログ</description>
    ${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml'
    }
=======
import rss from "@astrojs/rss";
import { SITE_TITLE, SITE_DESCRIPTION } from "../config";
import { getCollection } from "astro:content";

export async function get(context) {
  const blog = await getCollection("blog");
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: import.meta.env.SITE,
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/blog/${post.slug}/`,
    })),
>>>>>>> 5fba342566a3dfb07e8f78f17c39f74baccd2a3b
  });
}

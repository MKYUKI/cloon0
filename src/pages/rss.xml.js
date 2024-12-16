import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function get() {
  const posts = await getCollection("blog");

  return rss({
    title: "Masaki Kusakaのブログ",
    description: "AIと最新技術に関するブログ",
    site: import.meta.env.SITE || "https://cloon0.onrender.com",
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: new Date(post.data.pubDate).toUTCString(),
      description: post.data.description,
      link: `/blog/${post.slug}/`,
    })),
  });
}

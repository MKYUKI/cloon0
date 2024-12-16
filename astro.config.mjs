import { defineConfig } from 'astro/config';
<<<<<<< HEAD
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  build: {
    target: 'esnext',
  },
});
=======
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: 'https://astrofy-template.netlify.app',
  integrations: [mdx(), sitemap(), tailwind()]
});
>>>>>>> 5fba342566a3dfb07e8f78f17c39f74baccd2a3b

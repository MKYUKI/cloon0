import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import rss from '@astrojs/rss';

export default defineConfig({
  site: 'https://ultimate-fusion-appp.vercel.app',
  output: 'static', // 静的サイトとして出力
  integrations: [
    mdx(), // MDXのプラグイン
    rss({
      title: 'Masaki Kusaka Blog',
      description: '日下真旗の技術ブログ',
      site: 'https://ultimate-fusion-appp.vercel.app', // ベースURL
      items: [
        {
          title: '日下真旗のポートフォリオと職務経歴',
          description: 'Pythonと最新技術を駆使して社会を変える未来志向のエンジニア。',
          pubDate: new Date('2024-12-16'),
          link: '/blog/post1',
        },
        {
          title: '今後の目標と技術的挑戦',
          description: '社会に貢献するためのスキル向上への取り組み。',
          pubDate: new Date('2024-12-16'),
          link: '/blog/post2',
        },
        {
          title: 'AIと倫理',
          description: 'AIの進化に伴う倫理的課題とその解決に向けた取り組みについて。',
          pubDate: new Date('2024-12-18'),
          link: '/blog/post3',
        },
      ],
    }),
  ],
  build: {
    outDir: 'dist', // 出力先を指定
  },
});

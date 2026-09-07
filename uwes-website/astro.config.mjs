// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import { generateArticleCovers, validateArticlePdfs } from './src/lib/generate-article-covers.mjs';

function articleCovers() {
  return {
    name: 'article-covers',
    hooks: {
      'astro:config:setup': async () => {
        await validateArticlePdfs();
        await generateArticleCovers();
      },
    },
  };
}

export default defineConfig({
  site: 'https://uweconsoc.ca',
  base: '/',
  output: 'static',
  integrations: [icon(), articleCovers()],
  vite: {
    plugins: [tailwindcss()],
  },
});

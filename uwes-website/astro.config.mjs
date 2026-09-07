// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://uweconsoc.ca',
  base: '/',
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});

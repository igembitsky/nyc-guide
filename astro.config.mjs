import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://igembitsky.github.io',
  base: '/nyc-guide/',
  output: 'static',
  build: {
    assets: '_assets',
  },
});

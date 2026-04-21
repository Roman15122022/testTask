import { defineConfig } from 'vite';

export default defineConfig({
  base: '/testTask/',
  resolve: {
    alias: {
      '@': new URL('./src', import.meta.url).pathname,
    },
  },
});

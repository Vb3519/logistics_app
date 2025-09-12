import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/logistics_app/',
  server: {
    proxy: {},
    watch: {
      ignored: ['**/logistics_appData.json'],
    },
  },
  resolve: {
    alias: {
      app: '/src/app',
      pages: '/src/pages',
      shared: '/src/shared',
      types: '/src/types',
    },
  },
});

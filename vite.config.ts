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
});

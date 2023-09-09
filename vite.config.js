import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import VitePluginHtmlEnv from 'vite-plugin-html-env';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePluginHtmlEnv()],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/client')
    }
  },
  server: {
    port: 3000,
    open: false,
    proxy: process.env.NODE_ENV
  }
});

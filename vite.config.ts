import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/youth-values/',
  css: {
    /* CSS 预处理器 */
    preprocessorOptions: {
      scss: {
        additionalData: '@import "src/style/global.scss";',
      },
    },
  },
  resolve: {
    alias: {
      '~': __dirname,
      '@': path.resolve(__dirname, 'src'),
    },
  },
});

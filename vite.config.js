import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: '/src',
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          '@primary-color': '#005f73', // Azul petróleo oscuro para VRISA
          '@link-color': '#0a9396',   // Verde azulado para enlaces
          '@layout-header-background': '#ffffff',
          '@border-radius-base': '4px',
        },
      },
    },
  },
});

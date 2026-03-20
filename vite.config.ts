import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom', 
      'lucide-react',
      'uuid'
    ]
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    cssMinify: true,
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'],
          'router': ['react-router-dom'],
          'ui': ['lucide-react'],
          'i18n': ['i18next', 'react-i18next'],
          'email': ['@emailjs/browser'],
          'utils': ['uuid']
        }
      }
    }
  },
  server: {
    port: 5173,
    host: true,
    hmr: {
      overlay: true
    },
    watch: {
      usePolling: true
    }
  }
});
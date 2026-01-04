import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'gsap', 'three', 'lenis'],
  },
  
  build: {
    target: 'es2020',
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-animation': ['framer-motion', 'gsap'],
          'vendor-three': ['three'],
          'vendor-utils': ['lenis', 'lucide-react'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: false,
  },
  
  server: {
    hmr: {
      overlay: true,
    },
  },
  
  css: {
    devSourcemap: true,
  },
});

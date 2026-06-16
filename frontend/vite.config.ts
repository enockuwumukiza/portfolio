// vite.config.js (ESM)
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    // Target modern browsers — smaller bundle, native ESM
    target: ['es2020', 'chrome90', 'firefox88', 'safari14'],
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Source maps in production for debugging (inline source maps disabled for size)
    sourcemap: false,
    rollupOptions: {
      output: {
        // Fine-grained manual chunks for optimal caching
        manualChunks: {
          // React core — changes rarely, cache long
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // Animation — framer-motion is large but stable
          'vendor-motion': ['framer-motion'],
          // Particles — biggest chunk, isolated so it doesn't pollute main
          'vendor-particles': ['@tsparticles/react', '@tsparticles/slim', '@tsparticles/engine'],
          // Form layer
          'vendor-forms': ['react-hook-form', '@hookform/resolvers', 'zod'],
          // TanStack Query — data fetching
          'vendor-query': ['@tanstack/react-query'],
          // Utilities — lenis, react-helmet, etc.
          'vendor-utils': ['lenis', 'react-helmet-async', 'clsx', 'tailwind-merge'],
        },
        // Deterministic chunk filenames for better CDN caching
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    chunkSizeWarningLimit: 600,
  },
});

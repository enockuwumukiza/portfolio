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
    rollupOptions: {
      output: {
        manualChunks: {
          // React core
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // Animation
          'vendor-motion': ['framer-motion'],
          // Particles (biggest chunk – isolated)
          'vendor-particles': ['@tsparticles/react', '@tsparticles/slim', '@tsparticles/engine'],
          // Form layer
          'vendor-forms': ['react-hook-form', '@hookform/resolvers', 'zod'],
          // Utilities
          'vendor-utils': ['lenis', 'react-helmet-async'],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
});

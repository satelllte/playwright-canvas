import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'ES2022', // This is required to support top-level await for "three/webgpu" stuff
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'ES2022', // This is required to support top-level await in development
    },
  },
});

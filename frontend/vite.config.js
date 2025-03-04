import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    base: '/',
    server: {
      historyApiFallback: true,
    },
    define: {
      'import.meta.env': {
        VITE_BACKEND_URL: env.VITE_BACKEND_URL,
        VITE_FRONTEND_URL: env.VITE_FRONTEND_URL,
      },
    },
  };
});

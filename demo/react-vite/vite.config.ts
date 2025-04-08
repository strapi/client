import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

import path from 'node:path';
import { defineConfig, loadEnv } from 'vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    server: { port: 5174 },
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    // Note: vite expects its env variables to be defined using VITE_XXX. To circumvent this, we define global
    // variable to mimic what is done in other demos as tokens are saved in the .env file with predefined names.
    // This is a hack and shouldn't be used in real applications
    define: {
      'process.env.FULL_ACCESS_TOKEN': JSON.stringify(env.FULL_ACCESS_TOKEN),
      'process.env.READ_ONLY_TOKEN': JSON.stringify(env.READ_ONLY_TOKEN),
    },
  };
});

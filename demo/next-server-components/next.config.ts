import type { NextConfig } from 'next';
import path from 'node:path';

const nextConfig: NextConfig = {
  // Ensure Turbo-pack compatibility with Next's module loading
  // See https://github.com/vercel/next.js/issues/64472#issuecomment-2077483493
  outputFileTracingRoot: path.join(__dirname, '../../'),

  // Logs outbounds requests, including ones restored from the HMR cache
  logging: {
    fetches: {
      fullUrl: true,
      hmrRefreshes: true,
    },
  },

  // Allow images from Strapi server. `dangerouslyAllowLocalIP` is required because
  // the image optimizer resolves localhost to 127.0.0.1 / ::1, which Next blocks by
  // default (SSRF). Safe here: demo only, fixed Strapi origin in remotePatterns.
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;

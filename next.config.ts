import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    // The project uses TypeScript 5.9; the compiler API avoids the CLI capture
    // issue of the managed Node 24 runner during `next build`.
    useTypeScriptCli: false,
  },
};

export default nextConfig;

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  webpack: (config) => {
    const fileLoaderRule = config.module.rules.find(
      (rule: { test?: { test?: (path: string) => boolean } }) => rule.test?.test?.('.svg'),
    );
    fileLoaderRule.exclude = /\.svg$/i;

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: { and: [/\.(ts|tsx|js|jsx|md|mdx)$/] },
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

export default nextConfig;

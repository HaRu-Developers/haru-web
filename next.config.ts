import type { NextConfig } from 'next';

import type { RuleSetRule } from 'webpack';

const nextConfig: NextConfig = {
  // Turbopack 설정:
  // `next dev --turbopack`으로 실행할 때 적용됩니다.
  // Next.js 15에서 '@svgr/webpack'이 Turbopack과 어떻게 정확히 통합되는지는
  // 공식 문서의 최신 업데이트를 확인하는 것이 가장 좋습니다.
  // 현재 설정은 SVG를 JS 모듈로 변환하는 일반적인 방식이지만,
  // React 컴포넌트로 가져오기 위한 `@svgr/webpack`의 전체 기능을 반영하지 않을 수 있습니다.
  // 그러나 일단은 Turbopack이 활성화되었을 때 이 규칙을 사용합니다.
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js', // '@svgr/webpack'은 SVG를 JS(JSX) 모듈로 변환하므로 이 부분은 유지합니다.
      },
    },
  },

  // Webpack 설정:
  // `next build` 시에 적용되며, `next dev` (Turbopack 비활성화 시)에도 적용됩니다.
  webpack: (config, { isServer: _ }) => {
    const fileLoaderRule = config.module.rules.find(
      (rule: unknown): rule is RuleSetRule =>
        typeof rule === 'object' &&
        rule !== null &&
        'test' in rule &&
        String(rule.test).includes('svg'),
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      },
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};
export default nextConfig;

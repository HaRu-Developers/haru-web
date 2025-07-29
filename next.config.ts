import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },

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
  webpack: (config, { isServer }) => {
    /*
    // ** 노코/박수현 ver.

		// 1. 기존 SVG 처리 규칙을 완전히 제거 (또는 강력하게 제외)합니다.
		// Next.js는 내부적으로 file-loader 또는 asset module type으로 SVG를 처리하려 합니다.
		// 이를 `@svgr/webpack`이 가로채도록 하려면 기존 규칙을 비활성화해야 합니다.
		const fileLoaderRule = config.module.rules.find(
			(rule: any) => rule.test && rule.test.toString().includes('svg'),
		);
		// Grab the existing rule that handles SVG imports

		if (fileLoaderRule) {
			// 해당 로더가 SVG 파일을 더 이상 처리하지 않도록 합니다.
			// Next.js 11+에서는 `file-loader` 대신 `asset/resource` 모듈을 사용할 수 있습니다.
			// 따라서 `fileLoaderRule.loader = undefined;` 또는 `fileLoaderRule.type = 'javascript/auto';`
			// 와 같이 설정하여 기본 처리를 무력화할 수 있습니다.
			// 가장 간단하고 강력한 방법은 `exclude`에 추가하는 것입니다.
			fileLoaderRule.exclude = /\.svg$/;
		}

		// 2. @svgr/webpack 로더 규칙을 추가합니다.
		// 이 로더는 SVG 파일을 React 컴포넌트로 변환해줍니다.
		config.module.rules.push({
			test: /\.svg$/,
			// SVG 파일이 JS/TS/MD(X) 파일에서 import 될 때만 이 로더를 적용합니다.
			issuer: {
				and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
			},
			use: [
				{
					loader: '@svgr/webpack',
					options: {
						prettier: false, // Prettier는 별도로 실행하므로 SVGR 내부에서는 비활성화
						svgo: true, // SVGO를 사용하여 SVG 최적화 활성화
						svgoConfig: {
							plugins: [
								{
									name: 'preset-default',
									params: {
										overrides: {
											removeViewBox: false, // viewBox 제거 방지 (SVG 크기 조절에 중요)
										},
									},
								},
								'removeDimensions', // width, height 속성 제거 (CSS로 크기 제어 용이)
							],
						},
					},
				},
			],
		});

    */

    // ** SVGR 공식문서 버전

    const fileLoaderRule = config.module.rules.find((rule: any) => rule.test?.test?.('.svg'));

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

    // config.module.exprContextCritical = false; // sentry build error 방지

    return config;
  },
};

export default nextConfig;

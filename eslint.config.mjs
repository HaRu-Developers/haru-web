// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import { FlatCompat } from '@eslint/eslintrc';
import eslint from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import storybook from 'eslint-plugin-storybook';
import { dirname } from 'path';
import tseslint from 'typescript-eslint';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/**
 * Next.js와 Storybook의 권장 규칙을 결합한 ESLint 설정 배열
 * @type {import('eslint').Linter.FlatConfig[]}
 * @property {Array} next/core-web-vitals - Next.js의 Core Web Vitals 규칙 포함
 *   - Next.js용 권장 ESLint 규칙 확장
 *   - Core Web Vitals 성능 지표에 대한 규칙 포함
 *   - 페이지 경험 점수 유지에 도움
 * @property {Array} next/typescript - Next.js 프로젝트를 위한 TypeScript 특정 규칙
 *   - TypeScript 특정 린팅 규칙 포함
 *   - Next.js 컨텍스트에서 올바른 TypeScript 사용 보장
 * @property {Array} flat/recommended - Storybook의 권장 플랫 설정
 *   - Storybook 특정 린팅 규칙 포함
 *   - 적절한 스토리 파일 형식 보장
 *   - Storybook 모범 사례 유지
 */
const eslintConfig = [
  // 글로벌 ignore 설정 (파일 패턴만 지정)
  {
    ignores: [
      // 빌드 및 배포 관련 폴더
      'node_modules/**',
      '.next/**',
      'out/**',
      'dist/**',
      'build/**',

      // 테스트 및 문서 폴더
      'coverage/**',
      'public/**',

      // custom type
      '**/svgr.d.ts',

      'next.config.ts',
    ],
  },
  // Next.js의 core-web-vitals와 typescript 설정을 확장
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  // Storybook의 권장 설정을 확장
  ...storybook.configs['flat/recommended'],
  // ESLint의 기본 권장 설정
  eslint.configs.recommended,
  // TypeScript ESLint의 권장 설정
  tseslint.configs.recommended,
  {
    // CommonJS 파일에 대한 특별 설정
    files: ['**/*.cjs'],
    rules: {
      // require 구문 사용 허용
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  // TypeScript 파일에 대한 설정
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      // 사용하지 않는 변수 경고 (_, _로 시작하는 변수는 제외)
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      // JS ESLint의 no-unused-vars 규칙 비활성화
      // TypeScript ESLint가 이 규칙을 처리하므로 중복 방지
      'no-unused-vars': 'off',
    },
  },
  // React와 JSX 파일에 대한 설정
  {
    files: ['**/*.jsx', '**/*.tsx'],
    plugins: {
      // React와 React Hooks 플러그인 설정
      react: eslintPluginReact,
      'react-hooks': eslintPluginReactHooks,
    },
    settings: {
      // React 버전 자동 감지
      react: {
        version: 'detect',
      },
    },
    rules: {
      // JSX를 사용할 수 있는 파일 확장자 제한
      'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
      // React import 구문 필수 해제
      'react/react-in-jsx-scope': 'off',
      // prop-types 검사 비활성화 (ts 사용 시 TypeScript가 prop-types 역할을 함)
      'react/prop-types': 'off',
      // 함수형 컴포넌트 정의 방식 설정 (화살표 함수 사용)
      'react/function-component-definition': [
        2,
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],
    },
  },
  prettierConfig, // 항상 마지막에!
];

export default tseslint.config(eslintConfig);

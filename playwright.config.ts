import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  testMatch: /.*\.pw\.spec\.ts$/,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  timeout: 30 * 1000,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { open: 'never' }]],
  webServer: {
    command: 'pnpm dev',
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    channel: 'chrome',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    headless: false, // 개발 중에는 false로 설정
    ignoreHTTPSErrors: true, // 개발 중에는 true로 설정
  },
  projects: [
    // --- 로컬용: dev 서버를 이 프로젝트에서만 띄움 ---
    {
      name: 'setup-local',
      testMatch: /auth\.setup\.ts/,
      use: { ...devices['Desktop Chrome'], baseURL: 'http://localhost:3000' },
      // setup만 돌릴 때 dev 서버가 필요하면 여기에 webServer 둬도 됨
    },
    {
      name: 'local-chromium',
      dependencies: ['setup-local'],
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:3000',
        storageState: 'storageState.json',
      },
    },

    // --- 배포(스테이징/프리뷰)용: dev 서버 없음 ---
    {
      name: 'setup-staging',
      testMatch: /auth\.setup\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: process.env.PLAYWRIGHT_BASE_URL!,
      },
    },
    {
      name: 'staging-chromium',
      dependencies: ['setup-staging'],
      use: {
        ...devices['Desktop Chrome'],
        baseURL: process.env.PLAYWRIGHT_BASE_URL!,
        storageState: 'storageState.json',
      },
    },
  ],
});

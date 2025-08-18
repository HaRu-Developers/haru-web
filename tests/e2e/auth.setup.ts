import { expect, test as setup } from '@playwright/test';

const STORAGE_PATH = 'storageState.json';

setup('authenticate (login and save storageState)', async ({ page, context }) => {
  const email = process.env.PLAYWRIGHT_EMAIL!;
  const password = process.env.PLAYWRIGHT_PASSWORD!;

  if (!email || !password) {
    throw new Error('PLAYWRIGHT_EMAIL / PLAYWRIGHT_PASSWORD 환경변수를 설정하세요.');
  }

  await page.goto('/auth/login');

  await page.getByPlaceholder('이메일 주소를 입력해주세요').fill(email);
  await page.getByPlaceholder('비밀번호를 입력해주세요').fill(password);

  await page.getByRole('button', { name: '일반 로그인 버튼' }).click();

  // /workspace/숫자
  await expect(page).toHaveURL(/\/workspace\/\d+$/, { timeout: 5000 });

  // 이후 프로젝트에서 재사용할 세션 저장
  await context.storageState({ path: STORAGE_PATH });
});

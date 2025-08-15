import { expect, test } from '@playwright/test';

test('이메일과 비밀번호로 로그인한다', async ({ page }) => {
  await page.goto('/auth/login');

  // 이메일 입력
  await page.getByPlaceholder('이메일 주소를 입력해주세요').fill('rladuwls0814@gmail.com');

  // 비밀번호 입력
  await page.getByPlaceholder('비밀번호를 입력해주세요').fill('1234');

  // 로그인 버튼 클릭
  await page.getByRole('button', { name: '일반 로그인 버튼' }).click();

  // URL이 /workspace/11로 변경될 때까지 대기
  await page.waitForURL('**/workspace/11', { timeout: 5000 });

  // 최종적으로 이동한 URL이 맞는지 검증
  expect(page.url()).toContain('/workspace/11');
});

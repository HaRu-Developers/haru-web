import { expect, test } from '@playwright/test';

// 잘못된 ID로 접근하면 NotFound가 보인다
test('유효하지 않은 id가 들어오면 not found 페이지로 이동한다', async ({ page }) => {
  const res = await page.goto('/workspace/blabla', { waitUntil: 'networkidle' });

  expect(res?.status()).toBe(404);

  // 헤더/이미지/버튼 존재 확인
  await expect(page.getByRole('heading', { level: 2, name: /404 error/i })).toBeVisible();
  await expect(page.getByAltText('404 이미지')).toBeVisible();
  await expect(page.getByRole('button', { name: '이전으로 이동' })).toBeVisible();

  // 원래 페이지에 있던 CTA가 없어야 정상 (실수로 다른 화면이 아닌지 확인)
  await expect(page.getByLabel('Create New')).toHaveCount(0);
});

// 뒤로가기 버튼이 실제로 이전 페이지로 이동한다
test('NotFound에서 "이전으로 이동" 클릭 시 이전 페이지로 복귀', async ({ page, baseURL }) => {
  // 이전 페이지 히스토리를 만들어두기
  await page.goto('/', { waitUntil: 'domcontentloaded' });

  // 잘못된 경로로 이동 → NotFound
  await page.goto('/workspace/blabla', { waitUntil: 'networkidle' });
  await expect(page.getByRole('heading', { level: 2, name: /404 error/i })).toBeVisible();

  // 뒤로가기 버튼 클릭
  await page.getByRole('button', { name: '이전으로 이동' }).click();

  // 랜딩으로 돌아왔는지 확인
  await expect(page).toHaveURL(/\/landing\/?$/);
});

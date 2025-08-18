import { expect, test } from '@playwright/test';

// 로그인 세션 적용
test.use({ storageState: 'storageState.json' });

test('TextCta 클릭 시 모달이 열린다', async ({ page }) => {
  await page.goto('/workspace/11/ai-meeting-manager');

  // CTA 클릭
  await page.getByLabel('Create New').click();

  // 모달 보임
  const modal = page.getByTestId('modal-create-meeting-minutes');
  await expect(modal).toBeVisible();

  // URL 바뀜
  await expect(page).toHaveURL(/create/);

  // 모달 헤더 텍스트 확인
  await expect(modal.getByRole('heading', { level: 1 })).toHaveText(/새로운 회의록/i);

  // 닫기 동작
  await page.getByLabel('닫기').click();
  await expect(modal).toBeHidden();
  await expect(page).not.toHaveURL(/create/);
});

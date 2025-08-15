import { expect, test } from '@playwright/test';

test('탭 이동을 한다', async ({ page }) => {
  await page.goto('/workspace/11/ai-meeting-manager/1/minutes');

  // 탭 클릭
  await page.getByLabel('음성 기록 카테고리').click();

  // URL 바뀜
  await expect(page).toHaveURL(/leftTab?=MEETING_VOICE_LOG/);

  // 탭 클릭
  await page.getByLabel('AI 회의록 카테고리').click();

  // URL 바뀜
  await expect(page).toHaveURL(/leftTab?=MEETING_PROCEEDING/);
});

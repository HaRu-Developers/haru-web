import { expect, test } from '@playwright/test';

test('제목 수정시 최근 조회 파일, GnbTop의 제목이 바뀐다', async ({ page }) => {
  await page.goto('workspace/11/ai-meeting-manager/1/minutes?leftTab=MEETING_VOICE_LOG');

  // 제목 클릭 → 편집모드 진입
  const titleInput = page.getByLabel('파일 제목');
  await titleInput.click();

  // readOnly 해제되는지 확인
  await expect(titleInput).not.toHaveAttribute('readonly', '');

  // 새 제목 입력 + Enter 저장
  const newTitle = `E2E 제목 ${Date.now()}`;
  await titleInput.fill(newTitle);
  await page.keyboard.press('Enter');

  // GnbTop 헤더가 새 제목으로 변경되는지 확인
  await expect
    .poll(
      async () => {
        const h1 = page.getByRole('heading', { level: 1 });
        try {
          const text = await h1.textContent();
          return text?.trim() ?? '';
        } catch {
          return '';
        }
      },
      { timeout: 5000, intervals: [300, 500, 800, 1200] },
    )
    .toBe(newTitle);

  // 최근 조회 파일 목록에 새 제목이 반영되는지
  const recentLink = page.getByRole('link', { name: new RegExp(`${newTitle} 파일로 이동`) });
  await expect(recentLink).toBeVisible();

  // 제목 인풋이 다시 읽기모드로 돌아갔는지 확인
  await expect(titleInput).toHaveAttribute('readonly', '');

  // URL은 그대로(모달/탭 이동 없음)인지 확인
  await expect(page).toHaveURL(
    /\/workspace\/11\/ai-meeting-manager\/1\/minutes\?leftTab=MEETING_VOICE_LOG/,
  );
});

import {test, expect} from '@playwright/test';

test('moves the rect', async ({page}) => {
  await page.clock.setFixedTime(0);
  await page.goto('/');

  await page.clock.pauseAt(0);
  await page.clock.fastForward(1000);

  await expect(page).toHaveScreenshot();

  await page.keyboard.down('ArrowRight');
  await page.clock.fastForward(500);
  await expect(page).toHaveScreenshot();

  await page.keyboard.down('ArrowDown');
  await page.clock.fastForward(500);
  await page.keyboard.up('ArrowRight');
  await page.keyboard.up('ArrowDown');
  await expect(page).toHaveScreenshot();

  await page.keyboard.down('ArrowLeft');
  await page.clock.fastForward(200);
  await page.keyboard.up('ArrowLeft');
  await expect(page).toHaveScreenshot();

  await page.keyboard.down('ArrowUp');
  await page.clock.fastForward(300);
  await page.keyboard.up('ArrowUp');
  await expect(page).toHaveScreenshot();
});

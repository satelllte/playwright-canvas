import {test, expect} from '@playwright/test';

test('has initial position', async ({page}) => {
  await page.goto('/');
  await expect(page).toHaveScreenshot();
});

test('moves', async ({page}) => {
  await page.clock.setFixedTime(0);
  await page.goto('/');

  await page.clock.pauseAt(0);
  await page.clock.runFor(1000);

  await expect(page).toHaveScreenshot();

  await page.keyboard.down('ArrowRight');
  await page.clock.runFor(500);

  await expect(page).toHaveScreenshot();

  await page.keyboard.down('ArrowDown');
  await page.clock.runFor(500);

  await page.keyboard.up('ArrowRight');
  await page.keyboard.up('ArrowDown');

  await expect(page).toHaveScreenshot();
});

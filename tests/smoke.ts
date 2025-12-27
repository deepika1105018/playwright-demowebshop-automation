import { test, expect } from '@playwright/test';

test('Demo Web Shop home page loads', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Demo Web Shop/);
});

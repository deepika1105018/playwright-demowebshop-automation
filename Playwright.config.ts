import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config({ path: './credential.env' });

export default defineConfig({
  testDir: './tests',
  outputDir: './playwright-results',
  timeout: 30 * 1000,
  retries: 0,
  reporter: [
    ['html', { outputFolder: 'reports/html-report', open: 'never' }]
  ],
  use: {
    baseURL: 'https://demowebshop.tricentis.com',
    headless: false,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
});

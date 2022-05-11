// @ts-check
const { devices } = require('@playwright/test');
/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  testDir: "./test/specs",
  use: {
    headless: false,
    baseURL: process.env.URL,
    viewport: { width: 1280, height: 720 },
    trace:'retain-on-failure',
    screenshot: 'only-on-failure'
  },
  reporter: 'html',
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  timeout: 80000
};

module.exports = config;
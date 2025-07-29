import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

const envFile = '.env.' + (process.env.ENV || 'qa');
dotenv.config({ path: path.resolve(__dirname, envFile) });

if (!process.env.BASE_URL) {
  throw new Error(`BASE_URL is not defined. Verify ${envFile} exists and has a value.`);
}

if (!process.env.POKEAPI_API_URL || !process.env.JSONPLACEHOLDER_API_URL) {
  throw new Error(`POKEAPI_API_URL or JSONPLACEHOLDER_API_URL is not defined. Verify ${envFile} exists and has a value.`);
}


export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 0,
  use: {
    baseURL: process.env.BASE_URL, 
    headless: false,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  reporter:[
    ['html', {outputFolder: 'playwright-report', open: 'never'}],
    ['json', {outputFile: 'report.json'}],
  ],
  projects: [
    {
      name: 'UI - Chrome',
      testDir: './tests/ui', 
      use: {
        baseURL: process.env.BASE_URL,
        browserName: 'chromium', 
      },
    },
    {
      name: 'API - Pokeapi',
      testDir: './tests/api/pokeapi',
      use: {
        baseURL: process.env.POKEAPI_API_URL,
      },
    },
    {
      name: 'API - JsonPlaceholder',
      testDir: './tests/api/jsonplaceholder',
      use: {
        baseURL: process.env.JSONPLACEHOLDER_API_URL,
      },
    },
  ],
});

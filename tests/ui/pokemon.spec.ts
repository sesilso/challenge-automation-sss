import { test } from '../../fixtures/custom-fixture';
import { expect } from '@playwright/test';

test('TEST WEB 1: ', async ({ page }) => {
  await page.goto('');
  await expect(page).toHaveTitle('Pikachu - Wikipedia');

});

test('TEST WEB 2:', async ({ page }) => {
  await page.goto('');
  await expect(page).toHaveTitle('Pikachu - Wikipedia');

});

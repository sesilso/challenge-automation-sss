import { test } from '@fixtures/custom-fixture';
import { expect } from '@playwright/test';
import {PokemonPage} from '@pages/PokemonPage';

test('TEST WEB 1: ', async ({ page }) => {
  const pokemonPage = new PokemonPage(page);  
  pokemonPage.navigate();
  expect(await pokemonPage.getContentTitle()).toBe('Pikachu');
  await page.waitForTimeout(2000);

});

test('TEST WEB 2:', async ({ page }) => {
  await page.goto('');
  await expect(page).toHaveTitle('Pikachu - Wikipedia');

});

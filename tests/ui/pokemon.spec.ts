import { test } from '@fixtures/custom-fixture';
import { expect } from '@playwright/test';
import {PokemonPage} from '@pages/PokemonPage';
import { loadPokemonTestData } from '@data/pokemonTestDataLoader';
import { pokemonTestData} from '@interfaces/pokemon';

let testData: pokemonTestData[] = [];
test.beforeAll(async() => {
  testData = await loadPokemonTestData();
})
test('TEST WEB 1: ', async ({ page }) => {
  const pokemonPage = new PokemonPage(page);  
  for(let testPokemon of testData){
    await pokemonPage.navigate(testPokemon.name);
    await pokemonPage.assertPageTitle(testPokemon.name);
    await pokemonPage.logArtworkAuthor();
    await pokemonPage.assertPokemonImgIsVisible(testPokemon.name);
    await page.waitForTimeout(2000);
  }
  
  // expect(await pokemonPage.getContentTitle()).toBe('Pikachu');
 

});

// test('TEST WEB 2:', async ({ page }) => {
//   await page.goto('');
//   await expect(page).toHaveTitle('Pikachu - Wikipedia');

// });

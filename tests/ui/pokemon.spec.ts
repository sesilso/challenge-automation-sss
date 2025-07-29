import { test } from '@fixtures/custom-fixture';
import { expect } from '@playwright/test';
import {PokemonPage} from '@pages/PokemonPage';
import { loadPokemonTestData } from '@data/pokemonTestDataLoader';
import { pokemonTestData} from '@interfaces/pokemon';

test.describe('Pokemon Tests', () => {
  const testData: pokemonTestData[] = loadPokemonTestData();
  for(let testPokemon of testData){
    test(`Should display correct pokemon content for ${testPokemon.name} `, async ({ page }) => {
        const pokemonPage = new PokemonPage(page); 
        await pokemonPage.navigate(testPokemon.name);
        await pokemonPage.assertPageTitle(testPokemon.name);
        await pokemonPage.logArtworkAuthor();
        const pokemonImage = await pokemonPage.downloadImageAndGetPath('images');
        await pokemonPage.assertFileExtention(pokemonImage);
        await pokemonPage.assertFileSize(pokemonImage);
    });
  }
})



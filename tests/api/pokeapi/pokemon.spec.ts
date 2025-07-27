import { test } from '../../../fixtures/custom-fixture';
import { expect } from '@playwright/test';
import { loadPokemonTestData } from '../../../data/pokemonTestDataLoader';
import {pokemonTestData} from '../../../interfaces/pokemon';

let testData: pokemonTestData[] = [];
test.beforeEach(async() => {
  testData = await loadPokemonTestData();
})


test('Should return correct id, name, and abilities in the response by ID', async ({request}) =>{    
  for(let pokemon of testData){;
    const response = await request.get(`${pokemon.id}`);
    const pokemonResponse = await response.json();
    const abilityArrayFromResponse = pokemonResponse.abilities.map( (a: { ability: { name: string } }) => a.ability.name);
    const abilityArrayFromTestData = pokemon.abilities.split(',').map(name => name.trim());

    console.log(abilityArrayFromResponse);
    console.log(abilityArrayFromTestData);

    expect(response.status()).toBe(200);
    expect(pokemonResponse).toHaveProperty('id');
    expect(pokemonResponse).toHaveProperty('name');
    expect(pokemonResponse).toHaveProperty('abilities');

    expect(pokemonResponse.id).toBe(pokemon.id);
    expect(pokemonResponse.name).toBe(pokemon.name);

    abilityArrayFromTestData.forEach(expectedAbility => {
      expect(abilityArrayFromResponse).toContain(expectedAbility);
    })
  } 
})

// test('Should respond in less than 10 seconds', async ({request}) =>{
//     const response = await request.get('');  // Usará la baseURL de project: API - Pokeapi
//     console.log(`URL Pokeapi usada: ${response.url()}`);
//     expect(response.status()).toBe(200);
//     testData.forEach(x => console.log(x));
// })
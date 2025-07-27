import { test } from '../../../fixtures/custom-fixture';
import { expect } from '@playwright/test';
import { loadPokemonTestData } from '../../../data/pokemonTestDataLoader';
import {pokemonTestData} from '../../../interfaces/pokemon';

let testData: pokemonTestData[] = [];
test.beforeAll(async() => {
  testData = await loadPokemonTestData();
})


test('Should return correct id, name, and abilities in the response by ID', async ({request}) =>{    
  for(let pokemon of testData){;
    const response = await request.get(`${pokemon.id}`);
    const pokemonResponse = await response.json();
    const abilityArrayFromResponse = pokemonResponse.abilities.map( (a: { ability: { name: string } }) => a.ability.name);
    const abilityArrayFromTestData = pokemon.abilities.split(',').map(name => name.trim());

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

test('Should return correct id, name, and abilities in the response by Name', async ({request}) =>{    
  for(let pokemon of testData){;
    const response = await request.get(`${pokemon.name}`);
    const pokemonResponse = await response.json();
    const abilityArrayFromResponse = pokemonResponse.abilities.map( (a: { ability: { name: string } }) => a.ability.name);
    const abilityArrayFromTestData = pokemon.abilities.split(',').map(name => name.trim());

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

test('Should in less than 10 seconds', async ({request}) =>{    
  for(let pokemon of testData){;
    const start = Date.now();
    const response = await request.get(`${pokemon.id}`);
    const duration = Date.now() - start;
    expect(response.status()).toBe(200);
    expect(duration).toBeLessThan(10_000);
  } 
})

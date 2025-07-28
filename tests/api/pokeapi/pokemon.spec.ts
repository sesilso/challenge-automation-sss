import { test } from '@fixtures/custom-fixture';
import { expect, APIResponse } from '@playwright/test';
import { loadPokemonTestData } from '@data/pokemonTestDataLoader';
import { pokemonTestData, pokemonResponseData } from '@interfaces/pokemon';
import {requestWithDuration} from '@api/requestHelper';
import {getPokemonResponse} from '@api/pokeapiHelper';
import {splitAndTrim} from '@utils/strings';

let testData: pokemonTestData[] = [];
test.beforeAll(async() => {
  testData = await loadPokemonTestData();
})

function expectPokemonResponseMatches(response: pokemonResponseData, expected: pokemonTestData){
  expect(response).toHaveProperty('id');
  expect(response).toHaveProperty('name');
  expect(response).toHaveProperty('abilities');
  expect(response.id).toBe(expected.id);
  expect(response.name).toBe(expected.name);
  splitAndTrim(expected.abilities, ',').forEach(expectedAbility => {
    expect(response.abilities.map(x => x.ability.name)).toContain(expectedAbility);
  })
}

function expectPokemonResponseDuration(response: APIResponse, duration: number){
    expect(response.status()).toBe(200);
    expect(duration).toBeLessThan(10_000);  
}


test('Should return correct id, name, and abilities in the response by ID', async ({request}) =>{    
  for(let testPokemon of testData){;
    const pokemonResponse: pokemonResponseData = await getPokemonResponse(request, `${testPokemon.id}`);
    expectPokemonResponseMatches(pokemonResponse, testPokemon);
  } 
})

test('Should return correct id, name, and abilities in the response by NAME', async ({request}) =>{    
  for(let testPokemon of testData){;
    const pokemonResponse: pokemonResponseData = await getPokemonResponse(request, `${testPokemon.name}`);
    expectPokemonResponseMatches(pokemonResponse, testPokemon);
  } 
})

test('Request by ID should responde in less than 10 seconds', async ({request}) =>{    
  for(let pokemon of testData){;
    const {response, duration } = await requestWithDuration(request, `${pokemon.id}`);
    expectPokemonResponseDuration(response, duration);
  } 
})

test('Request by NAME should responde in less than 10 seconds', async ({request}) =>{    
  for(let pokemon of testData){;
    const {response, duration } = await requestWithDuration(request, `${pokemon.name}`);
    expectPokemonResponseDuration(response, duration);
  } 
})
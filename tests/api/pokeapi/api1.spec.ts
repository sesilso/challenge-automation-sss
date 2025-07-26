import { test } from '../../../fixtures/custom-fixture';
import { expect } from '@playwright/test';

test('Test 1 - pokeapi', async ({request}) =>{
    const response = await request.get('');  // Usará la baseURL de project: API - Pokeapi
    console.log(`URL Pokeapi usada: ${response.url()}`);
    expect(response.status()).toBe(200);
})

test('Ver baseURL', async ({ baseURL }) => {
  console.log('baseURL actual:', baseURL);
});

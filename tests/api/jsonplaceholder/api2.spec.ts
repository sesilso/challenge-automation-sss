import { test } from '../../../fixtures/custom-fixture';
import { expect } from '@playwright/test';

test('Test 1 - jsonplaceholder', async ({request}) =>{
    const response = await request.get('/posts');  // Usará la baseURL de project:API - JsonPlaceholder
    console.log(`URL PLaceholder usada: ${response.url()}`);
    expect(response.status()).toBe(200);
})

test('Ver baseURL', async ({ baseURL }) => {
  console.log('baseURL actual:', baseURL);
});
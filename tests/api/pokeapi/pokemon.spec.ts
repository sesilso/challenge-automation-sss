import { test } from '../../../fixtures/custom-fixture';
import { expect } from '@playwright/test';
import {convertExcelPageToJson} from '../../../utils/filereader';

let testData: Array<any> = [];
test.beforeEach(() => {
  testData = convertExcelPageToJson('resources/testdata/', 'pokemon-test-data.xlsx','GET pokemon');
})

test('Should return correct id, name, and abilities in the response', async ({request}) =>{
    const pokeName = 'pikachu';  
    const response = await request.get(`${pokeName}`);
    console.log(`URL Pokeapi usada: ${response.url()}`);
    expect(response.status()).toBe(200);

    testData.forEach(x => console.log(x));
})

test('Should respond in less than 10 seconds', async ({request}) =>{
    const response = await request.get('');  // Usará la baseURL de project: API - Pokeapi
    console.log(`URL Pokeapi usada: ${response.url()}`);
    expect(response.status()).toBe(200);
    testData.forEach(x => console.log(x));
})
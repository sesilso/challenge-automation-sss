import { test } from '@fixtures/custom-fixture';
import { expect } from '@playwright/test';
import {postTypicodeResponse} from '@api/jsonplaceholderHelper';
import {postTestData} from '@interfaces/jsonplaceholder';
import { loadPostTestData } from '@data/postTestDataLoader';

let testData: postTestData;
test.beforeEach(()=>{
    testData = loadPostTestData();
})

test('Should return id, title, body, userId in response', async ({request}) =>{
    const {response, body} = await postTypicodeResponse(request,testData);
    expect(response.status()).toBe(201);
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('title');
    expect(body).toHaveProperty('body');
    expect(body).toHaveProperty('userId');    
})

test('Should return the correct attribute types in response', async ({request}) =>{
    const {response, body} = await postTypicodeResponse(request,testData);
    expect(response.status()).toBe(201);
    expect(typeof body.id).toBe('number');
    expect(typeof body.title).toBe('string');
    expect(typeof body.body).toBe('string');
    expect(typeof body.userId).toBe('number');
})

test('Should return the correct values in response', async ({request}) =>{
    const {response, body} = await postTypicodeResponse(request,testData);
    expect(response.status()).toBe(201);
    expect(body.title).toBe(testData.title);
    expect(body.body).toBe(testData.body);
    expect(body.userId).toBe(testData.userId);
})
import {postTestData} from '@interfaces/jsonplaceholder';
import {faker} from '@faker-js/faker';

export function loadPostTestData(): postTestData{
    const postData: postTestData = {
        userId: faker.number.int({min:1, max: 1000}),
        title: faker.commerce.productName(),
        body: faker.commerce.productDescription()
    }
    return postData;
}
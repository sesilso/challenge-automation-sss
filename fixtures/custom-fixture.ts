import { test as baseTest } from '@playwright/test';
import { getHashedKey } from '../utils/encrypt';
import { getUTCDateTime } from '../utils/datetime';

type MyFixtures = {
    myFixture: void;
};

const test = baseTest.extend<MyFixtures>({
    myFixture: [async ({}, use)=>{
        console.log(`Environment hashed key: ${getHashedKey()}`);
        await use();
        console.log(`Test end time(UTC): ${getUTCDateTime()}`);
    },{auto:true}],
})

export { test };



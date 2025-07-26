import { test as baseTest } from '@playwright/test';
import { getHashedKey } from '../security/encrypt';
import { getUTCDateTime } from '../utils/datetime';

type MyFixtures = {
    myFixture: void;
};

const test = baseTest.extend<MyFixtures>({
    myFixture: [async ({}, use)=>{
        console.log(`Environment hashed key: ${getHashedKey()}`);
        await use();
        console.log(`Test end time: ${getUTCDateTime()}`);
    },{auto:true}],
})

export { test };

// import { test as baseTest } from '@playwright/test';

// const test = baseTest.extend<MyFixtures>({
//   myFixture: async ({}, use) => {
//     console.log('>>>>> ¡Hola! Este es un mensaje AL INICIO de cada test: ');
//     await use();
//     console.log('>>>>> ¡Hola! Este es un mensaje AL FINAL de cada test.');
//   }
// });

// export { test };



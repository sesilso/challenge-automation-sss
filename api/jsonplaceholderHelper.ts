import {postTestData} from '@interfaces/jsonplaceholder';

export async function postTypicodeResponse(request: any, testPayload: postTestData){
    const response = await request.post('/posts',{
        data: testPayload,
        headers:{
            'Content-Type': 'application/json' 
        }
    });
    const body = await response.json();
    return {response, body};
}
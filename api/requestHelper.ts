export async function requestWithDuration(request: any, url: string){
    const start = Date.now();
    const response = await request.get(url);
    const duration = Date.now() - start;
    return {response, duration};
}
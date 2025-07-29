import {pokemonResponseData} from '@interfaces/pokemon';

export async function getPokemonResponse(request: any, url: string): Promise<pokemonResponseData>{
    const response = await request.get(url);
    if(!response.ok){
        throw new Error(`GET ${response.url()} response was not OK`);
    }
    return await response.json();
}
import {pokemonResponseData} from '@interfaces/pokemon';

export async function getPokemonResponse(request: any, url: string): Promise<pokemonResponseData>{
    const response = await request.get(url);
    if(!response.ok){
        throw new Error(`GET ${response.url()} response was not OK`);
    }
    return await response.json();
}

// export async function getPokemonResponse(request: any, url: string){
//     const response = await request.get(url);
//     if(!response.ok){
//         throw new Error(`GET ${response.url()} response was not OK`);
//     }
//     const pokemonResponse = await response.json();
//     const abilityArrayFromResponse = pokemonResponse.abilities.map( (a: { ability: { name: string } }) => a.ability.name);
//     return {pokemonResponse, abilityArrayFromResponse};
// }
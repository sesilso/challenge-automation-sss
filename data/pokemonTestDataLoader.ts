import {convertExcelPageToJson} from '../utils/filereader';
import {pokemonTestData} from '../interfaces/pokemon';

export async function loadPokemonTestData(): Promise<pokemonTestData[]>{
    return convertExcelPageToJson('resources/testdata/', 'pokemon-test-data.xlsx','GET pokemon') as pokemonTestData[];
}
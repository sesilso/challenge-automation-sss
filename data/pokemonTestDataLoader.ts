import {convertExcelPageToJson} from '@utils/filereader';
import {pokemonTestData} from '@interfaces/pokemon';

export function loadPokemonTestData(): pokemonTestData[]{
    return convertExcelPageToJson('resources/testdata/', 'pokemon-test-data.xlsx','GET pokemon') as pokemonTestData[];
}
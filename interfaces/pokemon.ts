export interface pokemonTestData {
  id: string,
  name: string,
  abilities: string;
}

export interface pokemonResponseData{
  id: number;
  name: string;
  abilities: Array<{
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }>;
}
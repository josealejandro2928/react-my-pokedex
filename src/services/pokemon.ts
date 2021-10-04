
import axios from 'axios';

export const getPokemons = async (offset: number = 0, limit: number = 20, searchText: string = '') => {
  const { data }: any = await axios.get(`https://pokeapi.co/api/v2/pokemon`, {
    params: {
      limit,
      offset
    }
  })
  let result: any[] = data.results;
  let allPokemonRequest = result.map((pokemon) => {
    return axios.get(`${pokemon.url}`);
  })
  result = (await Promise.all(allPokemonRequest)).map(item => item.data);
  return result;
}
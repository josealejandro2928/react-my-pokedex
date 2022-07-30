
import axios from 'axios';
import localforage from 'localforage';


export const getPokemons = async (offset: number = 0, limit: number = 20, searchText: string = '', onlyMyList = false): Promise<{ result: any[], count: number }> => {
  if ((!searchText || searchText.length < 2) && !onlyMyList) {
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
    return { result, count: data.count };
  }
  const { data }: any = await axios.get(`https://pokeapi.co/api/v2/pokemon`, {
    params: {
      limit: 1000,
      offset: 0
    }
  })
  let result: any[] = data.results;
  if (searchText?.length >= 2) {
    result = result.filter((x) => x.name.includes(searchText.trim().toLowerCase()));
  }

  if (onlyMyList) {
    let dataCache = JSON.parse((await localforage.getItem('cacheMyPokedex')) || '{}');
    result = result.filter((x) => dataCache[x.name]);
  }

  let allPokemonRequest = result.map((pokemon) => {
    return axios.get(`${pokemon.url}`);
  })
  result = (await Promise.all(allPokemonRequest)).map(item => item.data);
  return { result, count: data.count };
}

export const getPokemonById = async (id: string | number) => {
  let pokemon = (await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)).data;
  return pokemon;

}
import { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { AppContext } from '../App/App';

const usePokedex = () => {
  const { cacheMyPokedex, myPokedex, setMyPokedex, setCacheMyPokedex } = useContext<any>(AppContext);

  function onTooglePokemon(pokemon: any) {
    if (!cacheMyPokedex[pokemon.name]) {
      setCacheMyPokedex({ ...cacheMyPokedex, [pokemon.name]: true });
      setMyPokedex([...myPokedex, pokemon]);
      toast.success(
        <p>
          Pokemon <strong style={{ textTransform: 'capitalize' }}>{pokemon.name}</strong> added to your pokedex
        </p>
      );
    } else {
      setCacheMyPokedex({ ...cacheMyPokedex, [pokemon.name]: false });
      setMyPokedex(myPokedex.filter((el: any) => el.name !== pokemon.name));
      toast.success(
        <p>
          Pokemon <strong style={{ textTransform: 'capitalize' }}>{pokemon.name}</strong> removed from your pokedex
        </p>
      );
    }
  }
  return { tooglePokemon: onTooglePokemon, cacheMyPokedex, myPokedex };
};

export default usePokedex;

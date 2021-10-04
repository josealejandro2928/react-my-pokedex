import React, { useContext } from 'react';

import classNames from 'classnames/bind';
import styles from './ListGridPokemons.module.scss';
import { Link } from 'react-router-dom';
import InView from 'react-intersection-observer';
import Loader from '../Loader/Loader';
import { AppContext } from '../../App/App';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';

const cx = classNames.bind({ ...styles });

function ListGridPokemons({
  pokemons = [],
  onLoadMore = () => {},
  totalReached = false,
}: {
  pokemons: any[];
  onLoadMore: Function;
  totalReached: boolean;
}): JSX.Element {
  const { cacheMyList, myListPokemon, setMyListPokemon, setCacheMyList } = useContext<any>(AppContext);
  const router = useHistory();

  function onTooglePokemon(pokemon: any) {
    if (!(cacheMyList[pokemon.name])) {
      setCacheMyList({ ...cacheMyList, [pokemon.name]: true });
      setMyListPokemon([...myListPokemon, pokemon]);
      toast.success(`Pokemon ${pokemon.name} added to your pokedex`);
    } else {
      setCacheMyList({ ...cacheMyList, [pokemon.name]: false });
      setMyListPokemon(myListPokemon.filter((el: any) => el.name !== pokemon.name));
      toast.success(`Pokemon ${pokemon.name} removed from your pokedex`);
    }
  }

  function onGoToProfile(id: any) {
    router.push(`/pokemon/${id}`);
  }

  return (
    <React.Fragment>
      <div className={cx('list-pokemons')}>
        {pokemons.map((pokemon) => {
          return (
            <div
              key={pokemon.id}
              className={cx('item')}
              onClick={() => {
                onGoToProfile(pokemon.id);
              }}
            >
              <img src={pokemon?.sprites?.front_default} alt={`front_${pokemon?.name}`} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3>{pokemon?.name}</h3>
                <i
                  onClick={(e) => {
                    e.stopPropagation();
                    onTooglePokemon(pokemon);
                  }}
                  style={{ cursor: 'pointer' }}
                  className={cx('fas fa-save', cacheMyList[pokemon.name] ? 'saved-pokemon' : '')}
                ></i>
              </div>
            </div>
          );
        })}
      </div>
      <InView
        threshold={0.3}
        onChange={(inView) => {
          if (inView) {
            onLoadMore(true);
          }
        }}
      >
        {({ ref }) => (
          <div style={{ height: '90px', display: 'grid', placeItems: 'center' }}>
            {!totalReached && (
              <div ref={ref}>
                <Loader />
              </div>
            )}
          </div>
        )}
      </InView>
    </React.Fragment>
  );
}
export default ListGridPokemons;

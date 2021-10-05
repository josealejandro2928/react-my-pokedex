import React, { useEffect } from 'react';

import classNames from 'classnames/bind';
import styles from './ListGridPokemons.module.scss';
import InView from 'react-intersection-observer';
import Loader from '../Loader/Loader';
import { useHistory } from 'react-router-dom';
import usePokedex from '../../hooks/usePokedex';

const cx = classNames.bind({ ...styles });

function ListGridPokemons({
  pokemons = [],
  onLoadMore = () => {},
  stopInfiniteScrolling = false,
}: {
  pokemons: any[];
  onLoadMore?: Function;
  stopInfiniteScrolling: boolean;
}): JSX.Element {
  const { tooglePokemon, cacheMyPokedex } = usePokedex();
  const router = useHistory();

  useEffect(() => {
    document.body.style.overflowY = 'auto';
  }, [pokemons]);

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
                    tooglePokemon(pokemon);
                  }}
                  style={{ cursor: 'pointer' }}
                  className={cx('fas fa-save', cacheMyPokedex[pokemon.name] ? 'saved-pokemon' : '')}
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
            document.body.style.overflowY = 'hidden';
          }
        }}
      >
        {({ ref }) => (
          <div style={{ height: '90px', display: 'grid', placeItems: 'center' }}>
            {!stopInfiniteScrolling && (
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

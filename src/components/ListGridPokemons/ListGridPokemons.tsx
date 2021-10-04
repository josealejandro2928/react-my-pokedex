import React from 'react';

import classNames from 'classnames/bind';
import styles from './ListGridPokemons.module.scss';
import { Link } from 'react-router-dom';
import InView from 'react-intersection-observer';
import Loader from '../Loader/Loader';

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
  return (
    <React.Fragment>
      <div className={cx('list-pokemons')}>
        {pokemons.map((pokemon) => {
          return (
            <Link key={pokemon.id} to={''}>
              <div className={cx('item')}>
                <img src={pokemon?.sprites?.front_default} alt={`front_${pokemon?.name}`} />
                <h3>{pokemon?.name}</h3>
              </div>
            </Link>
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

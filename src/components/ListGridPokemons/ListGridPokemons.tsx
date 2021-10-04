import React from 'react';

import classNames from 'classnames/bind';
import styles from './ListGridPokemons.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind({ ...styles });

function ListGridPokemons({ pokemons = [] }: { pokemons: any[] }): JSX.Element {
  return (
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
  );
}
export default ListGridPokemons;

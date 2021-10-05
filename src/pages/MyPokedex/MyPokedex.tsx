import React, { useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './MyPokedex.module.scss';
import { AppContext } from '../../App/App';
import ListGridPokemons from '../../components/ListGridPokemons/ListGridPokemons';
const cx = classNames.bind({ ...styles });

function MyPokedex(): JSX.Element {
  const { myPokedex } = useContext(AppContext);
  return (
    <div className="container">
      <div className={cx('header')}>
        <span>My Pokedex</span>
      </div>

      <div className={cx('result')}>
        {myPokedex?.length > 0 && <ListGridPokemons stopInfiniteScrolling pokemons={myPokedex}></ListGridPokemons>}
        {myPokedex?.length === 0 && (
          <>
            <h3 style={{ textAlign:'center' }}>You have not selected any pokemon yet</h3>
          </>
        )}
      </div>
    </div>
  );
}
export default MyPokedex;

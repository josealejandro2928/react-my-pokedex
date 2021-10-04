/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { getPokemons } from '../../services/pokemon';
import Loader from '../../components/Loader/Loader';
import ListGridPokemons from '../../components/ListGridPokemons/ListGridPokemons';
const cx = classNames.bind({ ...styles });

interface FilterParams {
  limit: number;
  offset: number;
  queryName: string;
  onlySelected: boolean;
}

function Home(): JSX.Element {
  const [filterParams, setFilterParams] = useState<FilterParams>({
    limit: 20,
    offset: 0,
    queryName: '',
    onlySelected: false,
  });
  const [pokemons, setPokemons] = useState<any[]>([]);

  const [error, setError] = useState<null | undefined | string | boolean>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
  }, []);

  useEffect(() => {
    search();
  }, [filterParams]);

  async function search() {
    try {
      let result: any[] = await getPokemons(filterParams.offset, filterParams.limit, filterParams.queryName);
      console.log('🚀 ~ file: Home.tsx ~ line 29 ~ search ~ result', result);
      setPokemons(result);
    } catch (error: any) {
      setError(error.message);
    }
    setLoading(false);
  }

  return (
    <div className="container">
      <div>
        <div className={cx('header')}>Search pokemons</div>
        <div style={{ height: '100px' }}></div>
      </div>

      <div className={cx('filters')}>Filters</div>
      <div className={cx('search')}>
        {error && (
          <h3>
            Upps, <strong>{error}</strong>
          </h3>
        )}
        {!error && (
          <div className={cx('grid')}>
            <ListGridPokemons pokemons={pokemons}></ListGridPokemons>
          </div>
        )}
        {loading && (
          <div className={cx('loader')}>
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
}
export default Home;

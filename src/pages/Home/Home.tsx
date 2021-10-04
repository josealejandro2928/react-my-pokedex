/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { getPokemons } from '../../services/pokemon';
import Loader from '../../components/Loader/Loader';
import ListGridPokemons from '../../components/ListGridPokemons/ListGridPokemons';
import FilterSearch from '../../components/FilterSearch/FilterSearch';
import { useModal } from 'react-hook-modal';
const cx = classNames.bind({ ...styles });

interface FilterParams {
  limit: number;
  offset: number;
  query: string;
  onlyMyList: boolean;
}

function Home(): JSX.Element {
  const [filterParams, setFilterParams] = useState<FilterParams>({
    limit: 30,
    offset: 0,
    query: '',
    onlyMyList: false,
  });
  const [pokemons, setPokemons] = useState<any[]>([]);

  const [error, setError] = useState<null | undefined | string | boolean>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(1);
  const [count, setCount] = useState<number>(0);
  const { setComponentToRender } = useModal();

  useEffect(() => {
    setLoading(true);
  }, []);

  useEffect(() => {
    search();
  }, [filterParams]);

  async function search() {
    try {
      let { result, count: totalData } = await getPokemons(
        filterParams.offset,
        filterParams.limit,
        filterParams.query,
        filterParams.onlyMyList
      );
      if (filterParams.query?.length >= 2 || filterParams.onlyMyList) {
        setTotal(0);
        setCount(0);
        setPokemons(result);
      } else {
        setTotal(totalData);
        let newArray = pokemons.concat(result);
        setCount(count + newArray.length);
        setPokemons(newArray);
      }
    } catch (error: any) {
      setError(error.message);
    }
    setLoading(false);
  }

  function onFilterChange(filter: any) {
    setLoading(true);
    setPokemons([]);
    let params = { ...filterParams, query: filter.name, onlyMyList: filter.onlyMyList };
    if (filter.name?.length >= 2 || filter.onlyMyList) {
      params.offset = 0;
      params.limit = 1000;
    } else {
      params.offset = 0;
      params.limit = 30;
    }
    setFilterParams(params);
  }

  return (
    <div className="container">
      <div>
        <div className={cx('header')}>
          <span>Search pokemons</span>
          <i
            onClick={() => {
              setComponentToRender(<FilterSearch filterChange={onFilterChange} />, {
                width: '90vw',
                height: '80vh',
                animation: true,
                title: 'Filters',
              });
            }}
            className={cx('fas fa-search', 'filter-modal')}
          ></i>
        </div>
      </div>

      <div style={{ display: 'flex' }}>
        <div className={cx('filters')}>
          <h3>Filters</h3>
          <FilterSearch filterChange={onFilterChange} />
        </div>
        <div className={cx('search')}>
          {error && (
            <h3 style={{ textAlign: 'center' }}>
              Upps, <strong>{error}</strong>
            </h3>
          )}
          {!error && !loading && (
            <>
              <div className={cx('grid')}>
                <ListGridPokemons
                  totalReached={count >= total}
                  pokemons={pokemons}
                  onLoadMore={() => {
                    setFilterParams({ ...filterParams, offset: pokemons.length });
                  }}
                ></ListGridPokemons>
              </div>
              {!pokemons.length && <h3 style={{ textAlign: 'center' }}>No results with these parameters</h3>}
            </>
          )}
          {loading && (
            <div className={cx('loader')}>
              <Loader />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Home;

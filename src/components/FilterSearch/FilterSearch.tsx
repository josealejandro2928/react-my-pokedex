/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './FilterSearch.module.scss';
import { useModal } from 'react-hook-modal';
import useEffectUpdate from '../../hooks/useEffectUpdate';
const cx = classNames.bind({ ...styles });

function FilterSearch({ onlyMyListProp = false, nameProp = '', filterChange = (e: any) => {} }): JSX.Element {
  const [filter, setFilter] = useState({ name: nameProp, onlyMyList: onlyMyListProp });
  const { closeModal } = useModal();

  useEffectUpdate(() => {
    filterChange(filter);
  }, [filter.onlyMyList]);

  useEffect(() => {
    setFilter({ ...filter, onlyMyList: onlyMyListProp || false, name: nameProp || '' });
  }, [onlyMyListProp, onlyMyListProp]);

  return (
    <div data-testid="filter-search-testid">
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="onlyMyList">Name</label>
        <input
          data-testid="search-input-id"
          value={filter.name}
          onChange={(e) => setFilter({ ...filter, name: e?.target?.value })}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              filterChange(filter);
              closeModal();
            }
          }}
          type="search"
          name="name"
          placeholder="Query more than 2 letters"
        />
      </div>
      <div
        onClick={() => setFilter({ ...filter, onlyMyList: !filter.onlyMyList })}
        style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
      >
        <input
          data-testid="check-input-id"
          checked={filter.onlyMyList}
          onChange={(e) => setFilter({ ...filter, onlyMyList: e?.target?.checked })}
          type="checkbox"
          name="onlyMyList"
        />
        <label style={{ marginLeft: '.25rem' }} htmlFor="onlyMyList">
          Only my list
        </label>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <button
          data-testid="search-btn-testid"
          onClick={() => {
            filterChange(filter);
            closeModal();
          }}
          className={cx('search-btn')}
        >
          <i className="fa fa-search" style={{ marginRight: '4px' }}></i>
          Search
        </button>
      </div>
    </div>
  );
}
export default FilterSearch;

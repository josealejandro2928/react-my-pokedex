import React, { useState } from 'react';

import classNames from 'classnames/bind';
import styles from './FilterSearch.module.scss';
const cx = classNames.bind({ ...styles });

function FilterSearch({ filterChange = (e: any) => {} }): JSX.Element {
  const [filter, setFilter] = useState({ name: '', onlyMyList: false });
  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="onlyMyList">Name</label>
        <input
          value={filter.name}
          onChange={(e) => setFilter({ ...filter, name: e?.target?.value })}
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
          onClick={() => {
            filterChange(filter);
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

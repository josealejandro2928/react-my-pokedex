import React from 'react';
import logo from '../../assets/images/logo.png';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { Link, NavLink } from 'react-router-dom';
import Badge from '../Badge/Badge';
import usePokedex from '../../hooks/usePokedex';

const cx = classNames.bind({ ...styles });

function Header(): JSX.Element {
  const { myPokedex } = usePokedex();
  return (
    <React.Fragment>
      <div className={cx('Header')}>
        <div className={cx('section')} style={{ flex: '1 0 100%', maxWidth: '30%' }}>
          <Link to="/">
            <img className={cx('logo')} src={logo} alt="logo" />
          </Link>
        </div>
        <div
          className="section"
          style={{ display: 'flex', flex: '1 1 100%', maxWidth: '100%', justifyContent: 'flex-end' }}
        >
          <NavLink to="/" exact className={cx('link')} activeClassName={cx('link-selected')}>
            Home
          </NavLink>
          <NavLink to="/my-list" className={cx('link')} activeClassName={cx('link-selected')}>
            My pokedex
            {myPokedex.length > 0 && <Badge value={myPokedex.length} />}
          </NavLink>
        </div>
      </div>
      <div style={{ height: '80px' }}></div>
    </React.Fragment>
  );
}
export default Header;

import React from 'react';
import logo from '../../assets/images/logo.png';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { NavLink } from 'react-router-dom';

const cx = classNames.bind({ ...styles });

function Header(): JSX.Element {
  return (
    <React.Fragment>
      <div className={cx('Header')}>
        <div className={cx('section')} style={{ flex: '1 0 100%', maxWidth: '40%' }}>
          <img className={cx('logo')} src={logo} alt="logo" />
          {/* <span className={cx('title')}>Pokedex</span> */}
        </div>
        <div
          className="section"
          style={{ display: 'flex', flex: '1 1 100%', maxWidth: '100%', justifyContent: 'flex-end' }}
        >
          <NavLink to="/" exact className={cx('link')} activeClassName={cx('link-selected')}>
            Home
          </NavLink>
          <NavLink to="/my-list" className={cx('link')} activeClassName={cx('link-selected')}>
            My Pokedex
          </NavLink>
        </div>
      </div>
      <div style={{ height: '80px' }}></div>
    </React.Fragment>
  );
}
export default Header;

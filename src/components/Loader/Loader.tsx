import classnames from 'classnames/bind';

import styles from './Loader.module.scss';

const cx = classnames.bind(styles);

const Loader = ({ style = {} }) => (
  <div className={cx('lds-spinner')} style={{ ...style }}>
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
  </div>
);

export default Loader;

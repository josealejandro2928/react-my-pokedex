import React from 'react';
import Header from '../Header/Header';

function Layout({ children }: { children?: React.ReactElement | JSX.Element | any }): JSX.Element {
  return (
    <React.Fragment>
      <Header />
      {children}
    </React.Fragment>
  );
}
export default Layout;

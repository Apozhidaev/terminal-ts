import React, { Fragment } from 'react';
import Header from './Header';
import './styles.css';

const Layout = ({children}) => (
  <Fragment>
    <Header />
    <div className="container-fluid">
      {children}
    </div>
  </Fragment>
);

export default Layout;

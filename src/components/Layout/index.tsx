import React from 'react';
import Header from './Header';
import './styles.css';

type Props = {
  children: JSX.Element | JSX.Element[] | string;
};

const Layout = ({ children }: Props) => (
  <>
    <Header />
    <div className="container-fluid">
      {children}
    </div>
  </>
);

export default Layout;

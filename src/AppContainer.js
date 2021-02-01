import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

const AppContainer = ({ children }) => {
  return (
    <>
      <div className="flex">
        <Header />
        <main id="content">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default AppContainer;

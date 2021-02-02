import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const auth = useContext(AuthContext);

  return (
    <>
      {auth.isAuthenticated() && <Redirect to="/statistics" />}
      <h3 className="p-2">Current statistics for all countries</h3>
    </>
  );
};

export default Home;

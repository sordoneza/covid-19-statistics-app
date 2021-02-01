import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Header.css';

const Header = () => {
  const auth = useContext(AuthContext);
  return (
    <nav>
      <div className="d-flex">
        <h3 className="mr-auto p-2">COVID 19 Statistics</h3>
        <ul className="d-flex ">
          {auth.isAuthenticated() && <li>Welcome, {auth.userInfo.email}</li>}

          {!auth.isAuthenticated() && (
            <li>
              <Link to="/login">Log in</Link>
            </li>
          )}
          {!auth.isAuthenticated() && (
            <li>
              <Link to="/signup">Sign up</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;

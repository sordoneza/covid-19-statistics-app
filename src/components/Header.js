import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Header.css';

const Header = () => {
  const auth = useContext(AuthContext);
  return (
    <nav>
      <h3>COVID 19 Statistics</h3>
      <ul className="nav-list">
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
    </nav>
  );
};

export default Header;

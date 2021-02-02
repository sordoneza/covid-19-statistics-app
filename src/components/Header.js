import React, { useContext } from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Header.css';

const AuthNavItem = ({ authState, logout }) => {
  return (
    <>
      <li>
        <h5 className="p-2">Welcome, {authState.userInfo.email}</h5>
      </li>
      <li>
        <Button color="link" className="border-0" onClick={() => logout()}>
          Log Out
        </Button>
      </li>
    </>
  );
};

const UnauthenticatedNavItem = () => {
  return (
    <>
      <li>
        <Link to="/login">Log in</Link>
      </li>
      <li>
        <Link to="/signup">Sign up</Link>
      </li>
    </>
  );
};

const Header = () => {
  const auth = useContext(AuthContext);

  return (
    <nav>
      <div className="d-flex">
        <h3 className="mr-auto p-2">COVID 19 Statistics</h3>
        <ul className="d-flex ">
          {auth.isAuthenticated() && (
            <AuthNavItem authState={auth.authState} logout={auth.logout} />
          )}

          {!auth.isAuthenticated() && <UnauthenticatedNavItem />}
        </ul>
      </div>
    </nav>
  );
};

export default Header;

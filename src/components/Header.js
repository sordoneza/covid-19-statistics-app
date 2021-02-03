import React, { useContext } from 'react';
import { Button } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Header.css';
import { FetchContext } from '../context/FetchContext';

const AuthNavItem = ({ authState, logout }) => {
  const fetchContext = useContext(FetchContext);
  const history = useHistory();

  const handleLogout = async () => {
    // Request to logout from server to delete refresh token
    const { data } = await fetchContext.authAxios.post('/auth/logout');

    return data;
  };

  const handleSync = async () => {
    // Request to logout from server to delete refresh token
    const { data } = await fetchContext.authAxios.get('/sync');

    if (data) history.push('/statistics');
  };

  return (
    <>
      <li>
        <h5 className="p-2">Welcome, {authState.userInfo.email}</h5>
      </li>
      <li>
        <Button color="link" onClick={() => handleSync()}>
          Sync
        </Button>

        <Button color="link" onClick={() => logout(handleLogout)}>
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

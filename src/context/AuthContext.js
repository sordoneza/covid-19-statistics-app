import React, { createContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { publicFetch } from '../utils/fetch';

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const history = useHistory();

  const refreshToken = localStorage.getItem('refreshToken');

  // Auth State
  const [authState, setAuthState] = useState({
    token: undefined,
    refreshToken,
    userInfo: {},
    expiresAt: undefined,
  });

  const setAuthInfo = ({ accessToken, refreshToken, userInfo, expiresAt }) => {
    localStorage.setItem('refreshToken', refreshToken);
    setAuthState({
      token: accessToken,
      refreshToken,
      userInfo,
      expiresAt,
    });
  };

  // Handle refreshToken
  const handleRefreshToken = async () => {
    try {
      const { refreshToken } = authState;

      // Request new access token
      const { data } = await publicFetch.post('/auth/refreshToken', {
        refreshToken,
      });

      // Create Auth Object to update state
      const auth = Object.assign({}, data, { refreshToken });

      // Schedule automatic refreh request when the accessToken is about to expire
      setTimeout(() => {
        handleRefreshToken();
      }, data.expiresAt * 1000 - 500);

      setAuthInfo(auth);
    } catch (err) {
      setAuthInfo({});
      history.push('/login');
    }
  };

  // Handle Logout
  const logout = async callback => {
    const data = await callback();

    if (data) {
      // Clear auth State and redict to Login
      localStorage.removeItem('refreshToken');
      setAuthState({});
      history.push('/login');
    }
  };

  // Handle authenticate validation
  const isAuthenticated = () => {
    // If accessToken or expiresAt is missing then not authenticated
    if (!authState.token || !authState.expiresAt) {
      return false;
    }

    // Validate if accessToken has'nt expired
    return new Date().getTime() / 1000 < authState.expiresAt;
  };

  useEffect(() => {
    handleRefreshToken();
  }, []);

  return (
    <Provider
      value={{
        authState,
        setAuthState: authInfo => setAuthInfo(authInfo),
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };

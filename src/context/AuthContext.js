import React, { createContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { publicFetch } from '../utils/fetch';

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const history = useHistory();

  // Auth State
  const [authState, setAuthState] = useState({
    token: undefined,
    userInfo: {},
    expiresAt: undefined,
  });

  const setAuthInfo = ({ accessToken, userInfo, expiresAt }) => {
    setAuthState({
      token: accessToken,
      userInfo,
      expiresAt,
    });
  };

  // Handle refreshToken
  const refreshToken = async () => {
    try {
      // Request new access token
      const { data } = await publicFetch.get('/auth/refreshToken');

      // Schedule automatic refreh request when the accessToken is about to expire
      setTimeout(() => {
        refreshToken();
      }, data.expiresAt * 1000 - 500);

      setAuthInfo(data);
    } catch (err) {
      setAuthInfo({});
      history.push('/login');
    }
  };

  // Handle Logout
  const logout = async () => {
    // Request to logout from server to delete refresh token
    const { data } = await publicFetch.get('/auth/logout');

    // Clear auth State and redict to Login
    if (data) {
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
    refreshToken();
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

import React, { createContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const history = useHistory();

  const [authState, setAuthState] = useState({
    token: undefined,
    userInfo: {},
  });

  const setAuthInfo = ({ token, userInfo }) => {
    setAuthState({
      token,
      userInfo,
    });
  };

  const logout = () => {
    setAuthState({});
    history.push('/login');
  };

  const isAuthenticated = () => {
    return authState.token;
  };

  return (
    <Provider
      value={{
        authState,
        setAuthState: (authInfo) => setAuthInfo(authInfo),
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };

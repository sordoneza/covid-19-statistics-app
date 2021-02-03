import React, { lazy, Suspense, useContext } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { ModalProvider } from 'styled-react-modal';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { FetchProvider } from './context/FetchContext';

import AppContainer from './AppContainer';

import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import StatisticDetail from './pages/StatisticDetail';

const Statistics = lazy(() => import('./pages/Statistic'));

const Loading = () => (
  <AppContainer>
    <div className="p-4">Loading...</div>
  </AppContainer>
);

const UnauthenticatedRoutes = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => <AppContainer>{children}</AppContainer>}
    ></Route>
  );
};

const AuthenticatedRoute = ({ children, ...rest }) => {
  const auth = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={() =>
        auth.isAuthenticated() ? (
          <AppContainer>{children}</AppContainer>
        ) : (
          <Redirect to="/" />
        )
      }
    ></Route>
  );
};

const AppRoutes = () => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Switch>
          <AuthenticatedRoute path="/statistics/:id">
            <StatisticDetail />
          </AuthenticatedRoute>
          <AuthenticatedRoute path="/statistics">
            <Statistics />
          </AuthenticatedRoute>
          <UnauthenticatedRoutes path="/login">
            <Login />
          </UnauthenticatedRoutes>
          <UnauthenticatedRoutes path="/signup">
            <Signup />
          </UnauthenticatedRoutes>
          <UnauthenticatedRoutes exact path="/">
            <Home />
          </UnauthenticatedRoutes>
          <UnauthenticatedRoutes path="*">
            <NotFound />
          </UnauthenticatedRoutes>
        </Switch>
      </Suspense>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <ModalProvider>
        <AuthProvider>
          <FetchProvider>
            <div>
              <AppRoutes />
            </div>
          </FetchProvider>
        </AuthProvider>
      </ModalProvider>
    </Router>
  );
};

export default App;

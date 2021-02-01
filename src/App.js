import React, { lazy, Suspense, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { AuthProvider, AuthContext } from './context/AuthContext';
import { FetchProvider } from './context/FetchContext';

import AppContainer from './AppContainer';

import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';
import Home from './pages/Home';

const Statistics = lazy(() => import('./pages/Statistic'));

const Loading = () => (
  <AppContainer>
    <div className="p-4">Loading...</div>
  </AppContainer>
);

const UnauthenticatedRoutes = () => (
  <Switch>
    <Route path="/login">
      <Login />
    </Route>
    <Route path="/signup">
      <Signup />
    </Route>
    <Route path="/">
      <AppContainer>
        <Home />
      </AppContainer>
    </Route>
    <Route path="*">
      <NotFound />
    </Route>
  </Switch>
);

const AuthenticatedRoute = ({ children, ...rest }) => {
  const auth = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={() => (auth.isAuthenticated() ? <AppContainer>{children}</AppContainer> : <Redirect to="/" />)}
    ></Route>
  );
};

const AppRoutes = () => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Switch>
          <AuthenticatedRoute path="/statistics">
            <Statistics />
          </AuthenticatedRoute>
          <UnauthenticatedRoutes />
        </Switch>
      </Suspense>
    </>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <FetchProvider>
          <div>
            <AppRoutes />
          </div>
        </FetchProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;

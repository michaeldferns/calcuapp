import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Routes, useRoutes } from 'react-router-dom';
import AuthScreen from './components/auth-screen/AuthScreen';
import HomeScreen from './components/home-screen/HomeScreen';
import AuthorizedRoute from './components/custom-routes/AuthorizedRoute';
import UnauthorizedRoute from './components/custom-routes/UnauthorizedRoute';
import * as actions from './actions';
import routes from './routes';

const App = ({ isAuthenticated, fetchUser }) => {
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const routing = useRoutes(routes(isAuthenticated));

  return routing;
};

const mapStateToProps = ({ auth }) => {
  const { isAuthenticated } = auth;

  return {
    isAuthenticated,
  };
};

export default connect(mapStateToProps, actions)(App);

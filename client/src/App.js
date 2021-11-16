import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useRoutes } from 'react-router-dom';
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

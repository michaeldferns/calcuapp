import React from 'react';
import { connect } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AuthorizedRoute = ({ isAuthenticated }) => {
  console.log(isAuthenticated);

  return { isAuthenticated } ? <Outlet /> : <Navigate to="/auth" />;
};

const mapStateToProps = ({ auth }) => {
  const { isAuthenticated } = auth;

  return {
    isAuthenticated,
  };
};

export default connect(mapStateToProps)(AuthorizedRoute);

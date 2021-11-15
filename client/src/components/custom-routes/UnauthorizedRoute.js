import React from 'react';
import { connect } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

// https://dev.to/iamandrewluca/private-route-in-react-router-v6-lg5

const UnauthorizedRoute = ({ isAuthenticated }) => {
  return { isAuthenticated } ? <Outlet /> : <Navigate to="/" />;
};

const mapStateToProps = ({ auth }) => {
  const { isAuthenticated } = auth;

  return {
    isAuthenticated,
  };
};

export default connect(mapStateToProps)(UnauthorizedRoute);

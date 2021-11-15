import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

const NotFound = ({ isAuthenticated }) => {
  return { isAuthenticated } ? <Navigate to="/" /> : <Navigate to="/auth" />;
};

const mapStateToProps = ({ auth }) => {
  const { isAuthenticated } = auth;

  return {
    isAuthenticated,
  };
};

export default connect(mapStateToProps)(NotFound);

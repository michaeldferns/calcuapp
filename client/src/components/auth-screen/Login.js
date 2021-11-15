import React, { useState } from 'react';
import { connect } from 'react-redux';
import AuthForm from './AuthForm';
import api from '../../utils/api';
import * as actions from '../../actions';

const Login = ({ login }) => {
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (email, password, e) => {
    e.preventDefault();

    try {
      const res = await api.post('/auth/login', {
        email,
        password,
      });

      if (error) {
        setError('');
      }

      setEmail('');
      setPassword('');
      setStatus('Login successful.');

      try {
        login(res.data);
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      setError('Error logging in.');
    }
  };

  return (
    <AuthForm
      title="Login"
      buttonText="login"
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      error={error}
      status={status}
      handleSubmit={handleSubmit}
    />
  );
};

export default connect(null, actions)(Login);

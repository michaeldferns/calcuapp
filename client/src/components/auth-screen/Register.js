import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from './AuthForm';
import api from '../../utils/api';

const Register = ({ history }) => {
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disableFlag, setDisableFlag] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {}, [disableFlag]);

  const handleSubmit = async (email, password, e) => {
    e.preventDefault();

    try {
      await api.post('/auth/register', {
        email,
        password,
      });

      if (error) {
        setError('');
      }

      setEmail('');
      setPassword('');
      setDisableFlag(true);
      setStatus('Registration successful. Redirecting to login screen.');

      setTimeout(() => {
        navigate('/auth');
      }, 2000);
    } catch (err) {
      if (err.response) {
        const errors = err.response?.data?.errors;

        if (errors && Array.isArray(errors) && errors.length > 0) {
          console.log(errors[0]);
          setError(errors[0]?.msg);
        } else {
          setError('An error occured.');
        }
      }
    }
  };

  return (
    <AuthForm
      title="Register"
      buttonText="register"
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      error={error}
      status={status}
      disableFlag={disableFlag}
      handleSubmit={handleSubmit}
    />
  );
};

export default Register;

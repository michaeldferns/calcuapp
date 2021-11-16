import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { Fragment } from 'react';

const AuthForm = ({
  title,
  buttonText,
  email,
  setEmail,
  password,
  setPassword,
  error,
  status,
  disableFlag = false,
  handleSubmit,
}) => {
  return (
    <Fragment>
      <Typography color="primary" align="center" variant="h3">
        {title}
      </Typography>
      <form onSubmit={(e) => handleSubmit(email, password, e)}>
        <TextField
          margin="normal"
          required
          fullWidth
          name="email"
          label="Email"
          type="text"
          id="email"
          value={email}
          disabled={disableFlag}
          onInput={(e) => setEmail(e.target.value)}
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          value={password}
          disabled={disableFlag}
          onInput={(e) => setPassword(e.target.value)}
        />
        {status ? <Typography variant="body2">{status}</Typography> : null}
        {error ? (
          <Typography color="primary" variant="body2" sx={{ color: 'red' }}>
            {error}
          </Typography>
        ) : null}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={disableFlag}
          sx={{ mt: 2, mb: 2 }}
        >
          {buttonText}
        </Button>
      </form>
    </Fragment>
  );
};

export default AuthForm;

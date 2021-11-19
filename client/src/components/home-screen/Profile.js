import React, { useState } from 'react';
import { connect } from 'react-redux';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import * as actions from '../../actions';
import api from '../../utils/api';

const Profile = ({ logout }) => {
  const [error, setError] = useState();

  const handleDelete = async () => {
    if (error) {
      setError();
    }

    try {
      await api.get('/auth/delete');

      // Logout logic would match delete logic
      logout();
    } catch (err) {
      setError('Error deleting profile.');
    }
  };

  return (
    <Grid container justifyContent="center" spacing={2}>
      <Grid item xs={10}>
        <Button variant="contained" color="error" onClick={handleDelete}>
          Delete Profile
        </Button>
        {error ? <Typography sx={{ color: 'red' }}>{error}</Typography> : null}
      </Grid>
    </Grid>
  );
};

export default connect(null, actions)(Profile);

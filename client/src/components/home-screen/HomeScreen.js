import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import * as actions from '../../actions';

const buttonStyle = {
  ml: 1,
};

const buttons = [
  <Button color="inherit" to="/profile" component={Link} sx={buttonStyle}>
    Profile
  </Button>,
  <Button color="inherit" to="/history" component={Link} sx={buttonStyle}>
    History
  </Button>,
  <Button color="inherit" to="/" component={Link} sx={buttonStyle}>
    Calc
  </Button>,
];

const HomeScreen = ({ logout }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const renderNav = () => {
    const pathname = location?.pathname;

    if (pathname === '/') {
      return (
        <Fragment>
          {buttons[0]}
          {buttons[1]}
        </Fragment>
      );
    } else if (pathname === '/profile') {
      return (
        <Fragment>
          {buttons[2]}
          {buttons[1]}
        </Fragment>
      );
    } else if (pathname === '/history') {
      return (
        <Fragment>
          {buttons[0]}
          {buttons[2]}
        </Fragment>
      );
    }
  };

  return (
    <Container>
      <AppBar>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            onClick={() => navigate('/')}
            sx={{ flexGrow: 1, cursor: 'pointer' }}
          >
            CalcuApp
          </Typography>
          {renderNav()}
          <Button color="inherit" onClick={logout} sx={buttonStyle}>
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
      <Grid container spacing={2} sx={{ mt: 10 }}>
        <Grid item align="center" xs={12}>
          <Outlet />
        </Grid>
      </Grid>
    </Container>
  );
};

export default connect(null, actions)(HomeScreen);

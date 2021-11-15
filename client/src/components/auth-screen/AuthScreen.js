import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MaterialLink from '@mui/material/Link';
import React, { Fragment } from 'react';
import {
  Navigate,
  Route,
  Routes,
  Outlet,
  Link,
  useLocation,
} from 'react-router-dom';
import Login from './Login';
import Register from './Register';

const AuthScreen = (props) => {
  const location = useLocation();

  console.log(props);

  const renderBreadcrumb = () => {
    const pathname = location?.pathname;

    if (pathname === '/auth' || pathname === '/auth/') {
      return (
        <Fragment>
          <MaterialLink to="/auth/register" component={Link}>
            Register Account
          </MaterialLink>
        </Fragment>
      );
    } else if (pathname === '/auth/register') {
      return (
        <Fragment>
          <MaterialLink to="/auth" component={Link}>
            Login
          </MaterialLink>
        </Fragment>
      );
    }
  };

  return (
    <Container>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        spacing={4}
        sx={{ minHeight: '100vh' }}
      >
        <Grid
          item
          alignItems="center"
          justifyContent="center"
          xs={12}
          sm={10}
          md={8}
          lg={6}
        >
          <Card raised>
            <CardContent>
              <Outlet />
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={12}
                  sx={{ justifyContent: 'center', display: 'flex' }}
                >
                  {renderBreadcrumb()}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AuthScreen;

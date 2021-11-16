import { Navigate } from 'react-router-dom';
import AuthScreen from './components/auth-screen/AuthScreen';
import Login from './components/auth-screen/Login';
import Register from './components/auth-screen/Register';
import Calculate from './components/home-screen/Calculate';
import History from './components/home-screen/History';
import HomeScreen from './components/home-screen/HomeScreen';
import NotFound from './components/not-found/NotFound';
import Profile from './components/home-screen/Profile';

const routes = (isAuthenticated) => [
  {
    path: '/',
    element: isAuthenticated ? <HomeScreen /> : <Navigate to="/auth" />,
    children: [
      {
        path: '',
        element: <Calculate />,
      },
      {
        path: 'history',
        element: <History />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
    ],
  },
  {
    path: '/auth',
    element: !isAuthenticated ? <AuthScreen /> : <Navigate to="/" />,
    children: [
      { path: '', element: <Login /> },
      {
        path: 'register',
        element: <Register />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default routes;

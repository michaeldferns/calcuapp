import { Navigate, Outlet } from 'react-router-dom';
import AuthScreen from './components/auth-screen/AuthScreen';
import Login from './components/auth-screen/Login';
import Register from './components/auth-screen/Register';
import Calculate from './components/calculate/Calculate';
import History from './components/history/History';
import HomeScreen from './components/home-screen/HomeScreen';
import NotFound from './components/not-found/NotFound';
import Profile from './components/profile/Profile';

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

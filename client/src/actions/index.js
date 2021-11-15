import api from '../utils/api';
import { FETCH_USER, LOGIN_USER, LOG_OUT_USER } from './types';

export const fetchUser = () => async (dispatch) => {
  try {
    const res = await api.get('/auth/current_user');

    return dispatch({ type: FETCH_USER, payload: res.data });
  } catch (err) {
    return dispatch({ type: LOG_OUT_USER });
  }
};

export const login = (user) => (dispatch) => {
  console.log('here', user);

  dispatch({
    type: LOGIN_USER,
    payload: user,
  });
};

export const logout = () => async (dispatch) => {
  try {
    await api.get('auth/logout');

    dispatch({
      type: LOG_OUT_USER,
    });
  } catch (err) {}
};

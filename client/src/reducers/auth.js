import { FETCH_USER, LOGIN_USER, LOG_OUT_USER } from '../actions/types';

const initalState = {
  isAuthenticated: false,
  user: null,
};

const authReducer = (state = initalState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_USER: {
      if (payload) {
        return { ...state, isAuthenticated: true, user: payload };
      }

      return { ...state, isAuthenticated: false, user: null };
    }
    case LOGIN_USER: {
      return { ...state, isAuthenticated: true, user: payload };
    }
    case LOG_OUT_USER: {
      return { ...state, isAuthenticated: false, user: null };
    }
    default:
      return state;
  }
};

export default authReducer;

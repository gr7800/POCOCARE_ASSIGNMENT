import {
  AUTH_ERROR,
  AUTH_LOGIN_SUCCESS,
  AUTH_REGISTER_SUCCESS,
  REFRESH_TOKEN_ERROR,
  REFRESH_TOKEN_LOADING,
  REFRESH_TOKEN_SUCCESS,
} from './auth.type';

const initialState = {
  isRegistered: false,
  isAuth: !!localStorage.getItem('token'),
  userData: {},
  isError: false,
  ErrorMsg: '',
};

export const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case AUTH_REGISTER_SUCCESS: {
      return {
        ...state,
        isRegistered: true,
        isError: false,
        isAuth: true,
        userData: true,
        ErrorMsg: '',
      };
    }
    case AUTH_LOGIN_SUCCESS: {
      return {
        ...state,
        isAuth: payload,
        isError: false,
        userData: payload.user,
        ErrorMsg: '',
      };
    }
    case AUTH_ERROR: {
      return {
        ...state,
        isRegistered: false,
        isAuth: false,
        isError: true,
        ErrorMsg: payload,
      };
    }
    case REFRESH_TOKEN_ERROR: {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }
    case REFRESH_TOKEN_LOADING: {
      return {
        ...state,
        loading: true,
        error: false,
      };
    }
    case REFRESH_TOKEN_SUCCESS: {
      return {
        ...state,
        isAuth: payload,
        isError: false,
        userData: true,
        ErrorMsg: '',
      };
    }
    default: {
      return state;
    }
  }
};

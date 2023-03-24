import axios from 'axios';
import {
  AUTH_ERROR,
  AUTH_LOGIN_SUCCESS,
  AUTH_REGISTER_SUCCESS,
  REFRESH_TOKEN_ERROR,
  REFRESH_TOKEN_LOADING,
  REFRESH_TOKEN_SUCCESS,
} from './auth.type';

let API = 'https://pococareauthentication.onrender.com';

export const registerUser = (creds) => async (dispatch) => {
  try {
    const res = await axios.post(`${API}/user/signup`, creds);
    const data = await res.data;
    console.log(data);
    dispatch({ type: AUTH_REGISTER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: AUTH_ERROR });
    console.log(error.message);
  }
};

export const loginUser = (creds) => async (dispatch) => {
  try {
    const res = await axios.post(`${API}/user/login`, creds);
    const data = await res.data;
    console.log(data);

    localStorage.setItem('token', data.token);
    localStorage.setItem('refreshToken', data.refreshToken);

    dispatch({ type: AUTH_LOGIN_SUCCESS, payload: data.token });
  } catch (error) {
    return dispatch({ type: AUTH_ERROR });
  }
};

export const refreshToken = () => async (state, dispatch) => {
  try {
    dispatch({ type: REFRESH_TOKEN_LOADING });
    const refresh_Token = await axios.get(`${API}/user/token`, {
      headers: {
        authorization: localStorage.getItem('refreshToken'),
      },
    });
    console.log('refersh', refresh_Token.data.token);
    localStorage.setItem('token', refresh_Token.data.token);
    return dispatch({ type: REFRESH_TOKEN_SUCCESS });
  } catch (er) {
    console.log(er.message);
    dispatch({ type: REFRESH_TOKEN_ERROR });
  }
};

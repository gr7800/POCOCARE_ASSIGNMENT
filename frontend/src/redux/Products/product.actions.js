import axios from 'axios';
import { refreshToken } from '../auth/auth.action';
import {
  GET_PRODUCT_LOADING,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_ERROR,
  REFRESH_TOKEN_LOADING,
  REFRESH_TOKEN_SUCCESS,
  GET_SINGLE,
} from './product.type';
let API = 'https://pococareauthentication.onrender.com';
export const getProducts = () => async (state, dispatch) => {
  dispatch({ type: GET_PRODUCT_LOADING });
  try {
    console.log(localStorage.getItem('token'));

    const getAll = await axios.get(`${API}/product/getproduct`, {
      headers: {
        authorization: localStorage.getItem('token'),
      },
    });

    return dispatch({ type: GET_PRODUCT_SUCCESS, payload: getAll.data });
  } catch (er) {
    localStorage.setItem('errorToken', true);
    return dispatch({ type: GET_PRODUCT_ERROR });
  }
};

export const getSingleProduct = (id) => async (state, dispatch) => {
  dispatch({ type: GET_PRODUCT_LOADING });
  try {
    console.log(localStorage.getItem('token'));

    const getAll = await axios.get(`${API}/product/${id}`, {
      headers: {
        authorization: localStorage.getItem('token'),
      },
    });

    return dispatch({ type: GET_SINGLE, payload: getAll.data });
  } catch (er) {
    return dispatch({ type: GET_PRODUCT_ERROR });
  }
};

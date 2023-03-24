import React from 'react';
import {
  GET_PRODUCT_ERROR,
  GET_PRODUCT_LOADING,
  GET_PRODUCT_SUCCESS,
  GET_SINGLE,
} from './product.type';
let initialState = {
  singleData: {},
  loading: false,
  error: false,
  data: [],
  totalProducts: 0,
};
const productReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PRODUCT_LOADING: {
      return {
        ...state,
        loading: true,
        error: false,
      };
    }
    case GET_PRODUCT_ERROR: {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }
    case GET_PRODUCT_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        data: payload,
        totalProducts: payload.length,
      };
    }
    case GET_SINGLE: {
      return {
        ...state,
        singleData: payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default productReducer;

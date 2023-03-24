import { legacy_createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { authReducer } from './auth/auth.reducer';
import productReducer from './Products/product.reducer';

const rootReducer = combineReducers({
  //changes here
  auth: authReducer,
  product: productReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

import { combineReducers } from '@reduxjs/toolkit';
import {
  ingredientsSliceName,
  ingredientsSliceReducer
} from './slices/ingredientsSlice';
import {
  burgerConstructorSliceName,
  burgerConstructorSliceReducer
} from './slices/burgerConstructorSlice';
import { feedsSliceName, feedsSliceReducer } from './slices/feedsSlice';
import { authSliceName, authSliceReducer } from './slices/authSlice';
import {
  profileOrdersSliceName,
  profileOrdersSliceReducer
} from './slices/profileOrdersSlice';
import {
  createOrderSliceName,
  createOrderSliceReducer
} from './slices/createOrderSlice';

export const rootReducer = combineReducers({
  [burgerConstructorSliceName]: burgerConstructorSliceReducer,
  [ingredientsSliceName]: ingredientsSliceReducer,
  [feedsSliceName]: feedsSliceReducer,
  [authSliceName]: authSliceReducer,
  [profileOrdersSliceName]: profileOrdersSliceReducer,
  [createOrderSliceName]: createOrderSliceReducer
});

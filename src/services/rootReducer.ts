import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsReducer } from './slices/ingredientsSlice';
import { userReducer } from './slices/userSlice';
import { constructorReducer } from './slices/constructorSlice';
import { orderReducer } from './slices/orderSlice';
import { feedReducer } from './slices/feedSlice';

const rootReducer = combineReducers({
  ingredientsSlice: ingredientsReducer,
  userSlice: userReducer,
  constructorSlice: constructorReducer,
  orderSlice: orderReducer,
  feedSlice: feedReducer
});

export default rootReducer;

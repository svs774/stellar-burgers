import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';

type TOrderState = {
  orders: TOrder[];
  orderRequest: boolean;
  data: TOrder | null;
};

export const initialState: TOrderState = {
  orders: [],
  orderRequest: false,
  data: null
};

export const orderBurger = createAsyncThunk(
  'orders/orderBurger',
  async (data: string[]) => await orderBurgerApi(data)
);

export const getOrdersThunk = createAsyncThunk('orders/get', async () =>
  getOrdersApi()
);

export const getOrderByIdThunk = createAsyncThunk(
  'orders/getOrderById',
  async (number: number) => await getOrderByNumberApi(number)
);

const orderSlice = createSlice({
  name: 'orderSlice',
  initialState,
  reducers: {
    clearRequestData: (state) => {
      state.orderRequest = false;
      state.data = null;
    }
  },
  selectors: {
    getOrders: (state) => state.orders,
    getOrderRequest: (state) => state.orderRequest,
    getOrderModalData: (state) => state.data
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(orderBurger.rejected, (state) => {
        state.orderRequest = false;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.data = action.payload.order;
      })
      .addCase(getOrdersThunk.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(getOrderByIdThunk.pending, (state) => {
        state.data = null;
      })
      .addCase(getOrderByIdThunk.fulfilled, (state, action) => {
        state.data = action.payload.orders[0];
      });
  }
});

export const { getOrders, getOrderModalData, getOrderRequest } =
  orderSlice.selectors;
export const { clearRequestData } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;

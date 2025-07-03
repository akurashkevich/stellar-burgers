import { orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { clearBurgerConstructor } from './burgerConstructorSlice';

export const createOrderThunk = createAsyncThunk(
  'userOrders/createOrder',
  async (ingredients: string[], { dispatch }) => {
    const response = await orderBurgerApi(ingredients);
    dispatch(clearBurgerConstructor());
    return response;
  }
);

type TCreateOrderState = {
  order: TOrder | null;
  orderRequest: boolean;
  error: string | null;
};

const initialState: TCreateOrderState = {
  order: null,
  orderRequest: false,
  error: null
};

const createOrderSlice = createSlice({
  name: 'createOrder',
  initialState,
  reducers: {
    clearOrderData: (state) => {
      state.order = null;
    }
  },
  selectors: {
    createOrderSelector: (state) => state.order,
    createOrderRequestSelector: (state) => state.orderRequest,
    createOrderErrorSelector: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderThunk.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(createOrderThunk.fulfilled, (state, { payload }) => {
        state.order = payload.order;
        state.orderRequest = false;
      })
      .addCase(createOrderThunk.rejected, (state, { error }) => {
        state.error = error.message || null;
        state.orderRequest = false;
      });
  }
});

export const createOrderSliceName = createOrderSlice.name;
export const createOrderSliceReducer = createOrderSlice.reducer;

export const { clearOrderData } = createOrderSlice.actions;

export const {
  createOrderSelector,
  createOrderRequestSelector,
  createOrderErrorSelector
} = createOrderSlice.selectors;

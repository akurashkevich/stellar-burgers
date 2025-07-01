import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getOrdersApi } from '@api';
import { TOrder } from '@utils-types';

export const getProfileOrdersThunk = createAsyncThunk(
  'profileOrders/get',
  async () => getOrdersApi()
);

type TProfileOrdersState = {
  orders: TOrder[];
  isLoading: boolean;
};

const initialState: TProfileOrdersState = {
  orders: [],
  isLoading: false
};

export const profileOrdersSlice = createSlice({
  name: 'profileOrders',
  initialState,
  reducers: {},
  selectors: {
    profileOrdersSelector: (state) => state.orders,
    profileOrdersIsLoadingSelector: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfileOrdersThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProfileOrdersThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(getProfileOrdersThunk.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

export const { profileOrdersSelector, profileOrdersIsLoadingSelector } =
  profileOrdersSlice.selectors;
export const profileOrdersSliceName = profileOrdersSlice.name;
export const profileOrdersSliceReducer = profileOrdersSlice.reducer;

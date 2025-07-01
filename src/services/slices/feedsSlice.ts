import { getFeedsApi, getOrderByNumberApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const getFeedsThunk = createAsyncThunk('feeds/getAll', getFeedsApi);

export const getOrderByNumberThunk = createAsyncThunk(
  'feeds/getOrderByNumber',
  async (number: number) => getOrderByNumberApi(number)
);

type TFeedsState = {
  orders: TOrder[];
  orderDetail: TOrder | null;
  total: number;
  totalToday: number;
  loading: boolean;
  error: string | null;
};

const initialState: TFeedsState = {
  orders: [],
  orderDetail: null,
  total: 0,
  totalToday: 0,
  loading: false,
  error: null
};

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    feedsSelector: (state) => state,
    feedsOrdersSelector: (state) => state.orders,
    feedsLoadingSelector: (state) => state.loading,
    feedsErrorSelector: (state) => state.error,
    feedsOrderDetailSelector: (state) => state.orderDetail
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeedsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeedsThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.orders = payload.orders;
        state.total = payload.total;
        state.totalToday = payload.totalToday;
      })
      .addCase(getFeedsThunk.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message || null;
      })
      .addCase(getOrderByNumberThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.orderDetail = null;
      })
      .addCase(getOrderByNumberThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.orderDetail = payload.orders[0];
      })
      .addCase(getOrderByNumberThunk.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message || null;
      });
  }
});

export const feedsSliceName = feedsSlice.name;
export const feedsSliceReducer = feedsSlice.reducer;

export const {
  feedsSelector,
  feedsOrdersSelector,
  feedsLoadingSelector,
  feedsErrorSelector,
  feedsOrderDetailSelector
} = feedsSlice.selectors;

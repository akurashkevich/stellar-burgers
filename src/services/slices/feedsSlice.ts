import { getFeedsApi, getOrderByNumberApi } from '@api';
import {
  createAsyncThunk,
  createSlice,
  SerializedError
} from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';

export const getFeedsThunk = createAsyncThunk('feeds/getAll', getFeedsApi);

export const getOrderByNumberThunk = createAsyncThunk(
  'feeds/getOrderByNumber',
  async (number: number) => getOrderByNumberApi(number)
);

type TFeedsState = {
  isLoading: boolean;
  orderDetail: TOrder | null;
  error: null | SerializedError;
  data: TOrdersData;
};

export const initialState: TFeedsState = {
  isLoading: true,
  orderDetail: null,
  error: null,
  data: {
    orders: [],
    total: 0,
    totalToday: 0
  }
};

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    feedsSelector: (state) => state.data,
    feedsOrdersSelector: (state) => state.data.orders,
    feedsLoadingSelector: (state) => state.isLoading,
    feedsErrorSelector: (state) => state.error,
    feedsOrderDetailSelector: (state) => state.orderDetail,
    feedsTotal: (state) => state.data.total,
    feedsTotalToday: (state) => state.data.totalToday
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeedsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFeedsThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data.orders = payload.orders;
        state.data.total = payload.total;
        state.data.totalToday = payload.totalToday;
      })
      .addCase(getFeedsThunk.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error || null;
      })
      .addCase(getOrderByNumberThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.orderDetail = null;
      })
      .addCase(getOrderByNumberThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.orderDetail = payload.orders[0];
      })
      .addCase(getOrderByNumberThunk.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error || null;
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
  feedsOrderDetailSelector,
  feedsTotal,
  feedsTotalToday
} = feedsSlice.selectors;

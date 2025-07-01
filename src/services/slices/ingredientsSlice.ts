import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredients } from '@utils-types';

const FETCH_INGREDIENTS = 'ingredients/fetchAll';

interface IIngredientsState {
  data: TIngredients;
  isLoading: boolean;
  errorMessage: string | null;
  lastUpdated?: Date | null;
}

const ingredientsInitialState: IIngredientsState = {
  data: [],
  isLoading: false,
  errorMessage: null,
  lastUpdated: null
};

export const getIngredients = createAsyncThunk(
  FETCH_INGREDIENTS,
  async () => await getIngredientsApi()
);

const burgerIngredientsSlice = createSlice({
  name: 'ingredients',
  initialState: ingredientsInitialState,
  reducers: {
    resetIngredientsError: (state) => {
      state.errorMessage = null;
    }
  },
  selectors: {
    getIngredientsSelector: (state) => state.data,
    getIngredientsLoadingSelector: (state) => state.isLoading,
    getIngredientsErrorSelector: (state) => state.errorMessage
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage =
          action.error.message || 'Произошла ошибка при загрузке ингредиентов';
      })
      .addCase(
        getIngredients.fulfilled,
        (state, action: PayloadAction<TIngredients>) => {
          state.isLoading = false;
          state.data = action.payload;
          state.lastUpdated = new Date();
        }
      );
  }
});

export const ingredientsSliceName = burgerIngredientsSlice.name;
export const ingredientsSliceReducer = burgerIngredientsSlice.reducer;

export const {
  getIngredientsSelector,
  getIngredientsLoadingSelector,
  getIngredientsErrorSelector
} = burgerIngredientsSlice.selectors;

export const { resetIngredientsError } = burgerIngredientsSlice.actions;

import { v4 as uuid } from 'uuid';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

type TBurgerConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TBurgerConstructorState = {
  bun: null,
  ingredients: []
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addToBurgerConstructor: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        const ingredient = action.payload;
        if (ingredient.type === 'bun') {
          state.bun = ingredient;
        } else {
          state.ingredients.push(ingredient);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: uuid() }
      })
    },
    removeIngredientFromConstructor: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    changeIngredientPosition: (
      state,
      action: PayloadAction<{ currentIndex: number; targetIndex: number }>
    ) => {
      const { currentIndex, targetIndex } = action.payload;
      const ingredients = [...state.ingredients];
      const [movedItem] = ingredients.splice(currentIndex, 1);
      ingredients.splice(targetIndex, 0, movedItem);
      state.ingredients = ingredients;
    },
    clearBurgerConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  },
  selectors: {
    burgerConstructorSelector: (state) => state
  }
});

export const burgerConstructorSliceName = burgerConstructorSlice.name;
export const burgerConstructorSliceReducer = burgerConstructorSlice.reducer;

export const {
  addToBurgerConstructor,
  removeIngredientFromConstructor,
  changeIngredientPosition,
  clearBurgerConstructor
} = burgerConstructorSlice.actions;

export const { burgerConstructorSelector } = burgerConstructorSlice.selectors;

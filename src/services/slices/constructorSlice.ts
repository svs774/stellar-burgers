import { createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient, TOrder } from '@utils-types';
import type { PayloadAction } from '@reduxjs/toolkit';
import { orderBurger } from './orderSlice';

type TConstructorState = {
  bun?: TConstructorIngredient;
  ingredients: Array<TConstructorIngredient>;
};

export const initialState: TConstructorState = {
  ingredients: []
};

const constructorSlice = createSlice({
  name: 'constructorSlice',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else {
        state.ingredients.push(action.payload);
      }
    },
    moveUp: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index > 0) {
        [state.ingredients[index], state.ingredients[index - 1]] = [
          state.ingredients[index - 1],
          state.ingredients[index]
        ];
      }
    },
    moveDown: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index < state.ingredients.length - 1) {
        [state.ingredients[index], state.ingredients[index + 1]] = [
          state.ingredients[index + 1],
          state.ingredients[index]
        ];
      }
    },
    deleteIngredient: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      state.ingredients.splice(index, 1);
    }
  },
  selectors: {
    getConstructorItems: (state) => ({
      bun: state.bun,
      ingredients: state.ingredients
    }),
    getIngredientsIds: (state) => {
      if (state.bun) {
        return [
          state.bun._id,
          ...state.ingredients.map((ingredient) => ingredient._id)
        ];
      }
      return [];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(orderBurger.fulfilled, (state) => {
      state.bun = undefined;
      state.ingredients = [];
    });
  }
});

export const { getConstructorItems, getIngredientsIds } =
  constructorSlice.selectors;
export const { addIngredient, moveUp, moveDown, deleteIngredient } =
  constructorSlice.actions;
export const constructorReducer = constructorSlice.reducer;

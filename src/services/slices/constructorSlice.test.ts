import { TNewOrderResponse } from '../../utils/burger-api';
import { TConstructorState } from '../../utils/types';
import {
  addIngredient,
  constructorReducer,
  deleteIngredient,
  getIngredientsIds,
  initialState,
  moveDown,
  moveUp
} from './constructorSlice';
import { orderBurger } from './orderSlice';

describe('constructorSlice', () => {
  const testBun = {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200s',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    id: 'dRUl0vIz6mjhJyNO1iWhW'
  };

  const topIngredient = {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    id: '-7aBfz6aPI_4Mdb9FvVVV'
  };

  const bottomIngredinet = {
    _id: '643d69a5c3f7b9001cfa093e',
    name: 'Филе Люминесцентного тетраодонтимформа',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
    id: 'NpBYRr4MgzbnLH31QGKBt'
  };

  const fullState: TConstructorState = {
    bun: testBun,
    ingredients: [topIngredient, bottomIngredinet]
  };

  const testIngredient = {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    id: 'KgVo_GHamEEtcZcMQ3A5q'
  };

  describe('should handle addIngerdient', () => {
    it('ingredient type bun', () => {
      const testBun = {
        _id: '643d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200s',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        id: 'dRUl0vIz6mjhJyNO1iWhW'
      };

      const newState = constructorReducer(initialState, addIngredient(testBun));

      expect(newState).toEqual({
        ingredients: [],
        bun: testBun
      });
    });

    it('ingredient type !bun', () => {
      const newState = constructorReducer(
        initialState,
        addIngredient(testIngredient)
      );

      expect(newState).toEqual({
        ingredients: [testIngredient],
        bun: undefined
      });
    });
  });

  describe('should handle moving ingredients', () => {
    it('move up', () => {
      const newState = constructorReducer(fullState, moveUp(1));

      expect(newState).toEqual({
        bun: fullState.bun,
        ingredients: [bottomIngredinet, topIngredient]
      });
    });

    it('move down', () => {
      const newState = constructorReducer(fullState, moveDown(0));

      expect(newState).toEqual({
        bun: fullState.bun,
        ingredients: [bottomIngredinet, topIngredient]
      });
    });
  });

  it('should handle deleting ingredients', () => {
    const initialState = {
      ingredients: [testIngredient]
    };

    const newState = constructorReducer(initialState, deleteIngredient(0));

    expect(newState).toEqual({
      ingredients: []
    });
  });

  describe('getIngredientsId selector', () => {
    it('should return empty array when no bun', () => {
      const selector = getIngredientsIds({ constructorSlice: initialState });

      expect(selector).toEqual([]);
    });

    it('should return ingredientsIds when bun', () => {
      const selector = getIngredientsIds({ constructorSlice: fullState });

      expect(selector).toEqual([
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093e'
      ]);
    });
  });

  it('should empty constructor when order fulfilled', () => {
    const testOrderResponse: TNewOrderResponse = {
      success: true,
      name: 'Флюоресцентный люминесцентный бургер',
      order: {
        ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093e'],
        _id: '6693ace2119d45001b4f8c41',
        status: 'done',
        name: 'Флюоресцентный люминесцентный бургер',
        createdAt: '2024-07-14T10:48:02.203Z',
        updatedAt: '2024-07-14T10:48:02.623Z',
        number: 45735
      }
    };

    const newState = constructorReducer(
      fullState,
      orderBurger.fulfilled(testOrderResponse, '', [''])
    );

    expect(newState).toEqual(initialState);
  });
});

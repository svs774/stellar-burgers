import { getIngredientsThunk, ingredientsReducer, initialState } from './ingredientsSlice';

describe('ingredientsSlice', () => {
  it('should set isLoading to true and reset error to null when pending', () => {
    const actualState = ingredientsReducer(
      {
        ...initialState,
        error: new Error('Test error')
      },
      getIngredientsThunk.pending('')
    );

    expect(actualState).toEqual({
      ingredients: [],
      isLoading: true,
      error: null
    });
  });

  it('should update state with ingredients data and set isLoading to false when fulfilled', () => {
    const testData = [
      {
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
        __v: 0
      }
    ];

    const actualState = ingredientsReducer(
      {
        ...initialState,
        isLoading: true
      },
      getIngredientsThunk.fulfilled(testData, '')
    );

    expect(actualState).toEqual({
      ingredients: testData,
      isLoading: false,
      error: null
    });
  });

  it('should set error and isLoadingh to false when failed', () => {
    const testError = new Error('Test error');

    const actualState = ingredientsReducer(
      {
        ...initialState,
        isLoading: true
      },
      getIngredientsThunk.rejected(testError, '')
    );

    expect(actualState).toEqual({
      ingredients: [],
      isLoading: false,
      error: testError
    });
  });
});

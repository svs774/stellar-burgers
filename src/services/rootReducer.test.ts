import { expect, test, describe } from '@jest/globals';
import rootReducer from './rootReducer';
import { ingredientsReducer } from './slices/ingredientsSlice';
import { userReducer } from './slices/userSlice';
import { constructorReducer } from './slices/constructorSlice';
import { orderReducer } from './slices/orderSlice';
import { feedReducer } from './slices/feedSlice';

describe('Тест правильной инициализации корневого редьюсера', () => {
  test('Проверяем инициализацию', () => {
    const initAction = { type: '@@INIT' };
    const state = rootReducer(undefined, initAction);
    expect(state).toEqual({
      ingredientsSlice: ingredientsReducer(undefined, initAction),
      userSlice: userReducer(undefined, initAction),
      constructorSlice: constructorReducer(undefined, initAction),
      orderSlice: orderReducer(undefined, initAction),
      feedSlice: feedReducer(undefined, initAction)
    });
  });

  test('Проверяем на неизвестном экшене', () => {
    const fakeAction = { type: 'UNKNOWN_ACTION' };
    const state = rootReducer(undefined, fakeAction);
    expect(state).toEqual({
      ingredientsSlice: ingredientsReducer(undefined, fakeAction),
      userSlice: userReducer(undefined, fakeAction),
      constructorSlice: constructorReducer(undefined, fakeAction),
      orderSlice: orderReducer(undefined, fakeAction),
      feedSlice: feedReducer(undefined, fakeAction)
    });
  });
});

import { TNewOrderResponse } from '../../utils/burger-api';
import {
  clearRequestData,
  getOrderByIdThunk,
  getOrdersThunk,
  initialState,
  orderBurger,
  orderReducer
} from './orderSlice';

describe('orderSlice', () => {
  const testOrders = [
    {
      _id: '6693bb72119d45001b4f8c81',
      ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093e'],
      status: 'done',
      name: 'Флюоресцентный люминесцентный бургер',
      createdAt: '2024-07-14T11:50:10.753Z',
      updatedAt: '2024-07-14T11:50:11.241Z',
      number: 45747
    },
    {
      _id: '6693bb68119d45001b4f8c80',
      ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093e'],
      status: 'done',
      name: 'Флюоресцентный люминесцентный бургер',
      createdAt: '2024-07-14T11:50:00.249Z',
      updatedAt: '2024-07-14T11:50:00.812Z',
      number: 45746
    }
  ];

  const fullState = {
    orders: testOrders,
    orderRequest: true,
    data: testOrders[0]
  };

  it('should clear order data when clearOrderRequest dispatched', () => {
    const actualState = orderReducer(fullState, clearRequestData());

    expect(actualState).toEqual({
      ...initialState,
      orders: testOrders
    });
  });

  describe('burger order', () => {
    it('should set order request to true while pending', () => {
      const actualState = orderReducer(
        initialState,
        orderBurger.pending('', [''])
      );

      expect(actualState).toEqual({
        ...initialState,
        orderRequest: true
      });
    });

    it('should set order request to false when rejected', () => {
      const actualState = orderReducer(
        fullState,
        orderBurger.rejected(new Error(), '', [''])
      );

      expect(actualState).toEqual({
        ...fullState,
        orderRequest: false
      });
    });

    it('should set data and order request to false when fulfilled', () => {
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

      const actualState = orderReducer(
        initialState,
        orderBurger.fulfilled(testOrderResponse, '', [''])
      );

      expect(actualState).toEqual({
        ...initialState,
        orderRequest: false,
        data: testOrderResponse.order
      });
    });
  });

  it('should update orders when ordersThunk fulfilled', () => {
    const actualState = orderReducer(
      initialState,
      getOrdersThunk.fulfilled(testOrders, '')
    );

    expect(actualState).toEqual({
      ...initialState,
      orders: testOrders
    });
  });

  describe('getOrderByIdThunk', () => {
    it('should set data to null when pending', () => {
      const actualState = orderReducer(
        initialState,
        getOrderByIdThunk.pending('', 0)
      );

      expect(actualState).toEqual({
        ...initialState,
        data: null
      });
    });

    it('should set data to first order in response', () => {
      const actualState = orderReducer(
        initialState,
        getOrderByIdThunk.fulfilled(
          { success: true, orders: testOrders },
          '',
          0
        )
      );

      expect(actualState).toEqual({
        ...initialState,
        data: testOrders[0]
      });
    });
  });
});

import { feedReducer, getFeedsThunk, initialState } from './feedSlice';

describe('feedSlice', () => {
  it('should update state when fulfilled', () => {
    const testResponse = {
      success: true,
      orders: [
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
      ],
      total: 45373,
      totalToday: 84
    };

    const actualState = feedReducer(
      initialState,
      getFeedsThunk.fulfilled(testResponse, '')
    );

    expect(actualState).toEqual({
      orders: testResponse.orders,
      total: testResponse.total,
      totalToday: testResponse.totalToday
    });
  });
});

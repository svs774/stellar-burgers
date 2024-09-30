import {
    getUser,
    initialState,
    loginUser,
    logoutUser,
    registerUser,
    updateUser,
    userReducer
  } from './userSlice';
  
  describe('userSlice', () => {
    const testAuthResponse = {
      success: true,
      accessToken:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NmQ1M2M0OTdlZGUwMDAxZDA3MGQyYiIsImlhdCI6MTcyMDk2Mzc3NywiZXhwIjoxNzIwOTY0OTc3fQ.IWRnuT7xG1uWXdDa9fwyiE4Ywbh8l6SDIM-QzkI0TZs',
      refreshToken:
        'e18ae8f24c72e98cc3eed4dbe606471785784132afa098c5ec1ee89cd10bc0538af70d109ea4bf5e',
      user: { email: '123@gmail.com', name: 'test' }
    };
  
    const registerData = {
      email: '123@gmail.com',
      name: 'test',
      password: '12345'
    };
  
    const fullState = {
      isLoading: false,
      isAuthChecked: true,
      isAuthenticated: true,
      data: {
        name: 'test',
        email: '123@gmail.com'
      }
    };
  
    describe('loginUser', () => {
      const loginData = {
        email: '123@gmail.com',
        password: '12345'
      };
  
      it('should set isLoading to true while pending', () => {
        const actualState = userReducer(
          initialState,
          loginUser.pending('', loginData)
        );
  
        expect(actualState).toEqual({
          ...initialState,
          isLoading: true
        });
      });
  
      it('should set isLoading to false when rejected', () => {
        const actualState = userReducer(
          { ...initialState, isLoading: true },
          loginUser.rejected(new Error(''), '', loginData)
        );
  
        expect(actualState).toEqual(initialState);
      });
  
      it('should set isLoading to false, isAuthenticated to true and add userInfo when fulfilled', () => {
        const actualState = userReducer(
          { ...initialState, isLoading: true },
          loginUser.fulfilled(testAuthResponse, '', loginData)
        );
  
        expect(actualState).toEqual({
          ...initialState,
          isLoading: false,
          isAuthenticated: true,
          data: testAuthResponse.user
        });
      });
    });
  
    describe('registerUser', () => {
      it('should set isLoading to true while pending', () => {
        const actualState = userReducer(
          initialState,
          registerUser.pending('', registerData)
        );
  
        expect(actualState).toEqual({
          ...initialState,
          isLoading: true
        });
      });
  
      it('should set isLoading to false when rejected', () => {
        const actualState = userReducer(
          { ...initialState, isLoading: true },
          registerUser.rejected(new Error(''), '', registerData)
        );
  
        expect(actualState).toEqual(initialState);
      });
  
      it('should set isLoading to false, isAuthenticated to true and add userInfo when fulfilled', () => {
        const actualState = userReducer(
          { ...initialState, isLoading: true },
          registerUser.fulfilled(testAuthResponse, '', registerData)
        );
  
        expect(actualState).toEqual({
          ...initialState,
          isLoading: false,
          isAuthenticated: true,
          data: testAuthResponse.user
        });
      });
    });
  
    describe('updateUser', () => {
      it('should set isLoading to true while pending', () => {
        const actualState = userReducer(
          initialState,
          updateUser.pending('', registerData)
        );
  
        expect(actualState).toEqual({
          ...initialState,
          isLoading: true
        });
      });
  
      it('should set isLoading to false when rejected', () => {
        const actualState = userReducer(
          { ...initialState, isLoading: true },
          updateUser.rejected(new Error(''), '', registerData)
        );
  
        expect(actualState).toEqual(initialState);
      });
  
      it('should set isLoading to false, isAuthenticated to true and add userInfo when fulfilled', () => {
        const actualState = userReducer(
          { ...initialState, isLoading: true },
          updateUser.fulfilled(testAuthResponse, '', registerData)
        );
  
        expect(actualState).toEqual({
          ...initialState,
          isLoading: false,
          isAuthenticated: true,
          data: testAuthResponse.user
        });
      });
    });
  
    describe('getUser', () => {
      it('should set isLoading to true while pending', () => {
        const actualState = userReducer(initialState, getUser.pending(''));
  
        expect(actualState).toEqual({
          ...initialState,
          isLoading: true
        });
      });
  
      it('should set isLoading to false, isAuthChecked to true when rejected', () => {
        const actualState = userReducer(
          { ...initialState, isLoading: true },
          getUser.rejected(new Error(''), '')
        );
  
        expect(actualState).toEqual({
          ...initialState,
          isAuthChecked: true
        });
      });
  
      it('should set isLoading to false, isAuthenticated to true, isAuthChecked to true and add userInfo when fulfilled', () => {
        const actualState = userReducer(
          { ...initialState, isLoading: true },
          getUser.fulfilled(testAuthResponse, '')
        );
  
        expect(actualState).toEqual({
          ...initialState,
          isLoading: false,
          isAuthenticated: true,
          isAuthChecked: true,
          data: testAuthResponse.user
        });
      });
    });
  
    describe('logoutUser', () => {
      it('should set isLoading to true while pending', () => {
        const actualState = userReducer(fullState, logoutUser.pending(''));
  
        expect(actualState).toEqual({
          ...fullState,
          isLoading: true
        });
      });
  
      it('should set isLoading to false when rejected', () => {
        const actualState = userReducer(
          { ...fullState, isLoading: true },
          logoutUser.rejected(new Error(''), '')
        );
  
        expect(actualState).toEqual({
          ...fullState,
          isLoading: false
        });
      });
  
      it('should set isLoading to false, isAuthenticated to false and add clear userInfo when fulfilled', () => {
        const actualState = userReducer(
          { ...fullState, isLoading: true },
          logoutUser.fulfilled({ success: true }, '')
        );
  
        expect(actualState).toEqual({
          ...initialState,
          isAuthChecked: true
        });
      });
    });
  });

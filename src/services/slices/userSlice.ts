import {
  TLoginData,
  TRegisterData,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUserState } from '@utils-types';
import { setCookie } from '../../utils/cookie';

export const initialState: TUserState = {
  isLoading: false,
  isAuthChecked: false,
  isAuthenticated: false,
  data: {
    name: '',
    email: ''
  }
};

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: TLoginData) => {
    const data = await loginUserApi({ email, password });
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return await data;
  }
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (registerData: TRegisterData) => await registerUserApi(registerData)
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (user: TRegisterData) => await updateUserApi(user)
);

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async () => await logoutApi()
);

export const getUser = createAsyncThunk(
  'user/getUser',
  async () => await getUserApi()
);

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {},
  selectors: {
    getUserData: (state) => state.data,
    getUserIsAuthenticated: (state) => state.isAuthenticated,
    getUserIsLoading: (state) => state.isLoading,
    getUserIsAuthChecked: (state) => state.isAuthChecked
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.isLoading = false;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.isLoading = false;
        state.isAuthenticated = true;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.isLoading = false;
        state.isAuthenticated = true;
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.rejected, (state) => {
        state.isLoading = false;
        state.isAuthChecked = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.isLoading = false;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.data = {
          name: '',
          email: ''
        };
        state.isLoading = false;
        state.isAuthenticated = false;
      });
  }
});

export const {
  getUserData,
  getUserIsAuthenticated,
  getUserIsLoading,
  getUserIsAuthChecked
} = userSlice.selectors;
export const userReducer = userSlice.reducer;

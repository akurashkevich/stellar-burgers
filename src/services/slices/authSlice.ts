import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';

type TError = {
  message: string;
  success: boolean;
};

export const loginUserThunk = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }: TLoginData, { rejectWithValue }) => {
    const data = await loginUserApi({ email, password });
    if (!data?.success) {
      return rejectWithValue(data);
    }
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const registerUserThunk = createAsyncThunk(
  'auth/registerUser',
  async ({ email, name, password }: TRegisterData, { rejectWithValue }) => {
    const data = await registerUserApi({ email, name, password });
    if (!data?.success) {
      return rejectWithValue(data);
    }
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const getUserThunk = createAsyncThunk(
  'auth/getUser',
  async (_, { rejectWithValue }) => {
    if (getCookie('accessToken')) {
      return getUserApi();
    } else {
      return Promise.reject();
    }
  }
);

export const updateUserThunk = createAsyncThunk(
  'auth/updateUser',
  async (user: Partial<TRegisterData>, { rejectWithValue }) => {
    const data = await updateUserApi(user);
    if (!data?.success) {
      return rejectWithValue(data);
    }
    return data.user;
  }
);

export const logoutUserThunk = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue, dispatch }) => {
    const logout = await logoutApi();
    if (!logout?.success) {
      return rejectWithValue(logout);
    }

    localStorage.clear();
    deleteCookie('accessToken');
    dispatch(userLogout());
  }
);

type TAuthState = {
  userData: TUser | null;
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  loginUserError: string | null;
  loginUserRequest: boolean;
  registerUserError: string | null;
  logoutUserError: string | null;
};

const initialState: TAuthState = {
  userData: null,
  isAuthChecked: false,
  isAuthenticated: false,
  loginUserError: null,
  loginUserRequest: false,
  registerUserError: null,
  logoutUserError: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLogout: (state) => {
      state.userData = null;
    }
  },
  selectors: {
    userDataSelector: (state) => state.userData,
    isAuthCheckedSelector: (state) => state.isAuthChecked,
    loginUserErrorSelector: (state) => state.loginUserError,
    registerUserErrorSelector: (state) => state.registerUserError
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserThunk.pending, (state) => {
        state.isAuthChecked = false;
        state.loginUserRequest = true;
        state.loginUserError = null;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.loginUserError = `Ошибка авторизации: ${action.error.message}`;
        state.isAuthChecked = true;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.loginUserRequest = false;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      .addCase(registerUserThunk.pending, (state) => {
        state.loginUserRequest = true;
        state.registerUserError = null;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.registerUserError = `Ошибка регистрации: ${action.error.message}`;
        state.isAuthChecked = true;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.loginUserRequest = false;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      .addCase(logoutUserThunk.rejected, (state, action) => {
        state.logoutUserError = `Ошибка выхода из аккаунта: ${action.error.message}`;
      })
      .addCase(getUserThunk.pending, (state) => {
        state.loginUserRequest = true;
        state.loginUserError = null;
      })
      .addCase(getUserThunk.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.isAuthChecked = true;
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.userData = action.payload.user;
        state.loginUserRequest = false;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      .addCase(updateUserThunk.pending, (state) => {
        state.isAuthChecked = false;
        state.loginUserRequest = true;
        state.loginUserError = null;
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.loginUserError = `Ошибка обновления данных: ${action.error.message}`;
        state.isAuthChecked = true;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.loginUserRequest = false;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      });
  }
});

export const { userLogout } = authSlice.actions;

export const {
  userDataSelector,
  isAuthCheckedSelector,
  loginUserErrorSelector,
  registerUserErrorSelector
} = authSlice.selectors;

export const authSliceName = authSlice.name;
export const authSliceReducer = authSlice.reducer;

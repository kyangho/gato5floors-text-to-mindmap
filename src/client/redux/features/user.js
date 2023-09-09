import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import parseJwt from '../../utils/jwtToken';

const initialState = {
  user: {},
  locale: 'vi_VN' || 'en_US',
  logged: localStorage.getItem('t') ? true : false,
  loading: false
};

export const getUser = createAsyncThunk(
  '@user/GetUser',
  (values, { rejectWithValue }) => {
    try {
      const jwtUser = parseJwt(localStorage.getItem('userToken'));
      if (jwtUser.exp < Date.now() / 1000) {
        localStorage.clear();
        return null;
      }
      return jwtUser;
    } catch (_error) {
      return rejectWithValue('Có lỗi xảy ra');
    }
  }
);

export const deleteUser = createAsyncThunk(
  '@user/DeleteUser',
  (values, { rejectWithValue }) => {
    try {
      localStorage.clear();
      return null;
    } catch (_error) {
      return rejectWithValue('Có lỗi xảy ra');
    }
  }
);

export const setUser = createAsyncThunk(
  '@user/SetUser',
  (values, { rejectWithValue }) => {
    try {
      return values;
    } catch (_error) {
      return rejectWithValue('Có lỗi xảy ra');
    }
  }
);

const { reducer } = createSlice({
  initialState,
  name: 'user',
  reducers: {
    setUserLocale(state, action) {
      const { locale } = action.payload;
      localStorage.setItem('_locale', locale || 'en_US');
      Object.assign(state, action.payload);
    }
  },
  extraReducers: {
    [setUser.fulfilled]: (state, { error, payload: { token } }) => {
      if (token && !error) {
        localStorage.setItem('userToken', token);
        state.user = parseJwt(token);
      }
      state.loading = false;
    },
    [getUser.fulfilled]: (state, { payload }) => {
      if (payload) {
        state.user = payload;
      }
    }
  }
});

export default reducer;

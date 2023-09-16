import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AxiosInstance from '../axios';

const initialState = {
  currentNote: {},
  notes: []
};

export const getNotes = createAsyncThunk(
  '@user/get/notes',
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await AxiosInstance.get('/note');
      if (data) {
        console.log(data);
      }
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
  extraReducers: {}
});

export default reducer;

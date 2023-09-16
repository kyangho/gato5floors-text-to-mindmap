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
        return data;
      }
    } catch (_error) {
      return rejectWithValue('Có lỗi xảy ra');
    }
  }
);

const { reducer } = createSlice({
  initialState,
  name: 'note',
  reducers: {},
  extraReducers: {
    [getNotes.fulfilled]: (state, { error, payload }) => {
      state.notes = payload;
    }
  }
});

export default reducer;

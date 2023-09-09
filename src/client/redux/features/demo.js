import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AxiosInstance from '../axios';
const initialState = {};

export const demoCallApi = createAsyncThunk(
  '@user/SetUser',
  async (values, { rejectWithValue }) => {
    try {
      return await AxiosInstance.get('/ping')
        .then(({ data }) => {
          return data;
        })
        .catch(({ response: { data } }) => {
          throw data;
        });
    } catch (_error) {
      return rejectWithValue('Có lỗi xảy ra');
    }
  }
);

const { reducer } = createSlice({
  initialState,
  name: 'demo',
  reducers: {},
  extraReducers: {}
});

export default reducer;

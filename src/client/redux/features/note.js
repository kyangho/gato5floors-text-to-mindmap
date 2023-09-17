import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AxiosInstance from '../axios';
import { map } from 'lodash';

const initialState = {
  currentNote: {},
  notes: []
};

export const fetchManyNotes = createAsyncThunk(
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

export const fetchOneNote = createAsyncThunk(
  '@user/get/note',
  async ({ id, historyId }, { rejectWithValue }) => {
    try {
      const { data } = await AxiosInstance.get(`/note/${id}`, { historyId });
      return data;
    } catch (_error) {
      return rejectWithValue('Có lỗi xảy ra');
    }
  }
);

const { reducer, actions } = createSlice({
  initialState,
  name: 'note',
  reducers: {
    cleanNote(state) {
      state.currentNote = {};
      state.notes = [];
    }
  },
  extraReducers: {
    [fetchManyNotes.fulfilled]: (state, { error, payload }) => {
      console.log(payload);
      state.notes = map(payload, note => ({
        ...note,
        icon: 'https://picsum.photos/200/300'
      }));
    },
    [fetchOneNote.fulfilled]: (state, { error, payload }) => {
      state.currentNote = {
        ...payload,
        noteId: payload.id,
        historyId: payload.historyId,
        icon: 'https://picsum.photos/200/300'
      };
    }
  }
});

export const { cleanNote } = actions;
export default reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../services/api';

export const fetchSearchResults = createAsyncThunk(
  'search/fetchSearchResults',
  async ({ type, searchValue, limit = 5, page = 1 }, thunkAPI) => {
    try {
        const response = await api.get(
        `/search`,
        {
          params: {
            type,
            searchValue,
            limit,
            page,
          },
        }
      );
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    results: [],
    loading: false,
    error: null,
    isOpen: false,
    // totalPages: 0,
    // currentPage: 1,
  },
  reducers: {
    closeSearchModal: (state) => {
      state.isOpen = false;
      state.results = [];
      state.error = null;
    },
    openSearchModal: (state) => {
      state.isOpen = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isOpen = true;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload || [];
        // state.totalPages = action.payload.totalPages || 1;
        // state.currentPage = action.payload.currentPage || 1;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to search';
      });
  },
});

export const { closeSearchModal, openSearchModal } = searchSlice.actions;
export default searchSlice.reducer;

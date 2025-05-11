import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";


export const fetchDestinations = createAsyncThunk(
  "destinations/fetchDestinations",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/destination"); 
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);


const destinationSlice = createSlice({
  name: "destinations",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDestinations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDestinations.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDestinations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default destinationSlice.reducer;

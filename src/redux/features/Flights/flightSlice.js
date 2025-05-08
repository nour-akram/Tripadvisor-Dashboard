import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";

export const fetchFlights = createAsyncThunk(
  "flights/fetchFlights",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/flights");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const flightSlice = createSlice({
  name: "flights",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlights.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFlights.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchFlights.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default flightSlice.reducer;

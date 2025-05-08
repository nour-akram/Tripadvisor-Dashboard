import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";
export const fetchAttractions = createAsyncThunk(
  "attractions/fetchAttractions",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/attractives"); 
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const attractionSlice = createSlice({
  name: "attractions",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAttractions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAttractions.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAttractions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default attractionSlice.reducer;

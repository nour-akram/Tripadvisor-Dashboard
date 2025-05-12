import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getHotels, getTopHotels } from "./HotelService"; 

export const fetchHotels = createAsyncThunk("hotels/fetchHotels", async () => {
  return await getHotels();
});

export const fetchTopHotels = createAsyncThunk(
  "hotels/fetchTopHotels",
  async () => {
    return await getTopHotels();
  }
);

const hotelsSlice = createSlice({
  name: "hotels",
  initialState: {
    data: [],
    topHotels: [],
    status: "idle",
    topStatus: "idle",
    error: null,
    topError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHotels.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchHotels.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchHotels.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Top Hotels
      .addCase(fetchTopHotels.pending, (state) => {
        state.topStatus = "loading";
      })
      .addCase(fetchTopHotels.fulfilled, (state, action) => {
        state.topStatus = "succeeded";
        state.topHotels = action.payload;
      })
      .addCase(fetchTopHotels.rejected, (state, action) => {
        state.topStatus = "failed";
        state.topError = action.error.message;
      });
  },
});

export default hotelsSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getHotels } from "./HotelService"; 

export const fetchHotels = createAsyncThunk("hotels/fetchHotels", async () => {
  return await getHotels();
});

const hotelsSlice = createSlice({
  name: "hotels",
  initialState: {
    data: [],
    status: "idle",
    error: null,
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
      });
  },
});

export default hotelsSlice.reducer;

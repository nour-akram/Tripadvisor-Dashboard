import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getHotels, getTopHotels } from "./HotelService";
import api from "../../../services/api";

export const fetchHotels = createAsyncThunk("hotels/fetchHotels", async () => {
  return await getHotels();
});

export const createHotel = createAsyncThunk(
  "hotels/createHotel",
  async (hotelData, thunkAPI) => {
    try {
      const response = await api.post("/hotels", hotelData); 
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const editHotel = createAsyncThunk(
  "hotels/editHotel",
  async ({ id, updatedData }, thunkAPI) => {
    try {
      const response = await api.put(`/hotels/${id}`, updatedData); 
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteHotel = createAsyncThunk(
  "hotels/deleteHotel",
  async (id, thunkAPI) => {
    try {
      const response = await api.delete(`/hotels/${id}`); 
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

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
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHotels.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchHotels.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchHotels.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(createHotel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createHotel.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(createHotel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(editHotel.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (hotel) => hotel._id === action.payload._id
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(editHotel.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(deleteHotel.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (hotel) => hotel._id !== action.meta.arg
        );
      })
      .addCase(deleteHotel.rejected, (state, action) => {
        state.error = action.payload;
      })

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

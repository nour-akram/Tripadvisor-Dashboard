import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import api from "../../../services/api"; 

export const fetchBookings = createAsyncThunk(
  "bookings/fetchBookings",
  async (_, thunkAPI) => {
    try {
      const token = Cookies.get("admin_token");
      const response = await api.get("/bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchBookedDates = createAsyncThunk(
  "bookings/fetchBookedDates",
  async (_, thunkAPI) => {
    try {
      const token = Cookies.get("admin_token"); 
      const response = await api.get("/bookings/booked-dates", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);



export const fetchBookingsByDate = createAsyncThunk(
  "bookings/fetchBookingsByDate",
  async (date, thunkAPI) => {
    try {
      const token = Cookies.get("admin_token");
      const response = await api.get(`/bookings/booked-at-date?date=${date}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const bookingSlice = createSlice({
  name: "bookings",
  initialState: {
    data: [],
    bookedDates: [],
    bookingsByDate: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // for fetchBookedDates
      .addCase(fetchBookedDates.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchBookedDates.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bookedDates = action.payload;
      })
      .addCase(fetchBookedDates.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // for fetchBookingsByDate
      .addCase(fetchBookingsByDate.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchBookingsByDate.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bookingsByDate = action.payload;
      })
      .addCase(fetchBookingsByDate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
      
  },
});

export default bookingSlice.reducer;
